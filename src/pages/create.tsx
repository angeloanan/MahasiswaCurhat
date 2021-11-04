import * as React from 'react'

import NextRouter from 'next/router'
import { useSession } from 'next-auth/react'

function CreatePage() {
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      NextRouter.push('/login')
    },
  })

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  return <div>Form</div>
}

export default CreatePage
