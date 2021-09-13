import Link from "next/link"

import styles from "./line-item.module.scss"

export const LineItem = ({ id, name, price, quantity }) => {
    const total = (price * quantity).toFixed(2)

    return (
        <div className={styles.row}> 
            <p className={styles.id}>{id}</p>
            <p className={styles.name}>{name}</p>
            <p className={styles.price}>{price}</p>
            <p className={styles.qty}>{quantity}</p>
            <p className={styles.total}>{total}</p>
        </div>
    )
}

export default LineItem
