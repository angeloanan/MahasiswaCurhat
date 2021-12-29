import * as React from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'

const nextAuthErrors = {
  Signin: 'Try signing with a different account.',
  OAuthSignin: 'Try signing with a different account.',
  OAuthCallback: 'Try signing with a different account.',
  OAuthCreateAccount: 'Try signing with a different account.',
  EmailCreateAccount: 'Try signing with a different account.',
  Callback: 'Try signing with a different account.',
  OAuthAccountNotLinked:
    'To confirm your identity, sign in with the same account you used originally.',
  EmailSignin: 'Check your email address.',
  CredentialsSignin: 'Sign in failed. Check the details you provided are correct.',
  default: 'Unable to sign in.'
}

const AuthErrorPage: NextPage = () => {
  const error = useRouter().query['error'] as keyof typeof nextAuthErrors
  const errorMessage = error && (nextAuthErrors[error] ?? nextAuthErrors.default)

  return (
    <div className='mx-auto mt-8 w-full max-w-prose'>
      <h1 className='text-4xl font-bold text-gray-800'>Authentication error</h1>
      <p className='text-lg text-gray-600'>Something went wrong while signing you in:</p>
      <pre className='mt-4'>
        {error}: {JSON.stringify(errorMessage, null, 2)}
      </pre>
    </div>
  )
}

export default AuthErrorPage
