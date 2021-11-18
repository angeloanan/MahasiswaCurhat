function NewUserPage() {
  return (
    <div className='flex flex-col max-w-screen-lg min-h-screen p-8 mx-auto mt-16'>
      {/* Title thing */}
      <div className=''>
        <h1 className='text-lg font-medium leading-6 text-gray-900'>Welcome to Mahasiswa Curhat</h1>
        <div className='mt-1 text-sm text-gray-500'>
          Please fill these details to create your account
        </div>
      </div>

      {/* Start form */}
      <div className='grid grid-cols-1 mt-6 gap-y-6 gap-x-4 sm:grid-cols-6'>
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
            />
          </div>
        </div>

        <div className='sm:col-span-4'>
          <label htmlFor='photo' className='grid grid-cols-1 mt-6 gap-y-6 gap-x-4 sm:grid-cols-6'>
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
      </div>
    </div>
  )
}

NewUserPage.disableLayout = true

export default NewUserPage
