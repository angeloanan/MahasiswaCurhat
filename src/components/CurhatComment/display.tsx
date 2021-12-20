import * as React from 'react'
import NextLink from 'next/link'
import NextImage from 'next/image'

import { formatDistance } from 'date-fns'

import { HeartIcon as HeartIconOutline } from '@heroicons/react/outline'
import { HeartIcon as HeartIconSolid, TrashIcon } from '@heroicons/react/solid'
import { useSession } from 'next-auth/react'
import LoadingIndicator from '../Icon/LoadingIndicator'
import useSWR, { useSWRConfig } from 'swr'

interface CurhatCommentDisplayProps {
  // Curhat ID for heart
  curhatId: string
  commentId: string
  content: string
  timestamp: string

  authorPfp?: string
  authorUsername: string
  authorUserid: string
}

export const CurhatCommentDisplay = ({
  content,
  timestamp,
  curhatId,
  commentId,
  authorUsername,
  authorUserid,
  authorPfp
}: CurhatCommentDisplayProps) => {
  const { mutate } = useSWRConfig()
  const { status: sessionStatus, data: sessionData } = useSession()

  const { data: isLovedData } = useSWR<{ loved: boolean }>(
    `/api/comment/${commentId}/isCommentLoved`,
    (k) => fetch(k).then((r) => r.json())
  )

  const profilePictureURL =
    authorPfp ??
    `https://source.boringavatars.com/beam/256/${encodeURIComponent(authorUserid as string)}}`

  const handleDeleteComment: React.MouseEventHandler<HTMLButtonElement> = React.useCallback(
    async (e) => {
      try {
        e.preventDefault()
        await fetch(`/api/comment/${commentId}`, {
          method: 'DELETE'
        })
        mutate(`/api/comments/${curhatId}`)
      } catch (e) {
        alert(e)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )
  const handleLoveComment: React.MouseEventHandler<HTMLButtonElement> = React.useCallback(
    async (e) => {
      try {
        e.preventDefault()
        if (sessionStatus != 'authenticated') return
        await fetch(`/api/comment/${commentId}`, {
          method: 'PATCH'
        })
        mutate(`/api/comment/${isLovedData}/isCommentLoved`)
      } catch (e) {
        alert(e)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

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
        {sessionStatus === 'loading' || !isLovedData ? (
          <div>
            <LoadingIndicator />
          </div>
        ) : sessionData?.user.id === authorUserid ? (
          <button
            className='w-6 h-6 text-gray-500 cursor-pointer focus:text-gray-700 focus:ring-0 hover:text-gray-700'
            onClick={handleDeleteComment}
          >
            <TrashIcon />
          </button>
        ) : (
          <button
            className='w-8 h-8 text-red-200 cursor-pointer focus:text-red-600 focus:ring-0 hover:text-red-600'
            onClick={handleLoveComment}
          >
            {isLovedData.loved ? <HeartIconSolid /> : <HeartIconOutline />}
          </button>
        )}
      </div>
    </div>
  )
}
