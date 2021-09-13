import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Skeleton from "react-loading-skeleton"
import { mutate } from "swr"

import Cart from "@/components/cart"
import Layout from "@/components/layout"
import Menu from "@/components/menu"
import Update, { UpdateCustomer, UpdateLocation } from "@/components/update"
import { useLineItems, useMenuItems, useOrder } from '@/lib/swr-hooks'

export const MenuPage = () => {
    const Router = useRouter()

    const [locationId, setLocationId] = useState(
        Array.isArray(Router.query?.locationId)
        ? Router.query?.locationId[0]
        : Router.query?.locationId || ''
    )
    const [locationHighlight, setLocationHighlight] = useState(false)

    const [customerId, setCustomerId] = useState(
        Array.isArray(Router.query?.customerId)
        ? Router.query?.customerId[0]
        : Router.query?.customerId || ''
    )
    const [customerHighlight, setCustomerHighlight] = useState(false)

    const { order, isError: orderError, isLoading: orderLoading } = useOrder({ locationId, customerId });
    const { menuItems, isLoading: menuItemsLoading } = useMenuItems(locationId);
    const { lineItems, isLoading: lineItemsLoading } = useLineItems({
        orderId: order ? order.orderId : ''
    });

    const mutateDelete = async (menuItemId) => {
        const filteredLineItems = lineItems.filter(lineItem => {
            return lineItem.menuItem != menuItemId
        })
        await mutate(`/api/get-line-items?orderId=${order.orderId}`, filteredLineItems, false)
        mutate(`/api/get-line-items?orderId=${order.orderId}`)
    }

    const mutateCreate = (menuItemId, quantity) => {
        let topId = { lineItemId: 1 }
        if (lineItems.length) {
            topId = lineItems.reduce((a, b) => {
                return { lineItemId: Math.max(a.lineItemId, b.lineItemId) }
            })
        }
        let name = ''
        let price = ''
        for (let item of menuItems) {
            if (item.menuItemId == menuItemId) {
                name = item.name;
                price = item.price;
                break
            }
        }
        const newLineItem = { 
            lineItemId: topId.lineItemId + 1,
            menuItem: menuItemId,
            quantity,
            name,
            price
        }
        return [newLineItem, ...lineItems]
    }

    const mutateEdit = (lineItemId, newQuantity) => {
        const updatedLineItems = lineItems.map(lineItem => {
            if (lineItem.lineItemId != lineItemId) {
                return lineItem
            }
            return {...lineItem, quantity: newQuantity}
        })
        return updatedLineItems
    }

    const addToOrder = async (menuItemId, quantity) => {
        if (!orderLoading) {
            try {
                let alerted = false;
                if (!customerId) {
                    setCustomerHighlight(true)
                    alerted = true
                }
                if (!locationId) {
                    setLocationHighlight(true)
                    alerted = true
                }
                if (alerted) return
                if (quantity == 0) return
                const existingItem = lineItems.filter(lineItem => lineItem.menuItem == menuItemId)
                if (existingItem && existingItem[0]) {
                    let id = existingItem[0].lineItemId
                    let newQuantity = existingItem[0].quantity + quantity
                    let data = {
                        lineItemId: id,
                        quantity: newQuantity,
                    }
                    mutate(`/api/get-line-items?orderId=${order.orderId}`,
                           mutateEdit(id, newQuantity), false)
                    let res = await fetch(`/api/edit-line-item`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(data),
                    })
                    let json = await res.json()
                    if (!res.ok) throw Error(json.message)
                    mutate(`/api/get-line-items?orderId=${order.orderId}`)
                } else {
                    let data = {
                        order: order.orderId,
                        menuItem: menuItemId,
                        quantity,
                    }
                    mutate(`/api/get-line-items?orderId=${order.orderId}`,
                           mutateCreate(menuItemId, quantity), false)
                    let res = await fetch(`/api/create-line-item`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(data),
                    })
                    let json = await res.json()
                    if (!res.ok) throw Error(json.message)
                    mutate(`/api/get-line-items?orderId=${order.orderId}`)
                }
            } catch (err) {
                throw Error(err.message)
            }
        }
    }

    const locationAlert = (isAlerted) => setLocationHighlight(isAlerted);
    const customerAlert = (isAlerted) => setCustomerHighlight(isAlerted);

    if (menuItemsLoading) {
        return (   
            <Layout title='Menu Items'>
                <Skeleton width={180} height={24} />
                <Skeleton height={48} />
                <div className="my-4" />
                <Skeleton width={180} height={24} />
                <Skeleton height={48} />
                <div className="my-4" />
                <Skeleton width={180} height={24} />
                <Skeleton height={48} />
            </Layout>
        )
    }

    return (
        <Layout title='Menu Items'>
            <div className='heading'>
                <h2 className='title'>Menu Items</h2>
            </div>
            <div>
            <UpdateCustomer
                label='Customer ID'
                updateFunc={(id) => {
                    setCustomerId(id);
                    Router.query.customerId = id;
                }}
                isLoading={orderLoading}
                selected={customerId}
                alert={customerAlert}
                isAlerted={customerHighlight}
            />
            <UpdateLocation
                label='Location ID'
                updateFunc={setLocationId}
                isLoading={orderLoading}
                selected={locationId}
                alert={locationAlert}
                isAlerted={locationHighlight}
            />
            </div>
            <Menu 
                menuItems={menuItems} 
                location={locationId}
                addToOrder={addToOrder} 
                locationAlert={locationAlert}
                itemDeleted={id => mutateDelete(id)}
            />
            {order && order.orderId && !orderLoading && !orderError &&
                <Cart
                    cartItems={lineItems}
                    order={order.orderId}
                />
            }
        </Layout>
    )
}

export default MenuPage
