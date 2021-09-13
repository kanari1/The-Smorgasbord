import LineItem from './line-item';
import styles from "./line-items.module.scss"

export const LineItems = ({ lineItems }) => {
    return (
        <div className={styles.container}>
            <div className={styles.row}>
                <p className={styles.cell}>ID</p>
                <p className={styles.cell}>Name</p>
                <p className={styles.cell}>Price</p>
                <p className={styles.cell}>Quantity</p>
                <p className={styles.cell}>Total</p>
            </div>
            {lineItems && lineItems.map((lineItem) => (
                <div key={lineItem.lineItemId} className="py-2">
                    <LineItem 
                        id={lineItem.lineItemId} 
                        name={lineItem.name}
                        price={lineItem.price}
                        quantity={lineItem.quantity}
                    />
                </div>
            ))}
        </div>
    )
}

export default LineItems
