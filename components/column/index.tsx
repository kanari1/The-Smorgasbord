// components/column/index.tsx
"use-strict"

import styles from "./column.module.scss"
import React from "react"


export const Column = ({ children }) => {
    return (
            <div className={styles.column}>
                {children} </div> )}


export default Column
