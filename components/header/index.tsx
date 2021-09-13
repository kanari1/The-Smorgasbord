// components/header/index.tsx

import cn from "clsx"
import styles from "./header.module.scss"
import Link from "next/link"
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import Button from "@/components/button"

export const Header = (): JSX.Element => {
    const [customerName, setCustomerName] = useState('')
    const Router = useRouter();
    const customerId = Router.query.customerId || ''
    useEffect(() => {
        setCustomerName('')
    }, [Router.query.customerId])
    const getCustomerName = async (id) => {
        try {
            let res = await fetch(`/api/get-customer?customerId=${customerId}`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
            })
            let json = await res.json()
            if (!res.ok) throw Error(json.message)
            if (json && json[0]) {
                setCustomerName(json[0].name)
            }
        } catch (err) {
            throw Error(err.message)
        }
    }

    const customerLogoff = () => {
        Router.query.customerId = ''
        setCustomerName('')
        Router.reload()
    }

    useEffect(() => {
        if (customerId) {
            getCustomerName(customerId)
        }
    }, [customerId])

    return (
        <header className={styles.header}>
            <Link href={`/?customerId=${customerId}`} as={'/'}>
                <a className={cn(styles.text, styles.link)}>Home</a>
            </Link>
            <Link href={`/customers?customerId=${customerId}`} as='/customers'>
                <a className={cn(styles.text, styles.link)}>Customers/Couriers</a>
            </Link>
            <Link href={`/brands?customerId=${customerId}`} as='/brands'>
                <a className={cn(styles.text, styles.link)}>RestaurantBrands</a>
            </Link>
            <Link href={`/brands/locations?customerId=${customerId}`} as='/brands/locations'>
                <a className={cn(styles.text, styles.link)}>RestaurantLocations</a>
            </Link>
            <Link href={`/brands/locations/menu-items?customerId=${customerId}`} as='/brands/locations/menu-items'>
                <a className={cn(styles.text, styles.link)}>MenuItems</a>
            </Link>
            <Link href={`/orders?customerId=${customerId}`} as='/orders'>
                <a className={cn(styles.text, styles.link)}>Orders</a>
            </Link>
            <Link href={`/orders/line-items?customerId=${customerId}`} as='/orders/line-items'>
                <a className={cn(styles.text, styles.link)}>LineItems</a>
            </Link>
            {customerName &&
                <div className={styles.right}> 
                    <span className={styles.text}>{customerName}</span>
                    <Button
                        onClick={customerLogoff}
                        className={styles.button}>
                        Logoff
                    </Button>
                </div>
            }
        </header>
    )
}

export default Header
