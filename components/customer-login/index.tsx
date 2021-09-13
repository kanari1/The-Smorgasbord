import { useState } from "react"
import { useRouter} from "next/router"
import { mutate } from "swr"

import Button from "@/components/button"
import styles from "./customer-login.module.scss"

export const CustomerLogin = ({ setCustomer, customers }) => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [submitting, setSubmitting] = useState(false)
    const [register, toggleRegister] = useState(false)

    const Router = useRouter()

    let buttonText = register ? "Register" : "Login";
    let toggleText = register ? "login" : "register";

    const mutateCustomers = () => {
        const lastCustomerId = customers.length;
        const newCustomer = {
                customerId: lastCustomerId + 1,
                email,
                name,
        }
        return [...customers, newCustomer]
    }

    async function submitHandler(e) {
        setSubmitting(true)
        e.preventDefault()
        let data = { 
            email,
            name,
        }
        try {
            if (register) {
                setCustomer('')
                mutate(`/api/get-customers`, mutateCustomers(), false)
                let res = await fetch(`/api/create-customer`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                })
                let json = await res.json()
                if (!res.ok) throw Error(json.message)
                mutate(`/api/get-customers`)
            } else {
                setCustomer(email)
                setSubmitting(false)
            }
        } catch (err) {
            throw Error(err.message)
        } finally {
            setName("")
            setEmail("")
            setSubmitting(false)
        }
    }

    return (
        <div className={styles.loginForm}>
            <h2 className={styles.heading}>Login / Register</h2>
            <form className={styles.form}> 
                <div className={styles.field}>
                    <label className={styles.label} htmlFor='customer-email'>Email</label>
                    <input
                        className={styles.input}
                        id='customer-email'
                        type='email'
                        name='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                {register && 
                    <div className={styles.field}>
                        <label className={styles.label} htmlFor='customer-name'>Name</label>
                        <input
                            className={styles.input}
                            id='customer-name'
                            type='text'
                            name='name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                }
                <div className={styles.toggle} onClick={() => toggleRegister(!register)}>{toggleText}</div>
                <div className={styles.submit}>
                    <Button disabled={submitting} type='button' onClick={submitHandler}>
                        {submitting ? "Working ..." : buttonText}
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default CustomerLogin;
