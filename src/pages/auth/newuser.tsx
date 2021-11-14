function NewUserPage() {
  return (
    <div className='flex flex-row items-center min-h-screen p-8 bg-blue-600'>
      <div className='max-w-screen-lg w-full p-4 mx-auto bg-gray-100 min-h-[70vh] rounded-lg'>
        Hello from NewUserPage
      </div>
    </div>
  )
}

NewUserPage.disableLayout = true

export default NewUserPage
