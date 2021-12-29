import * as React from 'react'

import QuoteIcon from '@components/Icon/QuoteIcon'

interface CurhatCardProps {
  content: string
  gender: 'MALE' | 'FEMALE'
  age: number
  uni: string
}

function CurhatCard({
  content,
  gender,
  age,
  uni,
  ...props
}: React.ComponentProps<'div'> & CurhatCardProps) {
  const isMale = gender === 'MALE'
  const pronoun = isMale ? 'Male' : 'Female'

  return (
    <article
      {...props}
      className={
        'flex flex-col gap-6 pt-6 w-full text-lg sm:text-xl font-semibold leading-6 bg-white rounded-lg shadow ' +
        props.className
      }
    >
      {/* Top section */}
      <div className='flex flex-col gap-5 px-6 sm:px-12'>
        <QuoteIcon className={isMale ? 'text-blue-200' : 'text-red-200'} />
        <p className='text-gray-900 line-clamp-4'>{content}</p>
      </div>

      {/* Bottom section */}
      <aside
        className={`py-6 px-6 sm:px-12 rounded-b-lg ${isMale ? 'bg-blue-600' : 'bg-red-600'}`}
        role='contentinfo'
      >
        <div className='text-white'>
          {pronoun}, {age}
        </div>
        <div className={isMale ? 'text-blue-100' : 'text-red-100'}>Student @ {uni}</div>
      </aside>
    </article>
  )
}

export default CurhatCard
