import React from 'react'
import NextLink from 'next/link'
import { useSession } from 'next-auth/react'
import { PlusIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import Button from '@components/UI/Button'
import NextImage from 'next/image'
import { CurhatModalOpenAtom } from '@components/Modal/CurhatComposer'
import { useAtom } from 'jotai'
import LoadingIndicator from '@components/Icon/LoadingIndicator'

const JoinUsButton = () => {
  return (
    <NextLink href='/login' passHref>
      <a className='flex gap-2 items-center py-2 px-4 text-indigo-100 bg-indigo-800 rounded-md hover:bg-indigo-900 hover:text-white'>
        Join us
      </a>
    </NextLink>
  )
}

function RightNav() {
  const { data, status } = useSession()
  const [, setCurhatModalOpen] = useAtom(CurhatModalOpenAtom)

  return (
    <div className='flex flex-row gap-4 justify-center h-full'>
      {status === 'loading' ? (
        <LoadingIndicator className='w-8 h-8 text-white animate-spin' />
      ) : status === 'unauthenticated' || data == null ? (
        <JoinUsButton />
      ) : status === 'authenticated' ? (
        <div className='flex gap-6 items-center'>
          <Button onClick={() => setCurhatModalOpen(true)}>
            <PlusIcon className='w-5 h-5' /> <div className='hidden md:block'>Curhat</div>
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

const NavbarLinks = ({
  className,
  path,
  ...props
}: React.ComponentProps<'a'> & { path: string }) => {
  const router = useRouter()

  return (
    <NextLink href={path} passHref>
      <a
        className={`px-3 py-2 text-gray-300 ${
          router.pathname === path
            ? 'bg-gray-900'
            : 'bg-gray-800 hover:bg-gray-700 hover:text-white'
        } rounded-md ${className}`}
        {...props}
      />
    </NextLink>
  )
}

function Navbar() {
  return (
    <header className='sticky bg-gray-800'>
      <nav>
        <div className='flex flex-row justify-between py-4 px-2 pb-0 w-full text-lg md:px-12 md:py-6'>
          <div className='flex gap-6 items-center'>
            <NextLink href='/' passHref>
              <a className='flex items-center px-4 text-lg font-bold text-white lg:text-2xl'>
                Mahasiswa Curhat
              </a>
            </NextLink>
            <NavbarLinks className='hidden md:block' path='/explore'>
              Explore
            </NavbarLinks>
            <NavbarLinks className='hidden md:block' path='/about'>
              About
            </NavbarLinks>
          </div>
          <RightNav />
        </div>
        <div className='flex flex-wrap justify-center p-4 space-x-6 md:hidden'>
          <NavbarLinks path='/explore'>Explore</NavbarLinks>
          <NavbarLinks path='/about'>About</NavbarLinks>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
