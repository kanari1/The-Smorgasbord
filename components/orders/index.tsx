import Order from "./order"
import styles from "./orders.module.scss"

export const Orders = ({ orders }) => {
    return (
        <>
            <div>
                <div className={styles.row}>
                    <p className={styles.cell}>ID</p>
                    <p className={styles.cell}>Customer</p>
                    <p className={styles.cell}>Location</p>
                    <p className={styles.cell}>Courier</p>
                    <p className={styles.cell}>Status</p>
                    <p className={styles.cell}>Details</p>
                </div>
                {orders && orders.map((order) => (
                    <div key={order.orderId}>
                        <Order 
                            id={order.orderId} 
                            customer={order.customer}
                            location={order.location}
                            courier={order.courier}
                            status={order.status}
                        />
                    </div>
                ))}
            </div>
        </>
    )
}

export default Orders
