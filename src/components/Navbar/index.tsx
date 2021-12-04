import React from 'react'
import NextLink from 'next/link'
import { useSession } from 'next-auth/react'
import { PlusIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import Button from '../UI/Button'
import NextImage from 'next/image'
import CurhatComposer, { CurhatModalOpenAtom } from '../Modal/CurhatComposer'
import { useAtom } from 'jotai'

function RightNav() {
  const { data, status } = useSession()
  const [, setCurhatModalOpen] = useAtom(CurhatModalOpenAtom)

  return (
    <div className='flex flex-row items-center h-full col-span-8 col-start-13 gap-4'>
      {status === 'loading' ? null : status == 'unauthenticated' || data == null ? (
        <>
          <NextLink href='/login' passHref>
            <a className='flex items-center gap-2 px-4 py-2 text-indigo-100 bg-indigo-800 rounded-md hover:bg-indigo-900 hover:text-white'>
              Login
            </a>
          </NextLink>
          <NextLink href='/login' passHref>
            <a className='flex items-center gap-2 px-4 py-2 text-indigo-100 bg-indigo-800 rounded-md hover:bg-indigo-900 hover:text-white'>
              Register
            </a>
          </NextLink>
        </>
      ) : status == 'authenticated' ? (
        <div className='flex items-center gap-6'>
          <Button onClick={() => setCurhatModalOpen(true)}>
            <PlusIcon className='w-5 h-5' /> Curhat
          </Button>

          <NextLink href={`/user/${data?.user?.username}`}>
            <a className='relative w-12 h-12 rounded-full'>
              <NextImage
                src={
                  data?.user?.image ??
                  `https://source.boringavatars.com/beam/256/${encodeURIComponent(data?.user.id)}}`
                }
                layout='fill'
                className='rounded-full'
              />
            </a>
          </NextLink>
        </div>
      ) : (
        <div>Unknown error. Refresh the page!</div>
      )}
    </div>
  )
}

const NavbarLinks: React.FunctionComponent<{ path: string }> = ({ children, path }) => {
  const router = useRouter()

  return (
    <NextLink href={path} passHref>
      <a
        className={`px-3 py-2 text-gray-300 ${
          router.pathname === path
            ? 'bg-gray-900'
            : 'bg-gray-800 hover:bg-gray-700 hover:text-white'
        } rounded-md`}
      >
        {children}
      </a>
    </NextLink>
  )
}

function Navbar() {
  return (
    <nav className='flex flex-row justify-between w-full px-12 py-6 text-lg bg-gray-800'>
      <div className='flex items-center gap-6'>
        <NextLink href='/' passHref>
          <a className='flex items-center px-4 text-2xl font-bold text-white'>
            <div>Mahasiswa Curhat</div>
          </a>
        </NextLink>
        <NavbarLinks path='/explore'>Explore</NavbarLinks>
        <NavbarLinks path='/explore'>Extra Stuff</NavbarLinks>
        <NavbarLinks path='/about'>About</NavbarLinks>
      </div>
      <RightNav />
      <CurhatComposer />
    </nav>
  )
}

export default Navbar
