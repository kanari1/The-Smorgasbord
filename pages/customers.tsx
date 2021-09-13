import { useState } from "react"
import Skeleton from "react-loading-skeleton"

import CourierForm from "@/components/courier-form"
import CustomerLogin from "@/components/customer-login"
import Customers from "@/components/customers"
import Layout from "@/components/layout"
import Splash from "@/components/splash"
import { useCustomers } from "@/lib/swr-hooks"

export const CustomersPage = () => {
    const [ filterString, setFilterString ] = useState('')
    const { customers, isLoading } = useCustomers(filterString)

    return (   
        <Layout home title='The Smorgasbord'>
            <div className='loginContainer'>
            <CustomerLogin 
                customers={customers}
                setCustomer={(customer) => setFilterString(customer)} 
            />
                <CourierForm />
            </div> 
            <Customers customers={customers} />
        </Layout>
    )
}

export default CustomersPage
