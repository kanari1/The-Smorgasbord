import Link from "next/link"
import { useRouter } from "next/router"
import Layout from "@/components/layout"

export const IndexPage = () => {
    const Router = useRouter()
    const customerId = Router.query.customerId || ''
    return (   
        <Layout home title='The Smorgasbord'>
            <Link href={`/customers?customerId=${customerId}`} as='/customers'><a className='homeA'>Customer / Courier Page</a></Link>
            <p className='homeP'>Allows user to "login" or register as a Customer, or register as a Courier.</p>
            <Link href={`/brands?customerId=${customerId}`} as='/brands'><a className='homeA'>RestaurantBrands Page</a></Link>
            <p className='homeP'>Lists all RestaurantBrands and their details.</p>
            <Link href={`/brands/locations?customerId=${customerId}`} as='/brands/locations'><a className='homeA'>RestaurantLocations Page</a></Link>
            <p className='homeP'>Lists all RestaurantLocations of a brand and their details.</p>
            <Link href={`/brands/locations/menu-items?customerId=${customerId}`} as='/brands/locations/menu-items'><a className='homeA'>MenuItems Page</a></Link>
            <p className='homeP'>Lists MenuItems of a particular location, as selected from previous page, or all of them. Also allows for creation and editing of Orders.</p>
                <Link href={`/orders?customerId=${customerId}`} as='/orders'><a className='homeA'>Orders Page</a></Link>
            <p className='homeP'>Lists all orders, or orders for particular customer.</p>
                <Link href={`/orders/line-items?customerId=${customerId}`} as='/orders/line-items'><a className='homeA'>LineItems Page</a></Link>
            <p className='homeP'>Shows details for a particular order or all orders.</p>
        </Layout>
    )
}

export default IndexPage
