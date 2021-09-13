import cn from "clsx"

import Brand from './brand';
import styles from "./brands.module.scss"

export const Brands = ({ brands }) => {

  if (brands) {
    return (
      <div className={styles.container}>
        <div className={styles.row}>
            <p className={styles.cell}>ID</p>
            <p className={styles.cell}>Name</p>
        </div>
        {brands.map((brand) => (
          <div key={brand.brandId} className="py-2">
              <Brand 
                  id={brand.brandId} 
                  name={brand.name}
                  logo={brand.logo}
              />
          </div>
        ))}
      </div>
    )
  } else {
    return null
  }
}

export default Brands
