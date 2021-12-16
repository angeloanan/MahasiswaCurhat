import * as React from 'react'
import Convo from '../public/convo.png'
import NextImage from 'next/image'

import type { NextPage } from 'next'

const HomePage: NextPage = () => {
  return (
    <div className='flex flex-col-reverse min-h-screen lg:flex-row'>
      <div className='relative flex-auto flex-shrink brightness-75'>
        <NextImage src={Convo} layout='fill' placeholder='blur' objectFit='cover' />
      </div>
      <div className='flex-grow w-full h-full lg:max-w-2xl'>
        <div className='flex flex-col gap-2 items-center px-4 mt-24 lg:mt-48'>
          <div className='flex flex-col gap-1 items-center text-center'>
            <div className='text-5xl font-extrabold text-sky-600'>Mahasiswa Curhat</div>
            <div className='text-2xl italic font-medium text-gray-900 text-md'>
              Because sometimes existing is{' '}
              <span className='inline-block relative before:block before:absolute before:-inset-1 before:-skew-x-6 before:bg-pink-500'>
                <span className='relative text-white'>simply exhausting</span>
              </span>
            </div>
          </div>
          <div className='mt-8 max-w-lg text-justify text-gray-700'>
            <div className='font-medium text-gray-900'>
              Let&apos;s face it:{' '}
              <span className='underline decoration-wavy decoration-pink-500'>
                College can be overwhelming
              </span>
            </div>
            <div className='mt-2'>
              When this happens, students tend to feel lonely and feel like they have nobody to talk
              to. We&apos;ve built this website aimed at college students to let them tell their
              stories, frustration and anger.
            </div>
            <div className='mt-2'>
              When the pressure is released, their productivity will increase and will improve
              overall moods. Also getting the responses from sharing stories can improve your
              critical thinking since you will know how others view the problems.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
