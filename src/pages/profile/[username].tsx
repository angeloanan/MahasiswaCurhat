import * as React from 'react'
import NextLink from 'next/link'

import { useSession } from 'next-auth/react'

const HomePage = () => {
  const { data, status } = useSession()

  return (
    <>
      <div className='text-2xl font-bold'>Mahasiswa curhat</div>
      <div>Your authentication status: {status}</div>

      <div className='p-4'>
        <div>Username: {data?.user?.username}</div>
      </div>

      <NextLink href='/api/auth/signin' passHref>
        <a className='p-4 m-2 text-blue-600 bg-yellow-400'>Sign in</a>
      </NextLink>
      <NextLink href='/api/auth/signout' passHref>
        <a className='p-4 m-2 text-red-600 bg-yellow-400 '>Sign out</a>
      </NextLink>
    </>
  )
}

export default HomePage
