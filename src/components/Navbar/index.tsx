import React from 'react'
import NextLink from 'next/link'
import { useSession } from 'next-auth/react'

function Navbar() {
  const { status } = useSession()

  return (
    <header className='bg-blue-300 min-h-[50px] grid grid-flow-col grid-cols-12 gap-4 content-center px-4 w-full text-lg font-medium'>
      <div className='flex flex-row items-center order-1 col-span-4 tracking-tight'>
        <NextLink href='/' passHref>
          <a>Mahasiswa Curhat</a>
        </NextLink>
      </div>
      <div className='order-2 col-span-8'></div>
      <div className='flex flex-row items-center order-3 col-span-4 gap-4'>
        <div>Explore</div>
        <NextLink href='/auth/signin' passHref>
          <a className='px-2 py-1 font-semibold bg-yellow-300 rounded-lg'>Login</a>
        </NextLink>
      </div>
    </header>
  )
}

export default Navbar
