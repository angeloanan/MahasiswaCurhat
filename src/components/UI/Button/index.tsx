import * as React from 'react'

const Button = ({ ...rest }: React.ComponentPropsWithRef<'button'>) => {
  return (
    <button
      className='flex items-center gap-2 px-4 py-2 text-indigo-100 bg-indigo-800 rounded-md hover:bg-indigo-900 hover:text-white'
      {...rest}
    />
  )
}

export default Button
