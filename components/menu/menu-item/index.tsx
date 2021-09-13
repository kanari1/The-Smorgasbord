import { useState } from "react"
import Link from "next/link"
import { mutate } from "swr"

import ButtonLink from "@/components/button-link"
import Button from "@/components/button"
import MenuItemForm from "@/components/menu-item-form"
import styles from "./menu-item.module.scss"

export const MenuItem = ({
    id,
    name,
    description,
    isFiltered,
    price,
    location,
    locationAlert,
    addItem,
    menuItems,
    onDelete,
}) => {
    const [quantity, setQuantity] = useState(0)
    const [deleting, setDeleting] = useState(false)
    const [editing, setEditing] = useState(false)

    const mutateDelete = () => {
        const filteredMenuItems = menuItems.filter(menuItem => {
            menuItem.menuItemId != id
        })
        return filteredMenuItems
    }
    const mutateKey = isFiltered
        ? `/api/get-menu-items?location=${location}`
        : `/api/get-menu-items`;

    const deleteMenuItem = async () => {
        try {
            setDeleting(true)
            mutate(mutateKey, mutateDelete(), false)
            onDelete(id)
            let res = await fetch(`/api/delete-menu-item?menuItemId=${id}`, {
                method: "DELETE",
            })
            let json = await res.json()
            if (!res.ok) throw Error(json.message)
            mutate(mutateKey)
        } catch(e) {
            throw Error(e.message)
        }
    }

    let formContents;

    if (editing) {
        formContents = (
            <MenuItemForm
                id={id}
                name={name}
                description={description}
                isFiltered={isFiltered}
                price={price}
                location={location}
                locationAlert={locationAlert}
                cancel={() => setEditing(false)}
                menuItems={menuItems}
            />
        )
    } else {
        formContents =  (
            <div className={styles.row}>
                <div className={styles.name}>{name}</div>
                <div className={styles.price}>{price.toFixed(2)}</div>
                <div className={styles.description}>{description}</div>
                <div className={styles.field}>
                    <label className={styles.label}> 
                        Qty:
                    </label>
                    <input
                        className={styles.input}
                        type='number'
                        min='0'
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                    />
                    <Button className={styles.button} type="button" onClick={() => {
                        addItem(id, quantity)
                        setQuantity(0)
                    }}>Add</Button>
                    <Button
                        className={styles.button}
                        disabled={deleting}
                        onClick={() => setEditing(true)}>
                        Edit
                    </Button>
                    <Button className={styles.button} disabled={deleting} onClick={deleteMenuItem}>
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

MenuItem.defaultProps = {
    id: '',
    name: '',
    description: '',
    price: 0.00,
    location: '',
    locationAlert: () => {},
    addItem: () => {},
}

export default MenuItem
