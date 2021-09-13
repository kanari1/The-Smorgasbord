import { useState } from "react"
import { useRouter } from "next/router"

import Button from "@/components/button"
import styles from "./brand-login.module.scss"

export const BrandLogin = () => {
    const [name, setName] = useState("")
    const [logoFileName, setLogoFileName] = useState("")
    const [logoFile, setLogoFile] = useState("")
    const [submitting, setSubmitting] = useState(false)
    const [register, toggleRegister] = useState(false)
    const Router = useRouter()
    let buttonText = register ? "Register" : "Login";
    let toggleText = register ? "login" : "register";

    const onLogoChange = (e) => {
        if (!e.target.files?.length) {
            return;
        }
        setLogoFileName(e.target.files[0].name);
        setLogoFile(e.target.files[0]);
    }

    const registerFields = (
        <>
            <div className={styles.field}>
                <label className={styles.label} htmlFor='name'>Brand Name</label>
                <input
                    className={styles.input}
                    id='name'
                    type='text'
                    name='name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className={`${styles.field} ${styles.fileField}`}>
                <label className={styles.label} htmlFor="logo">Brand logo (PNG, JPG)</label>
                <input 
                    className={`${styles.input} ${styles.fileInput}`}
                    type="file" 
                    id="logo" 
                    name="logo" 
                    accept=".jpg, .jpeg, .png" 
                    onChange={onLogoChange}
                />
            </div>
        </>
    )
    const loginFields = (
        <div className={styles.field}>
            <label className={styles.label} htmlFor='name'>Brand Name</label>
            <input
                className={styles.input}
                id='name'
                type='text'
                name='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
        </div>
    )

    async function submitHandler(e) {
        setSubmitting(true)
        e.preventDefault()
        let data = { 
            name,
            //logoFileName
            logoFileName: 'taco-town.png'
        }
        try {
            if (register) {
                const formData = new FormData();
                formData.set('logo', logoFile);
                let res = await fetch('/api/upload', {
                    method: "POST",
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    body: formData,
                });
                let json = await res.json()
                if (!res.ok) throw Error(json.message)
                res = await fetch(`/api/create-restaurant-brand`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                })
                json = await res.json()
                if (!res.ok) throw Error(json.message)
            }
            let res = await fetch(`/api/get-restaurant-brand`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
            let json = await res.json()
            if (!res.ok) throw Error(json.message)
            Router.push({
                pathname: "/brands/locations",
                query: { brandId: json.brandId },
            }, "/brands/locations")
        } catch (e) {
            throw Error(e.message)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <form onSubmit={submitHandler}>
            {register
                ? registerFields 
                : loginFields
            }
            <div className={styles.toggle} onClick={() => toggleRegister(!register)}>{toggleText}</div>
            <div className={styles.submit}>
                <Button disabled={submitting} type='submit'>
                    {submitting ? "Working ..." : buttonText}
                </Button>
            </div>
        </form>
    )
}

export default BrandLogin;
