// components/splash/index.tsx

import React from "react"
import styles from "./splash.module.scss"

const Splash = ({ children }) => {
    return (
        <section className={styles.background}>
            {children}
        </section>
    )
}

export default Splash
