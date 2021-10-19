import { BuiltInProviderType } from 'next-auth/providers'
import { ClientSafeProvider, getProviders, LiteralUnion, signIn } from 'next-auth/react'

interface SignInPageProps {
  providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider>
}

export async function getServerSideProps(context) {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}

const SignIn = ({ providers }: SignInPageProps) => {
  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-400'>
      <div className='w-full px-8 py-16 bg-white shadow-xl max-w-prose rounded-xl'>
        <div className='text-4xl font-extrabold'>Login to Mahasiswa Curhat</div>

        <div className='mt-8'>
          {Object.values(providers).map((provider) => (
            <button
              key={provider.name}
              className='w-full p-4 bg-gray-100 rounded-md shadow-md'
              onClick={() => signIn(provider.id, { callbackUrl: 'localhost' })}
            >
              Sign in with {provider.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

SignIn.disableLayout = true

export default SignIn
