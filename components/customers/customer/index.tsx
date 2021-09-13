import Link from "next/link"

import styles from "./customer.module.scss"

export const Customer = ({ id, name, email }) => {

    return (
        <div className={styles.row}> 
            <p className={styles.id}>{id}</p>
            <div className={styles.name}>
                <Link 
                    href={`/brands?customerId=${id}`}
                    as={`/brands`}
                >
                    <a>{name}</a>
                </Link>
            </div>
            <p className={styles.email}>{email}</p>
        </div>
    )
}

export default Customer
