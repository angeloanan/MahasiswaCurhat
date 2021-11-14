import '@fontsource/inter/variable.css'
import 'tailwindcss/tailwind.css'
import './styles.css'

import type { AppProps } from 'next/app'
import type { Session } from 'next-auth'
import { NextPage } from 'next'
import Head from 'next/head'
import { SessionProvider } from 'next-auth/react'
import Navbar from '../components/Navbar'

type NextPageWithDisableLayout = NextPage & {
  disableLayout?: boolean
}

type CustomAppProps = AppProps & {
  Component: NextPageWithDisableLayout
  pageProps: {
    session: Session
  }
}

function CustomApp({ Component, pageProps: { session, ...pageProps } }: CustomAppProps) {
  return (
    <SessionProvider session={session}>
      {Component.disableLayout ? (
        <Component {...pageProps} />
      ) : (
        <>
          <Head>
            <meta
              name='google-site-verification'
              content='6hRj86Hx02xLCsII57JKBQfSui5rHpi9mpF_8DLhDm4'
            />
          </Head>
          <Navbar />

          <main className='flex flex-col content-center justify-center w-full pt-4 mx-auto'>
            <Component {...pageProps} />
          </main>
        </>
      )}
    </SessionProvider>
  )
}

export default CustomApp
