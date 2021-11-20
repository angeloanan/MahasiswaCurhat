import * as React from 'react'

import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import * as z from 'zod'
import { NewUserFormSchema } from '../../schemas/NewUserForm'
import { RadioGroup } from '@headlessui/react'
import { SexualityPronouns } from '.prisma/client'
import { useRouter } from 'next/router'

function NewUserPage() {
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const router = useRouter()
  const { register, control, handleSubmit, setValue, getValues } = useForm<
    z.infer<typeof NewUserFormSchema>
  >({
    // resolver: zodResolver(NewUserFormSchema) // https://github.com/react-hook-form/resolvers/issues/271
  })

  const onFormSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true)

      alert(JSON.stringify(data, null, 2))
      const fetchRequest = await fetch('/api/newuser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (fetchRequest.status === 200) {
        router.replace('/')
      } else {
        throw await fetchRequest.json()
      }
    } catch (e) {
      console.error(e)
    } finally {
      setIsSubmitting(false)
    }
  })

  return (
    <div className='flex flex-col max-w-screen-lg min-h-screen p-8 mx-auto mt-16'>
      {/* Title thing */}
      <div className=''>
        <h1 className='text-lg font-medium leading-6 text-gray-900'>Welcome to Mahasiswa Curhat</h1>
        <div className='mt-1 text-sm text-gray-500'>
          Please fill these details complete your account details!
        </div>
      </div>

      {/* Start form */}
      <form
        className='grid grid-cols-1 mt-6 gap-y-6 gap-x-4 sm:grid-cols-6'
        onSubmit={onFormSubmit}
      >
        <div className='sm:col-span-4'>
          <label htmlFor='username' className='block text-sm font-medium text-gray-700'>
            Username
          </label>
          <div className='flex mt-1 rounded-md shadow-sm'>
            <span className='inline-flex items-center px-3 text-gray-500 border border-r-0 border-gray-300 rounded-l-md bg-gray-50 sm:text-sm'>
              mahasiswacurhat.com/user/
            </span>
            <input
              type='text'
              className='flex-1 block w-full min-w-0 border-gray-300 rounded-none focus:ring-indigo-500 focus:border-indigo-500 rounded-r-md sm:text-sm'
              {...register('username')}
            />
          </div>
        </div>

        <div className='sm:col-span-4'>
          <label
            htmlFor='photo'
            className='grid grid-cols-1 mt-6 text-sm font-medium text-gray-700 gap-y-6 gap-x-4 sm:grid-cols-6'
          >
            Photo
          </label>
          <div>
            <span>Image</span>
            <button
              type='button'
              className='px-3 py-2 ml-5 text-sm font-medium leading-4 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            >
              Change
              <input type='file' className='sr-only' name='photo' />
            </button>
          </div>
        </div>

        {/* Gender */}
        <div className='sm:col-span-4'>
          {/* https://github.com/react-hook-form/react-hook-form/discussions/3504#discussioncomment-1205439 */}
          <Controller
            name='gender'
            control={control}
            render={({ field: { onChange } }) => (
              <RadioGroup<'div', SexualityPronouns>
                value={getValues('gender')}
                onChange={(value: SexualityPronouns) => {
                  onChange(value)
                  setValue('gender', value)
                }}
              >
                <RadioGroup.Label className='block text-sm font-medium text-gray-700'>
                  Gender
                </RadioGroup.Label>
                <div className='flex gap-4 text-base'>
                  <RadioGroup.Option<'div', SexualityPronouns>
                    value='MALE'
                    className={({ checked, active }) =>
                      `p-1 rounded cursor-pointer ${
                        checked ? `bg-blue-500 text-blue-100` : `bg-gray-200 text-gray-600`
                      }`
                    }
                  >
                    Male
                  </RadioGroup.Option>
                  <RadioGroup.Option<'div', SexualityPronouns>
                    value='FEMALE'
                    className={({ checked, active }) =>
                      `p-1 rounded cursor-pointer ${
                        checked ? `bg-red-500 text-red-100` : `bg-gray-200 text-gray-600`
                      }`
                    }
                  >
                    Female
                  </RadioGroup.Option>
                </div>
              </RadioGroup>
            )}
          />
        </div>

        {/* Submit button */}
        <div className='sm:col-span-4'>
          <input
            type='submit'
            className={`flex items-center gap-2 px-4 py-2 text-indigo-100 bg-indigo-800 rounded-md cursor-pointer hover:bg-indigo-900 hover:text-white ${
              isSubmitting && 'cursor-wait'
            }`}
          />
        </div>
      </form>
    </div>
  )
}

NewUserPage.disableLayout = true

export default NewUserPage
