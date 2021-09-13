import { useRouter } from 'next/router'
import { useState } from "react"
import Skeleton from "react-loading-skeleton"

import BrandForm from "@/components/brand-form"
import Filter from "@/components/filter"
import Layout from "@/components/layout"
import Brands from "@/components/brands"
import { useBrands } from '@/lib/swr-hooks'

export const BrandsPage = () => {
    const [ filterString, setFilterString ] = useState('')
    const { brands, isLoading } = useBrands(filterString)

    if (isLoading) {
        return (   
            <Layout title='Restaurant Brands'>
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
        <Layout title='Restaurant Brands'>
            <div className='heading'>
                <h2 className='title'>Restaurant Brands</h2>
            </div>
            <Filter filterAttribute='Brand Name' filterFunc={(brandName) => setFilterString(brandName)} isLoading={isLoading} />
            <BrandForm brands={brands} currentFilter={filterString} /> 
            <Brands brands={brands} />
        </Layout>
    )
}

export default BrandsPage
