import Head from 'next/head'
import React from 'react'

function Layout({ children }) {
    return (
        <>
            <Head>
                <title>UI Directory</title>
                <meta name="description" content="A Directory to store hosted components" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main >
                {children}
            </main>
        </>

    )
}

export default Layout