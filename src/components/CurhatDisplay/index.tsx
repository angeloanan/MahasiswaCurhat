import * as React from 'react'

import type { SexualityPronouns } from '.prisma/client'
import QuoteIcon from '../Icon/QuoteIcon'

interface CurhatDisplayProps {
  content: string
  gender: SexualityPronouns
  age: number
  uni: string
}

function CurhatDisplay({
  content,
  gender,
  age,
  uni,
  ...props
}: React.ComponentProps<'div'> & CurhatDisplayProps) {
  const isMale = gender === 'MALE'
  const pronoun = isMale ? 'Male' : 'Female'

  return (
    <div
      className='flex flex-col max-w-4xl gap-6 pt-6 my-8 text-xl font-semibold leading-6 bg-white rounded-lg shadow'
      {...props}
    >
      {/* Top section */}
      <div className='flex flex-col gap-5 px-12'>
        <QuoteIcon className={isMale ? 'text-blue-200' : 'text-red-200'} />
        <div className='h-24 text-gray-900'>{content}</div>
      </div>

      {/* Bottom section */}
      <div className={`py-6 px-12 rounded-b-lg ${isMale ? 'bg-blue-600' : 'bg-red-600'}`}>
        <div className='text-white'>
          {pronoun}, {age}
        </div>
        <div className={isMale ? 'text-blue-100' : 'text-red-100'}>Student @ {uni}</div>
      </div>
    </div>
  )
}

export default CurhatDisplay
