import { useState } from "react"

import Button from "@/components/button"
import styles from "./filter.module.scss"

export const Filter = ({ filterAttribute='', filterFunc, isLoading, placeholder='' }) => {
    const [inputText, setInputText] = useState('');
    const filterText = filterAttribute ? ` by ${filterAttribute}` : ''

    return (
            <div className={styles.filter}>
                <label htmlFor='filter-input'>Filter{filterText}:</label>
                <input 
                    type='text' 
                    value={inputText} 
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder={placeholder}
                    id='filter-input'
                />
                <Button disabled={isLoading} className={styles.button} onClick={() => filterFunc(inputText)}>
                    {isLoading ? "Filtering ..." : "Filter"}
                </Button>
            </div>
    )
}

export const BrandFilter = ({ filterAttribute='', filterFunc, isLoading, selected='', brands=[] }) => {
    const [filter, setFilter] = useState(selected || '')
    const filterText = filterAttribute ? ` by ${filterAttribute}` : ''

    return (
            <div className={styles.filter}>
                <label htmlFor='filter-input'>Filter{filterText}:</label>
                <select 
                    className={styles.select}
                    id='filter-input'
                    onChange={(e) => setFilter(e.target.value)}
                    value={filter}>
                    <option value=''></option>
                    {brands && brands.map(({ brandId, name }) => (
                        <option value={brandId} key={brandId}> 
                            {`${brandId} - ${name}`}
                        </option>
                    ))}
                </select>
                <Button disabled={isLoading} className={styles.button} onClick={() => filterFunc(filter)}>
                    {isLoading ? "Filtering ..." : "Filter"}
                </Button>
            </div>
    )
}

export default Filter
