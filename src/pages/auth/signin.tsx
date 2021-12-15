import type { GetServerSideProps } from 'next'

import { Twitter, Google, Facebook } from '@icons-pack/react-simple-icons'
import { BuiltInProviderType } from 'next-auth/providers'
import { ClientSafeProvider, getProviders, LiteralUnion, signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

interface SignInPageProps {
  providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const providers = await getProviders()
  return {
    props: { providers }
  }
}

const SignIn = ({ providers }: SignInPageProps) => {
  const { status } = useSession()
  const router = useRouter()

  if (status === 'authenticated') {
    return router.push('/')
  }

  return (
    <div className='flex flex-col justify-center items-center min-h-screen bg-gray-50'>
      <div className='flex flex-col items-center'>
        <div className='text-2xl font-medium'>Mahasiswa curhat</div>
        <div className='text-3xl font-extrabold'>Sign in to your account</div>
        <div className='text-sm font-light'>
          and <span className='font-medium text-indigo-600'>create your profile</span>
        </div>
      </div>

      <div className='py-16 px-16 mt-12 w-full max-w-prose bg-white rounded-xl shadow'>
        <div className='font-medium text-gray-700'>Sign in with</div>
        <div className='flex gap-4 mt-8 w-full'>
          <button
            className='inline-flex justify-center py-2 px-4 w-full text-sm font-medium text-gray-500 bg-white rounded-md border border-gray-300 shadow-sm hover:bg-gray-50'
            onClick={() => signIn('google')}
          >
            <Google />
          </button>
          <button
            className='inline-flex justify-center py-2 px-4 w-full text-sm font-medium text-gray-500 bg-white rounded-md border border-gray-300 shadow-sm hover:bg-gray-50'
            onClick={() => signIn('twitter')}
          >
            <Twitter />
          </button>
          <button
            className='inline-flex justify-center py-2 px-4 w-full text-sm font-medium text-gray-500 bg-white rounded-md border border-gray-300 shadow-sm hover:bg-gray-50'
            onClick={() => signIn('facebook')}
          >
            <Facebook />
          </button>
        </div>
      </div>
    </div>
  )
}

SignIn.disableLayout = true

export default SignIn
