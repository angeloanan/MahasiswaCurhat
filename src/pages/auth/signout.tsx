import * as React from 'react'

import NextRouter from 'next/router'
import { getSession, signOut } from 'next-auth/react'

function SignOut() {
  React.useEffect(() => {
    const logout = async () => {
      try {
        const session = await getSession()
        if (session != null) {
          await signOut({
            redirect: true,
          })
        }

        NextRouter.push('/')
      } catch (e) {
        console.error(e)
        NextRouter.push('/')
      }
    }

    logout()
  }, [])

  return <div>Signing you out. Please wait a moment!</div>
}

export default SignOut
