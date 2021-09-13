import cn from "clsx"

import RestaurantForm from "@/components/restaurant-form"
import Restaurant from "./restaurant"
import styles from "./restaurants.module.scss"

export const Restaurants = ({ isFiltered, restaurants }) => {
    return (
        <div className={styles.container}>
            <div className={styles.row}>
                <p className={styles.cell}>ID</p>
                <p className={styles.cell}>Name</p>
                <p className={styles.cell}>Hours</p>
                <p className={styles.cell}>Address</p>
                <p className={styles.cell}>Actions</p>
            </div>
            <RestaurantForm
                currentFilter={isFiltered}
                restaurants={restaurants}
            />
            {restaurants &&
                restaurants.map((restaurant) => (
                    <div key={restaurant.locationId} className='py-2'>
                        <Restaurant
                            address={restaurant.address}
                            brandId={restaurant.brandId}
                            closeTime={restaurant.closeTime}
                            id={restaurant.locationId}
                            logo={restaurant.logo}
                            name={restaurant.name}
                            openTime={restaurant.openTime}
                            isFiltered={isFiltered}
                            restaurants={restaurants}
                        />
                    </div>
                ))}
        </div>
    )
}

export default Restaurants
