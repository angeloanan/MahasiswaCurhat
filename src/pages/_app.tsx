import '@fontsource/inter'
import 'tailwindcss/tailwind.css'

import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import type { Session } from 'next-auth'

interface CustomAppProps {
  session: Session
}

function CustomApp({ Component, pageProps: { session, ...pageProps } }: AppProps<CustomAppProps>) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />)
    </SessionProvider>
  )
}

export default CustomApp
