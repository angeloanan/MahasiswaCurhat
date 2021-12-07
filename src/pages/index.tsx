import * as React from 'react'
import NextLink from 'next/link'

import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'

const HomePage: NextPage = () => {
  const { data, status } = useSession()

  return (
    <div className='max-w-prose'>
      <div>Your authentication status: {status}</div>

      <pre className='p-4 overflow-scroll'>{JSON.stringify(data, null, 2)}</pre>

      <NextLink href='/api/auth/signin' passHref>
        <a className='p-4 m-2 text-blue-600 bg-yellow-400'>Sign in</a>
      </NextLink>
      <NextLink href='/api/auth/signout' passHref>
        <a className='p-4 m-2 text-red-600 bg-yellow-400 '>Sign out</a>
      </NextLink>
    </div>
  )
}

export default HomePage
