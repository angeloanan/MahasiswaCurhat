import * as React from 'react'

import NextImage from 'next/image'
import { useRouter } from 'next/router'
import { NextPageWithDisableLayout } from './_app'

const NotFound: NextPageWithDisableLayout = () => {
  const router = useRouter()

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <div className='relative w-32 h-32'>
        <NextImage src='https://c.tenor.com/alQAlfx97SAAAAAi/awkward-emoji.gif' layout='fill' />
      </div>
      <div className='flex flex-col items-center pt-4'>
        <div className='text-3xl font-bold text-indigo-600'>404 - Not found</div>
        <div className='mt-2 text-gray-600'>Whatever you&apos;ve searched has turned up empty</div>
        <button
          className='mt-16 text-blue-600'
          onClick={() => {
            router.back()
          }}
        >
          Go back to previous page?
        </button>
      </div>
    </div>
  )
}

NotFound.disableLayout = true

export default NotFound
