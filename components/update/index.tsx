import cn from "clsx"
import { useRouter } from 'next/router'
import { useEffect, useState } from "react"

import Button from "@/components/button"
import { useCustomers, useLocations } from "@/lib/swr-hooks"
import styles from "./update.module.scss"

export const Update = ({ alert, isAlerted, label, placeholder, updateFunc, isLoading, value }) => {
    const [inputText, setInputText] = useState('');

    const submitFunc = () => {
        updateFunc(inputText);
        setInputText('');
    }

    return (
            <div className={styles.update}>
                <label>{label}:</label>
                <input 
                    className={cn(isAlerted && styles.alert)}
                    type='text' 
                    placeholder={placeholder}
                    value={inputText} 
                    onChange={(e) => {
                        setInputText(e.target.value);
                        alert(false)
                    }}
                />
                <Button disabled={isLoading} className={styles.button} onClick={submitFunc}>
                    {isLoading ? "Updating ..." : "Update"}
                </Button>
            </div>
    )
}

export const UpdateCustomer = ({ alert, isAlerted, label, selected, updateFunc, isLoading }) => {
    const [customer, setCustomer] = useState(selected);
    const Router = useRouter()
    useEffect(() => {
        setCustomer(selected)
    }, [selected])
    const { customers } = useCustomers()

    const submitFunc = () => {
        updateFunc(customer);
    }

    return (
            <div className={styles.update}>
                <label>{label}:</label>
                <select 
                    className={cn(styles.select, isAlerted && styles.alert)}
                    onChange={(e) => {
                        setCustomer(e.target.value)
                        alert(false)
                    }}
                    value={customer}>
                    <option value=''></option>
                    {customers && customers.map(({ customerId, name }) => (
                        <option value={customerId} key={customerId}> 
                            {`${customerId} - ${name}`}
                        </option>
                    ))}
                </select>
                <Button disabled={isLoading} className={styles.button} onClick={submitFunc}>
                    {isLoading ? "Updating ..." : "Update"}
                </Button>
            </div>
    )
}

export const UpdateLocation = ({ alert, isAlerted, label, selected, updateFunc, isLoading }) => {
    const [location, setLocation] = useState(selected);
    useEffect(() => {
        setLocation(selected)
    }, [selected])
    const { locations } = useLocations()

    const submitFunc = () => {
        updateFunc(location);
    }

    return (
            <div className={styles.update}>
                <label>{label}:</label>
                <select 
                    className={cn(styles.select, isAlerted && styles.alert)}
                    onChange={(e) => {
                        setLocation(e.target.value)
                        alert(false)
                    }}
                    value={location}>
                    <option value=''></option>
                    {locations && locations.map(({ locationId, name, address }) => (
                        <option value={locationId} key={locationId}> 
                            {`${locationId} - ${name} - ${address}`}
                        </option>
                    ))}
                </select>
                <Button disabled={isLoading} className={styles.button} onClick={submitFunc}>
                    {isLoading ? "Updating ..." : "Update"}
                </Button>
            </div>
    )
}

Update.defaultProps = {
    alert: () => {},
    isAlerted: false,
    label: '',
    placeholder: '',
    updateFunc: () => {},
    isLoading: false,
}

UpdateCustomer.defaultProps = {
    alert: () => {},
    isAlerted: false,
    label: '',
    selected: '',
    updateFunc: () => {},
    isLoading: false,
}

UpdateLocation.defaultProps = {
    alert: () => {},
    isAlerted: false,
    label: '',
    selected: '',
    updateFunc: () => {},
    isLoading: false,
}

export default Update
