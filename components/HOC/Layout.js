import Head from 'next/head'
import React from 'react'

function Layout({ children }) {
    return (
        <>
            <Head>
                <title>FormCentre</title>
                <meta name="description" content="Formik \& MUI combo" />
                <link rel="apple-touch-icon" sizes="180x180" href="/my_favicon/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/my_favicon/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/my_favicon/favicon-16x16.png" />
                <link rel="manifest" href="/my_favicon/site.webmanifest" />
            </Head>

            <main >
                {children}
            </main>
        </>

    )
}

export default Layout