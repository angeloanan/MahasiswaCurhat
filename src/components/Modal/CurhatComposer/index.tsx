import * as React from 'react'

import type { FallbackProps } from 'react-error-boundary'

import MoodSelector from './MoodSelector'
import LoadingIndicator from '../../Icon/LoadingIndicator'

import { atom, useAtom } from 'jotai'
import { Dialog, Transition } from '@headlessui/react'
import { useForm } from 'react-hook-form'
import { PaperClipIcon } from '@heroicons/react/solid'
import { ErrorBoundary } from 'react-error-boundary'
import { useRouter } from 'next/router'
import { CurhatCreateResponse } from '../../../pages/api/curhat/create'

export const CurhatModalOpenAtom = atom(false)

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div role='alert'>
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

function CurhatComposer() {
  const [isOpen, setIsOpen] = useAtom(CurhatModalOpenAtom)
  const [isSending, setIsSending] = React.useState(false)

  const router = useRouter()
  const { register, handleSubmit, reset } = useForm()

  const onCurhatSubmit = handleSubmit(async (data) => {
    setIsSending(true)

    // TODO: Error handling

    const request = await fetch('/api/curhat/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    const response = (await request.json()) as CurhatCreateResponse

    if (response.status === 200) {
      router.push(`/curhat/${response.postId}`)

      setIsOpen(false)
      reset()
    } else {
      alert(response.error)
    }

    setIsSending(false)
  })

  // Handle CTRL + Enter
  const onKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'Enter') {
        e.preventDefault()
        onCurhatSubmit()
      }
    },
    [onCurhatSubmit]
  )

  // TODO: Split to smaller component
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <div className='fixed inset-0 w-full h-full'>
          <Dialog.Overlay className='fixed inset-0 z-10 bg-black opacity-60' />

          {/* Trick here is to have z-index 0 on element */}
          <div className='absolute inset-0 flex items-center justify-center'>
            <div className='z-10 w-full max-w-xl p-3 bg-white border border-gray-300 rounded-lg focus-within:border-indigo-500'>
              <form onSubmit={onCurhatSubmit} className='flex flex-col gap-2'>
                <label htmlFor='content' className='sr-only'>
                  Write your heartfelt confession...
                </label>
                <textarea
                  id='content'
                  placeholder='Write your heartfelt confession...'
                  defaultValue={''}
                  className='block w-full h-32 p-0 placeholder-gray-500 border-0 resize-none focus:ring-0 sm:text-sm'
                  onKeyDown={onKeyDown}
                  {...register('content')}
                />
                <div className='relative flex justify-end'>
                  <MoodSelector />
                </div>

                <hr />
                {/* Bottom bar */}
                <div className='flex justify-between'>
                  <div className='flex items-center gap-2 italic text-gray-500 cursor-not-allowed hover:text-gray-600'>
                    <PaperClipIcon className='w-5 h-5' /> Attach files
                  </div>
                  <button
                    type='submit'
                    className={`flex items-center gap-2 px-4 py-2 text-indigo-100 bg-indigo-800 rounded-md hover:bg-indigo-900 hover:text-white ${
                      isSending && 'disabled'
                    }`}
                  >
                    {isSending ? (
                      <>
                        <LoadingIndicator /> Submitting
                      </>
                    ) : (
                      'Submit'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Dialog>
    </ErrorBoundary>
  )
}

export default CurhatComposer
