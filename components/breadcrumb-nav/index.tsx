// components/header/index.tsx

import cn from "classnames"
import styles from "./header.module.scss"
import Link from "next/link"
import { useRouter } from 'next/router';
import React, { useEffect, useState } from "react"

const convertCrumb = string => {
  return string
    .replace(/-/g, ' ')
    .replace(/oe/g, 'ö')
    .replace(/ae/g, 'ä')
    .replace(/ue/g, 'ü')
    .replace(/\?.*$/, '')
    .replace(/\%20/, ' ')
    .toUpperCase();
};

export const Header = (): JSX.Element => {
    const Router = useRouter();
    const [crumbs, setCrumbs] = useState(null);
    const customerId = Router.query.customerId || ''

    useEffect(() => {
        if (Router) {
            const linkPath = Router.asPath.split('/');
            linkPath.shift();

            const pathArray = [];
            linkPath.forEach((path, i) => {
                if (path) {
                    pathArray.push({ 
                        breadCrumb: path, 
                        href: '/' + linkPath.slice(0, i + 1).join('/') 
                    });
                }
            });

            setCrumbs(pathArray);
        }
    }, [Router]);

    return (
        <header className={styles.header}>
            <Link href={`/?customerId=${customerId}`} as={'/'}>
                <a className={styles.left}>HOME</a>
            </Link>
            {crumbs && crumbs.map((crumb, crumbIdx) => (
                <Link href={`${crumb.href}?customerId=${customerId}`} as={crumb.href} key={crumb.href}>
                    <a>{'/ ' + convertCrumb(crumb.breadCrumb)}</a>
                </Link>
            ))}
            <Link href={`/orders?customerId=${customerId}`} as='/orders'>
                <a className={styles.right}>ORDERS</a>
            </Link>
        </header>
    )
}

export default Header
