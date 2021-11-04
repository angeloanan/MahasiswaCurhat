import React from 'react'
import NextLink from 'next/link'
import { useSession } from 'next-auth/react'
import { Plus } from 'react-feather'

function RightNav() {
  const { data, status } = useSession()

  return (
    <div className='flex flex-row items-center h-full col-span-8 col-start-13 gap-4'>
      {status === 'loading' ? (
        <div className='p-4'></div>
      ) : status == 'unauthenticated' ? (
        <NextLink href='/login'>
          <a className='p-4 hover:bg-red-800'>Login</a>
        </NextLink>
      ) : status == 'authenticated' ? (
        <div className='flex items-center gap-4'>
          <NextLink href='/create'>
            <a className=''>
              <div className='flex flex-row items-center gap-2 p-2 px-4 text-black bg-yellow-300 rounded-lg hover:bg-yellow-400'>
                <Plus size={18} /> Curhat
              </div>
            </a>
          </NextLink>
          <div className='py-4'>Halo {data?.user?.name}</div>
        </div>
      ) : (
        <div>Unknown error. Refresh the page!</div>
      )}
    </div>
  )
}

function Navbar() {
  return (
    <nav className='flex flex-row justify-between w-full px-4 text-lg text-white bg-red-600'>
      <div className='flex'>
        <NextLink href='/' passHref>
          <a className='flex items-center px-4 text-2xl font-bold tracking-tight'>
            <div>Mahasiswa Curhat</div>
          </a>
        </NextLink>
        <NextLink href='/explore' passHref>
          <a className='px-4 py-4 font-medium text-gray-200 hover:bg-red-800'>
            <div>Explore</div>
          </a>
        </NextLink>
      </div>
      <RightNav />
    </nav>
  )
}

export default Navbar
