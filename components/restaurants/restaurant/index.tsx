import cn from "clsx"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { mutate } from "swr"

import Button from "@/components/button"
import RestaurantForm from "@/components/restaurant-form"
import styles from "./restaurant.module.scss"

const convertTime = (timeString) => {
    const colon = timeString.indexOf(":")
    const hour = parseInt(timeString.slice(0, colon))
    const converted = hour > 12 ? hour - 12 : hour
    const suffix = hour >= 12 ? "pm" : "am"
    return converted + timeString.slice(colon, colon + 3) + suffix
}

export const Restaurant = ({
    id,
    brandId,
    isFiltered,
    name,
    logo,
    openTime,
    closeTime,
    address,
    restaurants,
}) => {
    const Router = useRouter()
    const [deleting, setDeleting] = useState(false)
    const [editing, setEditing] = useState(false)
    const customer = Router.query?.customerId || ""
    const openString = convertTime(openTime)
    const closeString = convertTime(closeTime)
    const mutateKey = isFiltered 
        ? `/api/get-restaurant-locations?brand=${brandId}`
        : `/api/get-restaurant-locations`;

    const mutateDelete = () => {
        const filteredRestaurants = restaurants.filter(
            (restaurant) => restaurant.locationId != id
        )
        return filteredRestaurants
    }

    async function deleteRestaurant() {
        try {
            setDeleting(true)
            mutate(mutateKey, mutateDelete(), false)
            let res = await fetch(
                `/api/delete-restaurant-location?locationId=${id}`,
                {
                    method: "DELETE",
                }
            )
            let json = await res.json()
            if (!res.ok) throw Error(json.message)
            mutate(mutateKey)
        } catch (e) {
            throw Error(e.message)
        } finally {
            setDeleting(false)
        }
    }

    let formContents;

    if (editing) {
        formContents =  (
            <RestaurantForm
                id={id}
                brandId={brandId}
                currentFilter={isFiltered}
                openTime={openTime}
                closeTime={closeTime}
                address={address}
                cancel={() => setEditing(false)}
                restaurants={restaurants}
            />
        )
    } else {
        formContents = (
            <div className={styles.row}>
                <p className={styles.id}>{id}</p>
                <div className={styles.name}>
                    {logo
                        ? <img src={logo} />
                        : <div className={styles.placeholder}></div>
                    }
                    <Link
                        href={`/brands/locations/menu-items/?customerId=${customer}&locationId=${id}`}
                        as={`/brands/locations/menu-items`}>
                        <a>{name}</a>
                    </Link>
                </div>
                <p
                    className={
                        styles.hours
                    }>{`${openString} - ${closeString}`}</p>
                <p className={styles.address}>{address}</p>
                <div className={styles.actions}>
                    <Button
                        onClick={() => setEditing(true)}
                        className={styles.button}>
                        Edit
                    </Button>
                    <Button
                        disabled={deleting}
                        onClick={deleteRestaurant}
                        className={styles.button}>
                        {deleting ? "Deleting ..." : "Delete"}
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <form>
            {formContents}
        </form>
    )
}

export default Restaurant
