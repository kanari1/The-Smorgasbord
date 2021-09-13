import Link from 'next/link'
import cn from 'clsx'

import styles from "./button-link.module.scss"

function ButtonLink({ as = null, href = '/', className = '', children }) {
  return (
    <Link href={href} as={as}>
      <a className={styles.button}>
        {children}
      </a>
    </Link>
  )
}

export default ButtonLink
