import { useState } from "react"
import { useRouter } from "next/router"
import { mutate } from "swr"

import Button from "@/components/button"
import styles from "./brand-form.module.scss"

export const BrandForm = ({ brands, currentFilter }) => {
    const [name, setName] = useState("")
    const [logoFileName, setLogoFileName] = useState("")
    const [logoFile, setLogoFile] = useState("")
    const [submitting, setSubmitting] = useState(false)
    const Router = useRouter()

    const onLogoChange = (e) => {
        if (!e.target.files?.length) {
            setLogoFileName('');
            return
        }
        const timestamp = String(Date.now())
        setLogoFileName(timestamp + '-' + e.target.files[0].name);
        setLogoFile(e.target.files[0]);
    }

    const mutateKey = currentFilter
        ? `/api/get-restaurant-brands?name=${currentFilter}`
        : `/api/get-restaurant-brands`

    const mutateCreate = (fileUrl) => {
        let topId = { brandId: 1 }
        if (brands.length) {
            topId = brands.reduce((a, b) => {
                return { brandId: Math.max(a.brandId, b.brandId) }
            })
        }
        const newBrand = { 
            brandId: topId.brandId + 1,
            name,
            logo: fileUrl || '',
        }
        return [newBrand, ...brands]
    }


    async function submitHandler(e) {
        e.preventDefault()
        const uriFileName = encodeURIComponent(logoFileName)
        try {
            setSubmitting(true)
            let res = await fetch(`/api/upload-aws?file=${uriFileName}`);
            let json = await res.json()
            if (!res.ok) throw Error(json.message)
            const { url, fields } = json
            const formData = new FormData();
            Object.entries({ ...fields, file: logoFile }).forEach(([key, value]: [key:string, value: string | Blob]) => {
                formData.append(key, value);
            });
            res = await fetch(url, {
                method: "POST",
                body: formData,
            });
            if (res.ok) {
                console.log('Uploaded successfully!');
            } else {
                console.error('Upload failed.');
            }
            if (!res.ok) throw Error(json.message)
            const fileUrl = `${url}/${logoFileName}`
            let data = { 
                name,
                logo: fileUrl || '',
            }
            mutate(mutateKey, mutateCreate(fileUrl), false)
            res = await fetch(`/api/create-restaurant-brand`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
            json = await res.json()
            if (!res.ok) throw Error(json.message)
            mutate(mutateKey)
        } catch (e) {
            throw Error(e.message)
        } finally {
            setName('')
            setSubmitting(false)
        }
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>Register a Brand</h2>
            <form onSubmit={submitHandler}>
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
                <div className={styles.submit}>
                    <Button disabled={submitting} type='submit'>
                        {submitting ? "Creating ..." : "Create"}
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default BrandForm
