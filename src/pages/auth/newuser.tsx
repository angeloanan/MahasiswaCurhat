import * as React from 'react'
import * as z from 'zod'
import useSWR from 'swr'
import CreatableSelect from 'react-select/creatable'

import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { NewUserFormSchema, SexualityPronouns } from '@schema/NewUserForm'
import { RadioGroup } from '@headlessui/react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { isUsernameAvailableResponse } from '@api/user/[username]/available'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

function NewUserPage() {
  const router = useRouter()
  const { status, data } = useSession({
    required: true,
    onUnauthenticated: () => router.replace('/')
  })
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const { data: universitiesList, error: universityError } = useSWR<string[]>(
    '/api/universities',
    fetcher
  )
  const UniversitiesOptions = React.useMemo(() => {
    return universitiesList?.map((u) => ({ label: u, value: u }))
  }, [universitiesList])

  // Handle already registered user
  React.useEffect(() => {
    if (status === 'authenticated' && data?.user.username != null) {
      router.replace('/')
    }
  }, [status, data, router])

  const {
    register,
    control,
    handleSubmit,
    setValue,
    getValues,
    watch,
    setError,
    clearErrors,
    formState: { errors }
  } = useForm<z.infer<typeof NewUserFormSchema>>({
    resolver: zodResolver(NewUserFormSchema)
  })

  // Handle duped username
  const watchUsername = watch('username', '')
  React.useEffect(() => {
    const validateUsername = async () => {
      if (watchUsername == '') return
      clearErrors('username')
      const fetchRequest = await fetch(`/api/user/${watchUsername}/available`)
      const fetchResponse = (await fetchRequest.json()) as isUsernameAvailableResponse

      if (typeof fetchResponse.status === 'number') {
        setError('username', { type: 'pattern', message: 'Backend error' })
      } else if (fetchResponse.status !== 'AVAILABLE')
        setError('username', { type: 'value', message: 'Username is already taken' })
    }

    validateUsername()
  }, [clearErrors, setError, watchUsername])

  // Console logs
  // console.group('Page re-render')
  // console.log('Universities:', universitiesList)
  // console.log('Form inputs:', getValues())
  // universityError && console.error('Universities error:', universityError)
  // Object.keys(errors).length >= 1 && console.warn('Form errors:', errors)
  // console.groupEnd()

  const onFormSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true)

      console.log('Form data', JSON.stringify(data, null, 2))
      const fetchRequest = await fetch('/api/newuser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (fetchRequest.status === 200) {
        window.location.assign('/')
      } else {
        throw await fetchRequest.json()
      }
    } catch (e) {
      console.error(e)
      alert(JSON.stringify(e, null, 2))
    } finally {
      setIsSubmitting(false)
    }
  })

  return (
    <div className='flex flex-col p-8 mx-auto max-w-screen-lg min-h-screen'>
      {/* Title thing */}
      <div className=''>
        <h1 className='text-lg font-medium leading-6 text-gray-900'>Welcome to Mahasiswa Curhat</h1>
        <div className='mt-1 text-sm text-gray-500'>
          Please fill these details complete your account details!
        </div>
      </div>

      {/* Start form */}
      <form
        className='grid grid-cols-1 gap-x-4 gap-y-6 mt-6 sm:grid-cols-6 focus:ring-indigo-500 focus:border-indigo-500'
        onSubmit={onFormSubmit}
      >
        <div className='sm:col-span-4'>
          <label htmlFor='username' className='block text-sm font-medium text-gray-700'>
            Username <span className='text-red-500'>*</span>
          </label>
          <div className='flex mt-1 rounded-md shadow-sm'>
            <span className='inline-flex items-center px-3 text-gray-500 bg-gray-50 rounded-l-md border border-r-0 border-gray-300 sm:text-sm'>
              mahasiswacurhat.com/user/
            </span>
            <input
              type='text'
              className='block flex-1 w-full min-w-0 rounded-none rounded-r-md border-gray-300 sm:text-sm'
              {...register('username', {
                required: { value: true, message: 'You must select your username' }
              })}
            />
          </div>
          {errors.username && (
            <p className='mt-1 text-sm italic text-red-500'>* {errors.username.message}</p>
          )}
        </div>

        {/* Birthdate */}
        <div className='sm:col-span-4'>
          <label htmlFor='birthdate' className='block text-sm font-medium text-gray-700'>
            Date of birth
          </label>
          <input
            type='date'
            className='text-gray-500 rounded border-gray-300'
            {...register('birthdate')}
          />
        </div>

        {/* Gender */}
        <div className='sm:col-span-4'>
          {/* https://github.com/react-hook-form/react-hook-form/discussions/3504#discussioncomment-1205439 */}
          <Controller
            name='gender'
            control={control}
            rules={{ required: { value: true, message: 'You must fill your gender' } }}
            render={({ field: { onChange } }) => (
              <RadioGroup<'div', SexualityPronouns>
                value={getValues('gender')}
                onChange={(value: SexualityPronouns) => {
                  onChange(value)
                  setValue('gender', value)
                }}
              >
                <RadioGroup.Label className='block text-sm font-medium text-gray-700'>
                  Gender <span className='text-red-500'>*</span>
                </RadioGroup.Label>
                <div className='flex gap-4 mt-1 text-base'>
                  <RadioGroup.Option<'div', SexualityPronouns>
                    value='MALE'
                    className={({ checked, active }) =>
                      `p-1 px-2 rounded cursor-pointer select-none border border-gray-300 ${
                        checked ? `bg-blue-500 text-blue-50` : `bg-gray-50 text-gray-600`
                      }`
                    }
                  >
                    Male
                  </RadioGroup.Option>
                  <RadioGroup.Option<'div', SexualityPronouns>
                    value='FEMALE'
                    className={({ checked, active }) =>
                      `p-1 px-2 rounded cursor-pointer select-none border border-gray-300 ${
                        checked ? `bg-red-500 text-red-50` : `bg-gray-50 text-gray-600`
                      }`
                    }
                  >
                    Female
                  </RadioGroup.Option>
                </div>
              </RadioGroup>
            )}
          />
          {errors.gender && (
            <div className='mt-1 text-sm italic text-red-500'>* {errors.gender.message}</div>
          )}
        </div>

        {/* University */}
        <div className='sm:col-span-4'>
          <label htmlFor='university' className='block text-sm font-medium text-gray-700'>
            Current University / College <span className='text-red-500'>*</span>
          </label>
          <Controller
            name='university'
            control={control}
            rules={{ required: { value: true, message: 'You must fill in your university' } }}
            render={({ field: { onChange } }) => (
              <CreatableSelect
                options={UniversitiesOptions}
                isLoading={!universitiesList}
                placeholder='Universitas bawah pohon bambu...'
                className='mt-1'
                formatCreateLabel={(v) => `Register new university: ${v}`}
                onChange={(v) => {
                  console.log('React select change', v)
                  if (v != null) {
                    onChange(v.value)
                    setValue('university', v.value)
                  }
                }}
              />
            )}
          />
          {errors.university && (
            <div className='mt-1 text-sm italic text-red-500'>* {errors.university.message}</div>
          )}
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

export default NewUserPage
