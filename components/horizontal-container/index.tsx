// components/horizontal-container/index.tsx

import styles from "./horizontal-container.module.scss"
import React, { ReactNode } from "react"

type Props = {
    children?: ReactNode
}

export const HorizontalContainer = ({ children }: Props) => {
    return <div className={styles.container}>{children}</div>
}

export default HorizontalContainer
