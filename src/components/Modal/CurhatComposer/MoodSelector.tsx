import { useState } from 'react'
import { Listbox } from '@headlessui/react'
import { EmojiHappyIcon } from '@heroicons/react/solid'

interface Mood {
  name: string
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element
}

const moods: Mood[] = [{ name: 'Happy', icon: EmojiHappyIcon }]

function MoodSelector() {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null)

  return (
    <Listbox value={selectedMood} onChange={setSelectedMood}>
      <Listbox.Button className='relative inline-flex items-center gap-1 px-2 py-2 text-sm font-medium text-gray-500 bg-gray-100 rounded-full whitespace-nowrap hover:bg-gray-100 sm:px-3'>
        {selectedMood ? (
          selectedMood.name
        ) : (
          <>
            <EmojiHappyIcon className='w-5 h-5 text-gray-300' /> Current mood
          </>
        )}
      </Listbox.Button>

      <Listbox.Options>
        {moods.map((mood) => (
          <Listbox.Option key={mood.name} value={mood.name}>
            {mood.name}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  )
}

export default MoodSelector
