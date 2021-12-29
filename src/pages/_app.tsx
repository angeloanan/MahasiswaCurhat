import * as React from 'react'

import '@lib/why-did-you-render'
import '@fontsource/inter/variable.css'
import 'tailwindcss/tailwind.css'
import './styles.css'
import SEO from '../../next-seo.config'
import Script from 'next/script'
import { GoogleAnalytics } from '@lib/gtag'

import type { AppProps } from 'next/app'
import type { Session } from 'next-auth'
import type { NextPage } from 'next'
import { DefaultSeo } from 'next-seo'
import { SessionProvider } from 'next-auth/react'
import Navbar from '@components/Navbar'
import CurhatComposer from '@components/Modal/CurhatComposer'

export type NextPageWithDisableLayout = NextPage & {
  disableLayout?: boolean
}

type CustomAppProps = AppProps & {
  Component: NextPageWithDisableLayout
  pageProps: {
    session: Session
  }
}

const Analytics = () => {
  if (process.env.NODE_ENV !== 'production') {
    return null
  } else {
    return (
      <>
        <GoogleAnalytics />
        {/* Cloudflare Analytics */}
        <Script
          strategy='afterInteractive'
          src='https://static.cloudflareinsights.com/beacon.min.js'
          data-cf-beacon='{"token": "138785c1db39462081dcd5577c881c2c"}'
        />
      </>
    )
  }
}

function CustomApp({ Component, pageProps: { session, ...pageProps } }: CustomAppProps) {
  return (
    <SessionProvider session={session}>
      {Component.disableLayout ? (
        <Component {...pageProps} />
      ) : (
        <>
          <DefaultSeo {...SEO} />
          <Analytics />

          {/* Modal store */}
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
