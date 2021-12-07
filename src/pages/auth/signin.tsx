import type { GetServerSideProps } from 'next'
import { BuiltInProviderType } from 'next-auth/providers'
import { ClientSafeProvider, getProviders, LiteralUnion, signIn } from 'next-auth/react'

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
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-50'>
      <div className='flex flex-col items-center'>
        <div className='text-2xl font-medium'>Mahasiswa curhat</div>
        <div className='text-3xl font-extrabold'>Sign in to your account</div>
        <div className='text-sm font-light'>
          and <span className='font-medium text-indigo-600'>create your profile</span>
        </div>
      </div>

      <div className='w-full px-16 py-16 mt-12 bg-white shadow max-w-prose rounded-xl'>
        <div className='font-medium text-gray-700'>Sign in with</div>
        <div className='mt-8'>
          {Object.values(providers).map((provider) => (
            <button
              key={provider.name}
              className='w-full py-4 pt-2 text-gray-500 bg-white border border-gray-300 rounded-md'
              onClick={() => signIn(provider.id, { redirect: true })}
            >
              {provider.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

SignIn.disableLayout = true

export default SignIn
