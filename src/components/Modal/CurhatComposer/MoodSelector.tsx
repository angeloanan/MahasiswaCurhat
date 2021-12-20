import * as React from 'react'

import { Listbox } from '@headlessui/react'
import { EmojiHappyIcon, EmojiSadIcon } from '@heroicons/react/solid'

interface Mood {
  name: string
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element
}

const moods: Mood[] = [
  { name: 'Happy', icon: EmojiHappyIcon },
  { name: 'Sad', icon: EmojiSadIcon }
]

function MoodSelector() {
  const [selectedMood, setSelectedMood] = React.useState<Mood | null>(null)

  return (
    <Listbox value={selectedMood} onChange={setSelectedMood}>
      <Listbox.Button className='inline-flex relative gap-1 items-center py-2 px-2 text-sm font-medium text-gray-500 whitespace-nowrap bg-gray-100 rounded-full hover:bg-gray-100 sm:px-3'>
        {selectedMood != null ? (
          <>
            {React.createElement(selectedMood.icon, { className: 'h-5 w-5 text-gray-400' })}
            {selectedMood.name}
          </>
        ) : (
          <>
            <EmojiHappyIcon className='w-5 h-5 text-gray-300' /> Current mood
          </>
        )}
      </Listbox.Button>

      <Listbox.Options className='overflow-auto absolute bottom-0 py-2 mb-12 text-gray-800 bg-gray-100 rounded'>
        {moods.map((mood) => (
          <Listbox.Option key={mood.name} value={mood}>
            {({ active, selected }) => (
              <li
                className={`
                  relative select-none px-4 py-1 ${
                    active ? 'text-blue-700 bg-blue-200' : 'text-gray-800'
                  } ${selected ? 'font-bold' : ''}}`}
                role='button'
              >
                {mood.name}
              </li>
            )}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  )
}

export default MoodSelector
