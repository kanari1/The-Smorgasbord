import cn from "clsx"
import { useState } from 'react'
import Router from 'next/router'
import { mutate } from "swr"

import Button from '@/components/button'
import styles from "./menu-item-form.module.scss"

interface MenuItemData {
    name: string,
    description: string,
    price: number,
    location: number,
    menuItemId?: number,
}

export const MenuItemForm = (props) => {
    const [name, setName] = useState(props.name)
    const [description, setDescription] = useState(props.description || '')
    const [price, setPrice] = useState(props.price)
    const [submitting, setSubmitting] = useState(false)

    const mutateCreate = () => {
        let topId = {menuItemId: 1}
        if (props.menuItems.length) {
            topId = props.menuItems.reduce((a, b) => {
                return {menuItemId: Math.max(a.menuItemId, b.menuItemId)}
            })
        }
        const newMenuItem = { 
            menuItemId: topId.menuItemId + 1,
            name,
            description,
            price,
            location: props.location,
        }
        return [newMenuItem, ...props.menuItems]
    }

    const mutateUpdate = () => {
        const updatedMenuItems = props.menuItems.map(menuItem => {
            if (menuItem.menuItemId != props.id) {
                return menuItem
            }
            return { menuItemId: props.id, name, description, price, location: props.location }
        })
        return updatedMenuItems
    }

    const mutateKey = props.isFiltered
        ? `/api/get-menu-items?location=${props.location}`
        : `/api/get-menu-items`;

    const submitHandler = async (e) => {
        try {
            setSubmitting(true)
            e.preventDefault()
            if (!name || price <= 0) return
            if (!props.location) {
                return props.locationAlert(true)
            }
            const data: MenuItemData = {
                name,
                description,
                price,
                location: props.location,
            }
            let prefix = "create";
            let mutatePatch = mutateCreate()
            if (props.id) {
                data.menuItemId = props.id;
                prefix = "edit";
                mutatePatch = mutateUpdate()
            } 
            mutate(mutateKey, mutatePatch, false)
            const res = await fetch(`/api/${prefix}-menu-item`, {
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
            setName(props.name)
            setDescription(props.description)
            setPrice(props.price)
            setSubmitting(false)
            props.cancel()
        }
    }

    const editButtons = (
        <>
            <Button className={styles.button} disabled={submitting} type="button" onClick={() => props.cancel()}>
                Cancel
            </Button>
            <Button className={styles.button} disabled={submitting} type="button" onClick={submitHandler}>
                {submitting ? 'Working ...' : 'Done'}
            </Button>
        </>
    )

    const createButtons = (
        <Button className={styles.button} disabled={submitting} type="button" onClick={submitHandler}>
            {submitting ? 'Creating ...' : 'Create'}
        </Button>
    )

    return (
        <div className={styles.row}> 
            <div className={cn(styles.field, styles.end)}>
                <input
                    id="name"
                    className={cn(styles.input, styles.name)}
                    type="text"
                    name="name"
                    value={name}
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className={styles.field}>
                <input
                    id="price"
                    className={cn(styles.input, styles.price)}
                    type="number"
                    step="0.01"
                    value={price}
                    placeholder="Price"
                    onChange={(e) => setPrice(parseFloat(e.target.value))}
                />
            </div>
            <div className={cn(styles.field, styles.start)}>
                <textarea
                    className={cn(styles.input, styles.description)}
                    id="description"
                    name="description"
                    value={description || ''}
                    placeholder="Description"
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div>
            {props.id
                ? editButtons
                : createButtons
            }
            </div>
        </div>
    )
}

MenuItemForm.defaultProps = {
    id: '',
    isFiltered: false,
    name: '',
    description: '',
    price: 0.00,
    location: '',
    cancel: () => {},
    locationAlert: () => {},
    menuItems: []
}

export default MenuItemForm
