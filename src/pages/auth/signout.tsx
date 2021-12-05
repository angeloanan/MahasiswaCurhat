import * as React from 'react'

import { useRouter } from 'next/router'
import { getSession, signOut } from 'next-auth/react'

function SignOut() {
  const router = useRouter()

  React.useEffect(() => {
    const logout = async () => {
      try {
        const session = await getSession()
        if (session != null) {
          await signOut({
            redirect: true
          })
        }

        router.push('/')
      } catch (e) {
        console.error(e)
        router.push('/')
      }
    }

    logout()
  }, [router])

  return <div>Signing you out. Please wait a moment!</div>
}

export default SignOut
