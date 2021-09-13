// components/layout/index.tsx

import Footer from "components/footer"
import Header from "components/header"
import styles from "./layout.module.scss"
import Head from "next/head"
import Link from "next/link"
import React, { ReactNode } from "react"

type Props = {
    children?: ReactNode
    home?: boolean | null
    id?: string
    title?: string
}

export const Layout = ({
    children,
    home = false,
    id = '',
    title = "The Smorgasbord",
}: Props): JSX.Element => {
    return (
        <div className={styles.container}>
            <Head>
                <link
                    rel='apple-touch-icon'
                    sizes='180x180'
                    href='/icons/apple-touch-icon.png'
                />
                <link
                    rel='icon'
                    type='image/png'
                    sizes='32x32'
                    href='/icons/favicon-32x32.png'
                />
                <link
                    rel='icon'
                    type='image/png'
                    sizes='16x16'
                    href='/icons/favicon-16x16.png'
                />
                <link rel='manifest' href='/site.webmanifest' />
                <meta name='description' content={title} />
                <meta
                    property='og:image'
                    content={`https://og-image.now.sh/${encodeURI(
                        title
                    )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
                />
                <meta name='og:title' content={title} />
                <meta name='twitter:card' content='summary_large_image' />
                <title>{title}</title>
            </Head>

            <Header />

            <main className={styles.main}>{children}</main>

            <Footer />
        </div>
    )
}

export default Layout
