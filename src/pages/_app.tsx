import '@fontsource/inter/variable.css'
import 'tailwindcss/tailwind.css'
import './styles.css'

import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import type { Session } from 'next-auth'
import Navbar from '../components/Navbar'
import { NextPage } from 'next'

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
