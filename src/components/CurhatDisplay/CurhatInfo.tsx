import { FlagIcon, ThumbDownIcon, ThumbUpIcon } from '@heroicons/react/solid'
import * as React from 'react'

interface CurhatInfoProps {
  totalKarma: number
}

function CurhatInfo(props: CurhatInfoProps) {
  return (
    <div className='flex flex-col content-end gap-4'>
      <div className='text-right'>
        <div className='text-xl font-bold text-gray-900'>{props.totalKarma}</div>
        <div className='text-xl font-normal text-gray-500'>karma</div>
      </div>
      <hr className='border-t border-black' />
      <div className='flex flex-col items-end gap-2'>
        <ThumbUpIcon className='w-8 h-8 text-green-300' role='button' />
        <ThumbDownIcon className='w-8 h-8 text-red-300' role='button' />
        <FlagIcon className='w-8 h-8 text-yellow-300' role='button' />
      </div>
    </div>
  )
}

export default CurhatInfo
