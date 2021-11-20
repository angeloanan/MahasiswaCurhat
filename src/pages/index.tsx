import * as React from 'react'
import NextLink from 'next/link'

import { useSession } from 'next-auth/react'

const HomePage = () => {
  const { data, status } = useSession()

  return (
    <div className='max-w-prose'>
      <div>Your authentication status: {status}</div>

      <div className='p-4'>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>

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
