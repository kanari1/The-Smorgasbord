import cn from "clsx";
import { useState } from "react";
import styles from "./toggle-switch.module.scss"

export const ToggleSwitch = ({ left, right, onToggle }) => {
    return (
        <div className={styles.switch}>
            <input 
                className={styles.switchInput} 
                id="switch"
                type="checkbox" 
                onChange={onToggle}
            />
            <label className={styles.switchLabel} htmlFor="switch"></label>
            <p className={styles.left}>{left}</p><p className={styles.right}>{right}</p>
        </div>
    )
}

export default ToggleSwitch
