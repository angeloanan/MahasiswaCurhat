import '../lib/why-did-you-render'
import '@fontsource/inter/variable.css'
import 'tailwindcss/tailwind.css'
import './styles.css'
import SEO from '../../next-seo.config'

import { DefaultSeo } from 'next-seo'
import type { AppProps } from 'next/app'
import type { Session } from 'next-auth'
import { NextPage } from 'next'
import Head from 'next/head'
import { SessionProvider } from 'next-auth/react'
import Navbar from '../components/Navbar'
import CurhatComposer from '../components/Modal/CurhatComposer'

export type NextPageWithDisableLayout = NextPage & {
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
          <DefaultSeo {...SEO} />
          <CurhatComposer />
          <Navbar />

          <main>
            <Component {...pageProps} />
          </main>
        </>
      )}
    </SessionProvider>
  )
}

export default CustomApp
