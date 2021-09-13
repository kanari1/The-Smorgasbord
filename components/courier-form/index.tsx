import { useState } from "react"

import Button from "@/components/button"
import styles from "./courier-form.module.scss"

export const CourierForm = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [submitting, setSubmitting] = useState(false)
    let buttonText = "Sign Up"

    async function submitHandler(e) {
        setSubmitting(true)
        e.preventDefault()
        let data = { 
            email,
            name,
        }
        try {
            let res = await fetch(`/api/create-courier`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
            let json = await res.json()
            if (!res.ok) throw Error(json.message)
        } catch (err) {
            throw Error(err.message)
        } finally {
            setSubmitting(false)
            setName('')
            setEmail('')
        }
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>Become a Courier</h2>
            <form className={styles.form} onSubmit={submitHandler}>
                <div className={styles.field}>
                    <label className={styles.label} htmlFor='courier-email'>Email</label>
                    <input
                        className={styles.input}
                        id='courier-email'
                        type='email'
                        name='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className={styles.field}>
                    <label className={styles.label} htmlFor='courier-name'>Name</label>
                    <input
                        className={styles.input}
                        id='courier-name'
                        type='text'
                        name='name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className={styles.submit}>
                    <Button disabled={submitting} type='submit'>
                        {submitting ? "Working ..." : buttonText}
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default CourierForm;
