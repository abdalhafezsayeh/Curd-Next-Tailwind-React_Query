import { addUser } from '@/lib/helper'
import React,{ useReducer } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import Error from './Error'
import Sucses from './Sucses'


const handleGetDataFromInput = (state, employee) => {
    return {
        ...state,
        [employee.target.name]: employee.target.value
    }
}

function AddUser() {

    const [formData, getFormData] = useReducer(handleGetDataFromInput, {});

    const queryClient = useQueryClient()
    const {mutate, isLoading, isError, error, isSuccess} =  useMutation(addUser, {
        onSuccess: (data) => {

            // queryClient.invalidateQueries('get-users')
            queryClient.setQueryData('get-users', (oldeData) => {
                return {
                    ...oldeData,
                    data: [...oldeData.data, data.data ]
                }
            })

        }
    })

    const handleAddEmployee = (e) => {
        e.preventDefault();
        if(Object.keys(formData).length == 0 ) return console.log('from not found')

        let {firstName, lastName, email, salary, date, status} = formData;

        const model = {
            name: `${firstName} ${lastName}`,
            email, salary, date, status
        }
        
        mutate(model)
         
    }


    if(isLoading) return <div>Loading...</div>
    if(isError) return <Error message={error.message} />
    if(isSuccess) return <Sucses />


  return (
    <form className='grid lg:grid-cols-2 w-4/6 gap-3' onSubmit={handleAddEmployee}>
    {/* input first name  */}
    <div>
        <input onChange={getFormData} type='text' name='firstName' placeholder='First Name' className='border py-1 px-3 rounded-md w-full focus:outline-none' />
    </div>
    {/* input last name  */}
    <div>
        <input onChange={getFormData} type='text' name='lastName' placeholder='Last Name' className='border py-1 px-3 rounded-md w-full focus:outline-none' />
    </div>
    {/* input email */}
    <div>
        <input onChange={getFormData} type='text' name='email' placeholder='Email' className='border py-1 px-3 rounded-md w-full focus:outline-none' />
    </div>
    {/* input salary */}
    <div>
        <input onChange={getFormData} type='text' name='salary' placeholder='Salary' className='border py-1 px-3 rounded-md w-full focus:outline-none' />
    </div>
    {/* input date */}
    <div>
        <input onChange={getFormData} type='date' name='birth' className='border py-1 px-4 rounded-md focus:outline-none cursor-pointer' />
    </div>




    {/* input active or non  */}
    <div className='flex gap-2 items-center'>
        <div className='flex items-center'>
            <input onChange={getFormData} type='radio' value='Active' id='defaultActive' name='status' className='form-check-input appearance-none w-4 h-4 border border-gray-400 rounded-full bg-white checked:bg-green-500 cursor-pointer focus:outline-none bg-no-repeat bg-center bg-contain float-left mr-2 ' />
            <label htmlFor='defaultActive' className='text-gray-600'>Active</label>
        </div>
        <div className='flex items-center'>
            <input onChange={getFormData} type='radio' value='InActive' id='defaultInActive' name='status' className='form-check-input appearance-none w-4 h-4 border border-gray-400 rounded-full bg-white checked:bg-red-500 cursor-pointer focus:outline-none bg-no-repeat bg-center bg-contain float-left mr-2 ' />
            <label htmlFor='defaultInActive' className='text-gray-600'>InActive</label>
        </div>
    </div>

    <input type='submit' value='add' className='bg-green-500 text-white w-2/6 capitalize cursor-pointer border-2 border-green-500 rounded-md hover:bg-white hover:border-green-500 hover:text-green-500 duration-300' />
</form>
  )
}

export default AddUser