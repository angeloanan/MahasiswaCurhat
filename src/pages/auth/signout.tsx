import * as React from 'react'

import { useRouter } from 'next/router'
import { signOut } from 'next-auth/react'

function SignOut() {
  const router = useRouter()

  React.useEffect(() => {
    const logout = async () => {
      await signOut({
        redirect: true
      })
      router.push('/')
    }

    logout()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <div className='p-4'>Signing you out. Please wait a moment!</div>
}

export default SignOut
