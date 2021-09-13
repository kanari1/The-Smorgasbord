import Customer from './customer';
import styles from "./customers.module.scss"

export const Customers = ({ customers }) => {
    return (
        <div className={styles.container}>
            <div className={styles.row}>
                <p className={styles.cell}>ID</p>
                <p className={styles.cell}>Name</p>
                <p className={styles.cell}>Email</p>
            </div>
            {customers && customers.map((customer) => (
                <div key={customer.customerId} className="py-2">
                    <Customer 
                        id={customer.customerId} 
                        name={customer.name}
                        email={customer.email} 
                    />
                </div>
            ))}
        </div>
    )
}

export default Customers
