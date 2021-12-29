import * as React from 'react'
import NextImage from 'next/image'
import { useRouter } from 'next/router'
import Button from '@components/UI/Button'

import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { CreateCurhatCommentSchema } from '@schema/CurhatComment'
import { useState } from 'react'
import LoadingIndicator from '@components/Icon/LoadingIndicator'

interface CommentFormProps {
  replyTo: string
}

export const CurhatCommentForm = ({ replyTo }: CommentFormProps) => {
  const router = useRouter()
  const { status, data } = useSession()

  const [isSubmit, setIsSubmit] = useState<boolean>(false)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(CreateCurhatCommentSchema)
  })

  const onCurhatCommentSubmit = handleSubmit(async (formData) => {
    setIsSubmit(true)
    try {
      fetch('/api/comment/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      router.reload()
    } catch (e) {
      alert(e)
    } finally {
      setIsSubmit(false)
    }
    console.log(formData)
  })

  // Handle CTRL + Enter
  const onKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'Enter') {
        e.preventDefault()
        onCurhatCommentSubmit()
      }
    },
    [onCurhatCommentSubmit]
  )

  const profilePictureURL =
    data?.user.image ??
    `https://source.boringavatars.com/beam/256/${encodeURIComponent(data?.user.id as string)}}`

  return (
    <div className='flex gap-6 mt-4 max-w-3xl'>
      <div className='relative w-12 h-12'>
        <NextImage src={profilePictureURL} layout='fill' />
      </div>
      <form
        className={`flex flex-col gap-2 p-3 w-full h-48 sm:h-36 placeholder-gray-300 text-gray-900 bg-white rounded-lg border-blue-500 ${
          errors.content ? 'border-2 border-red-500 text-red-600' : 'border-none'
        }`}
        onKeyDown={onKeyDown}
        onSubmit={onCurhatCommentSubmit}
      >
        <input type='hidden' value={replyTo} {...register('curhatId')} />
        <textarea
          className={`overflow-scroll w-full h-full rounded-lg border-none outline-none resize-none focus:ring-0`}
          placeholder='Add your comment...'
          {...register('content')}
        />
        {errors.content && <div className='text-red-600'>* {errors.content.message}</div>}

        <div className='relative'>
          {status != 'authenticated' || data?.user.username == null ? (
            <Button
              className='flex relative right-0 bottom-0 gap-2 bg-gray-700 cursor-not-allowed hover:bg-gray-700 sm:absolute'
              type='reset'
            >
              You must login first!
            </Button>
          ) : (
            <Button
              className={`relative sm:absolute flex gap-2 right-0 bottom-0 ${
                isSubmit ? 'cursor-wait' : null
              }`}
              type='submit'
            >
              {isSubmit ? (
                <>
                  <LoadingIndicator />
                  <span>Submitting...</span>
                </>
              ) : (
                'Comment'
              )}
            </Button>
          )}
        </div>
      </form>
    </div>
  )
}
