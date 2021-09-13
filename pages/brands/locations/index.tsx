import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Skeleton from "react-loading-skeleton"

import { BrandFilter } from "@/components/filter"
import Layout from "@/components/layout"
import Restaurants from "@/components/restaurants"
import { useBrands, useLocations } from "@/lib/swr-hooks"

export const LocationsPage = () => {
    const Router = useRouter()
    const brandId = Array.isArray(Router.query?.brandId)
        ? Router.query?.brandId[0]
        : Router.query?.brandId || ""
    const customerId = Router.query?.customerId || ""
    const [filterString, setFilterString] = useState(brandId)
    const { locations, isLoading } = useLocations(filterString)
    const { brands } = useBrands()

    if (isLoading) {
        return (
            <Layout title='Restaurant Locations'>
                <Skeleton width={180} height={24} />
                <Skeleton height={48} />
                <div className='my-4' />
                <Skeleton width={180} height={24} />
                <Skeleton height={48} />
                <div className='my-4' />
                <Skeleton width={180} height={24} />
                <Skeleton height={48} />
            </Layout>
        )
    }

    return (
        <Layout title='Restaurant Locations'>
            <div className='heading'>
                <h2 className='title'>Restaurant Locations</h2>
            </div>
            <BrandFilter
                filterAttribute='Brand ID'
                filterFunc={(id) => setFilterString(id)}
                isLoading={isLoading}
                selected={filterString}
                brands={brands}
            />
            <Restaurants isFiltered={filterString} restaurants={locations} />
        </Layout>
    )
}

export default LocationsPage
