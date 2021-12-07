import * as React from 'react'

import type { SexualityPronouns } from '.prisma/client'
import CurhatCard from './CurhatCard'
import CurhatInfo from './CurhatInfo'

type CurhatDisplayProps =
  | {
      withInfo?: false

      content: string
      gender: SexualityPronouns
      age: number
      uni: string
    }
  | {
      withInfo: true

      content: string
      gender: SexualityPronouns
      age: number
      uni: string

      totalKarma: number
    }

function CurhatDisplay({ className, ...props }: React.ComponentProps<'div'> & CurhatDisplayProps) {
  if (props.withInfo) {
    return (
      <div className={'flex max-w-3xl gap-4 ' + className}>
        <CurhatInfo {...props} />
        <CurhatCard {...props} className='flex-1' />
      </div>
    )
  } else {
    return <CurhatCard {...props} className={'max-w-prose ' + className} />
  }
}

export default CurhatDisplay
