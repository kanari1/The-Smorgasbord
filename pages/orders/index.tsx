import { useRouter } from "next/router"
import Skeleton from "react-loading-skeleton"

import Layout from "@/components/layout"
import Orders from "@/components/orders"
import { useOrders } from "@/lib/swr-hooks"

export const OrdersPage = () => {
    const Router = useRouter()
    const customerId = Array.isArray(Router.query?.customerId)
        ? Router.query?.customerId[0]
        : Router.query?.customerId || ''

    const { orders, isLoading } = useOrders(customerId)

    if (isLoading) {
        return (   
            <Layout title='Orders'>
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
        <Layout title='Orders'>
            <Orders orders={orders} />
        </Layout>
    )
}

export default OrdersPage
