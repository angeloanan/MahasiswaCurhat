import * as React from 'react'

import NextImage from 'next/image'
import { UserIcon } from '@heroicons/react/solid'

function Avatar({ src }: React.ComponentProps<'span'> & { src?: string }) {
  return (
    <span className='inline-block w-6 h-6 overflow-hidden bg-gray-100 rounded-full'>
      {src != null ? (
        <NextImage src={src} layout='fill' />
      ) : (
        <UserIcon className='w-full h-full text-gray-300' />
      )}
    </span>
  )
}

export default Avatar
