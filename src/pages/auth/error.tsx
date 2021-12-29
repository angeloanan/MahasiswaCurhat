import * as React from 'react'
import type { NextPage } from 'next'

const AuthErrorPage: NextPage = (props) => {
  return (
    <div className='mx-auto mt-8 w-full max-w-prose'>
      <h1>Auth Error</h1>
      <p>Something went wrong!</p>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </div>
  )
}

export default AuthErrorPage
