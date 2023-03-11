import React from 'react'

function Error({message}) {
  return (
    <div className='container mx-auto flex justify-center'>
        <div className=' border-2 border-red-200 inline-block py-1 px-10 text-red-500'>
            <h1 className=''>Error {message}</h1>
        </div>
    </div>
  )
}

export default Error