import * as React from 'react'

import { Dialog } from '@headlessui/react'
import { useForm } from 'react-hook-form'
import { PaperClipIcon } from '@heroicons/react/solid'
import MoodSelector from './MoodSelector'
import { atom, useAtom } from 'jotai'
import { ErrorBoundary } from 'react-error-boundary'
import type { FallbackProps } from 'react-error-boundary'

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

  const { register, handleSubmit } = useForm()

  const onCurhatSubmit = handleSubmit((data) => {
    setIsSending(true)
    alert(JSON.stringify(data, null, 2))

    setIsSending(false)
    setIsOpen(false)
  })

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <Dialog.Overlay className='fixed inset-0 bg-black opacity-60' />

        <div className='relative max-w-xl p-3 mx-auto bg-white border border-gray-300 rounded-lg focus-within:border-indigo-500'>
          <form onSubmit={onCurhatSubmit} className='flex flex-col gap-2'>
            <label htmlFor='content' className='sr-only'>
              Write your heartfelt confession...
            </label>
            <textarea
              id='content'
              placeholder='Write your heartfelt confession...'
              defaultValue={''}
              className='block w-full h-32 p-0 placeholder-gray-500 border-0 resize-none focus:ring-0 sm:text-sm'
              {...register('content')}
            />
            <div className='flex justify-end'>
              <MoodSelector />
            </div>

            <hr />

            <div className='flex justify-between'>
              <div className='flex items-center gap-2 italic text-gray-500 hover:text-gray-600'>
                <PaperClipIcon className='w-5 h-5' /> Attach files
              </div>
              <input
                type='submit'
                className={`flex items-center gap-2 px-4 py-2 text-indigo-100 bg-indigo-800 rounded-md hover:bg-indigo-900 hover:text-white ${
                  isSending && ''
                }`}
              />
            </div>
          </form>
        </div>
      </Dialog>
    </ErrorBoundary>
  )
}

export default CurhatComposer
