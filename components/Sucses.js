import React from 'react'

function Sucses({message}) {
  return (
    <div className='container mx-auto flex justify-center'>
        <div className=' border-2 border-yellow-200 inline-block py-1 px-10 text-yellow-500'>
            <h1 className=''>{message}</h1>
        </div>
    </div>
  )
}

export default Sucses