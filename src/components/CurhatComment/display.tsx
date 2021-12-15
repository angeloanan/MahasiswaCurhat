import * as React from 'react'
import NextLink from 'next/link'
import NextImage from 'next/image'

import { formatDistance } from 'date-fns'

import { HeartIcon as HeartIconOutline } from '@heroicons/react/outline'
import { HeartIcon as HeartIconSolid, TrashIcon } from '@heroicons/react/solid'
import { useSession } from 'next-auth/react'
import LoadingIndicator from '../Icon/LoadingIndicator'

interface CurhatCommentDisplayProps {
  // Curhat ID for heart
  curhatId: string
  content: string
  timestamp: string

  authorPfp?: string
  authorUsername: string
  authorUserid: string
}

export const CurhatCommentDisplay = ({
  content,
  timestamp,
  authorUsername,
  authorUserid,
  authorPfp
}: CurhatCommentDisplayProps) => {
  const { status, data } = useSession()
  const profilePictureURL =
    authorPfp ??
    `https://source.boringavatars.com/beam/256/${encodeURIComponent(authorUserid as string)}}`

  return (
    <div className='flex max-w-3xl min-h-[12]'>
      <div className='flex gap-6 w-full'>
        <div className='relative w-12 h-full'>
          <NextLink href={`/user/${authorUsername}`}>
            <a>
              <NextImage src={profilePictureURL} layout='fill' />
            </a>
          </NextLink>
        </div>
        <div className='flex-1 gap-2 p-3 text-sm bg-white rounded-lg border border-gray-300'>
          <div>{content} </div>
          <div className='text-gray-500'>
            &bull; posted {formatDistance(new Date(timestamp), new Date())} ago
          </div>
        </div>
      </div>
      <div className='flex flex-initial justify-center items-center pl-3'>
        {status === 'loading' ? (
          <div>
            <LoadingIndicator />
          </div>
        ) : data?.user.id === authorUserid ? (
          <button className='w-6 h-6 text-gray-500 cursor-pointer focus:text-gray-700 focus:ring-0 hover:text-gray-700'>
            <TrashIcon />
          </button>
        ) : (
          <button className='w-8 h-8 text-red-200 cursor-pointer focus:text-red-600 focus:ring-0 hover:text-red-600'>
            <HeartIconOutline className='' />
          </button>
        )}
      </div>
    </div>
  )
}
