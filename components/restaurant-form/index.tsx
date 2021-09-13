import cn from "clsx"
import { useEffect, useState } from 'react'
import Router from 'next/router'
import { mutate } from "swr"

import Button from '@/components/button'
import { useBrands } from '@/lib/swr-hooks'
import styles from "./restaurant-form.module.scss"

interface RestaurantData {
    brand: number,
    openTime: string,
    closeTime: string,
    address: string,
    locationId?: number,
}

export const RestaurantForm = (props) => {
    const [brandId, setBrandId] = useState(props.brandId || props.currentFilter)
    useEffect(() => {
        setBrandId(props.currentFilter)
    }, [props.currentFilter])
    const [address, setAddress] = useState(props.address)
    const [openTime, setOpenTime] = useState(props.openTime)
    const [closeTime, setCloseTime] = useState(props.closeTime)
    const [submitting, setSubmitting] = useState(false)
    const { brands } = useBrands()

    const mutateCreate = () => {
        let topId = { locationId: 1 }
        if (props.restaurants.length) {
            topId = props.restaurants.reduce((a, b) => {
                return {locationId: Math.max(a.locationId, b.locationId)}
            })
        }
        let name = ''
        let logo = ''
        for (let restaurant of props.restaurants) {
            if (restaurant.brandId == brandId) {
                name = restaurant.name;
                logo = restaurant.logo;
                break
            }
        }
        const newRestaurant = { 
            locationId: topId.locationId + 1,
            brandId,
            openTime,
            closeTime,
            address,
            logo,
            name,
        }
        return [newRestaurant, ...props.restaurants]
    }

    const mutateUpdate = () => {
        const updatedRestaurants = props.restaurants.map(restaurant => {
            if (restaurant.locationId != props.id) {
                return restaurant
            }
            let name = ''
            let logo = ''
            for (let restaurant of props.restaurants) {
                if (restaurant.brandId == brandId) {
                    name = restaurant.name;
                    logo = restaurant.logo;
                    break
                }
            }
            return { ...restaurant, brandId, openTime, closeTime,address, name, logo } 
        })
        return updatedRestaurants
    }

    const mutateKey = props.currentFilter
        ? `/api/get-restaurant-locations?brand=${props.currentFilter}`
        : `/api/get-restaurant-locations`

    const submitHandler = async (e) => {
        setSubmitting(true)
        e.preventDefault()
        const data: RestaurantData = {
            brand: brandId,
            openTime,
            closeTime,
            address,
        }
        let prefix = "create";
        let mutatePatch = mutateCreate()
        if (props.id) {
            data.locationId = props.id;
            prefix = "edit";
            mutatePatch = mutateUpdate()
        } 
        try {
            mutate(mutateKey, mutatePatch, false)
            const res = await fetch(`/api/${prefix}-restaurant-location`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
            const json = await res.json()
            if (!res.ok) throw Error(json.message)
            mutate(mutateKey)
        } catch (err) {
            throw Error(err.message)
        } finally {
            setAddress(props.address)
            setOpenTime(props.openTime)
            setCloseTime(props.closeTime)
            setSubmitting(false)
            props.cancel()
        }
    }

    return (
        <div className={styles.row}> 
            <p>{props.id || ''}</p>
            <div className={styles.field}>
                <select 
                    className={styles.select}
                    id='brandId'
                    onChange={(e) => setBrandId(e.target.value)}
                    value={brandId}>
                    <option value=''></option>
                    {brands && brands.map(({ brandId, name }) => (
                        <option value={brandId} key={brandId}> 
                            {`${brandId} - ${name}`}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <div className={styles.field}>
                    <input
                        id="openTime"
                        className={cn(styles.input, styles.open)}
                        type="time"
                        step="600"
                        value={openTime}
                        onChange={(e) => setOpenTime(e.target.value)}
                    />
                    {'  -  '}
                    <input
                        id="closeTime"
                        className={cn(styles.input, styles.close)}
                        type="time"
                        step="600"
                        value={closeTime}
                        onChange={(e) => setCloseTime(e.target.value)}
                    />
                </div>
            </div>
            <div className={styles.field}>
                <input
                    type="text"
                    className={cn(styles.input, styles.address)}
                    id="address"
                    name="address"
                    value={address}
                    placeholder="Address"
                    onChange={(e) => setAddress(e.target.value)}
                />
            </div>
            <div>
            {props.id &&
                <Button className={styles.button} disabled={submitting} onClick={() => props.cancel()}>
                    Cancel
                </Button>
            }
            <Button className={styles.button} disabled={submitting} type="button" onClick={submitHandler}>
                {submitting ? 'Creating ...' : 'Create'}
            </Button>
            </div>
        </div>
    )
}

RestaurantForm.defaultProps = {
    brandId: '',
    currentFilter: '',
    id: '',
    name: '',
    openTime: "00:00",
    closeTime: "23:59",
    address: '',
    cancel: () => {},
    restaurants: [],
}

export default RestaurantForm
