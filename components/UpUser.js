import { getAllUsers, getUser, updateUser } from '@/lib/helper'
import React, {useReducer} from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useSelector } from 'react-redux'
import Sucses from './Sucses'


const handleGetDataFromInput = (state, employee) => {
    return {
        ...state,
        [employee.target.name]: employee.target.value
    }
}

function UpUser() {

    const idUser =  useSelector((state) => state.app.client.toggleWithId)

    const {data, isError, isLoading, error} = useQuery(['user', idUser], () => getUser(idUser));
    const user = data?.data;

    const [formData, getFormData] = useReducer(handleGetDataFromInput, {})


   const queryClient = useQueryClient() 
    const {mutate:sendNewDataUser, isSuccess:doneUbdate} = useMutation((newData) => updateUser(idUser, newData), {
        onSuccess: () => {
            queryClient.invalidateQueries('get-users')
            // queryClient.prefetchQuery('get-users', getAllUsers)
        }
    })


    const handleAddEmployee =  (e) => {
        e.preventDefault();
        let useName = `${formData.firstName??user?.name?.split(' ')[0]} ${formData.lastName??user?.name?.split(' ')[1]}`
        let updateData = Object.assign({}, user,formData, {name:useName})

        const {name, salary, status, email, date, id} = updateData

        const model = { name,salary,status,email,date,id }

        sendNewDataUser(model)
    }


    if(isLoading) return <div>Loading...</div>
    if(isError) return <div>{error}</div>

    if(doneUbdate) return <Sucses message={'Done Update Employee'} />

  return (
    <form className='grid lg:grid-cols-2 w-4/6 gap-3' onSubmit={handleAddEmployee}>
        {/* input first name  */}
        <div>
            <input onChange={getFormData} defaultValue={user?.name?.split(' ')[0]} type='text' name='firstName' placeholder='First Name' className='border py-1 px-3 rounded-md w-full focus:outline-none' />
        </div>
        {/* input last name  */}
        <div>
            <input onChange={getFormData} defaultValue={user?.name?.split(' ')[1]} type='text' name='lastName' placeholder='Last Name' className='border py-1 px-3 rounded-md w-full focus:outline-none' />
        </div>
        {/* input email */}
        <div>
            <input onChange={getFormData} defaultValue={user?.email} type='text' name='email' placeholder='Email' className='border py-1 px-3 rounded-md w-full focus:outline-none' />
        </div>
        {/* input salary */}
        <div>
            <input onChange={getFormData} defaultValue={user?.salary} type='text' name='salary' placeholder='Salary' className='border py-1 px-3 rounded-md w-full focus:outline-none' />
        </div>
        {/* input date */}
        <div>
            <input onChange={getFormData} defaultValue={user?.date} type='date' name='date' className='border py-1 px-4 rounded-md focus:outline-none cursor-pointer' />
        </div>

        {/* input active or non  */}
        <div className='flex gap-2 items-center'>
            <div className='flex items-center'>
                <input onChange={getFormData} defaultChecked={user.status == 'Active'} type='radio' value='Active' id='defaultActive' name='status' className='form-check-input appearance-none w-4 h-4 border border-gray-400 rounded-full bg-white checked:bg-green-500 cursor-pointer focus:outline-none bg-no-repeat bg-center bg-contain float-left mr-2 ' />
                <label htmlFor='defaultActive' className='text-gray-600'>Active</label>
            </div>
            <div className='flex items-center'>
                <input onChange={getFormData} defaultChecked={user.status !== 'Active'} type='radio' value='InActive' id='defaultInActive' name='status' className='form-check-input appearance-none w-4 h-4 border border-gray-400 rounded-full bg-white checked:bg-red-500 cursor-pointer focus:outline-none bg-no-repeat bg-center bg-contain float-left mr-2 ' />
                <label htmlFor='defaultInActive' className='text-gray-600'>InActive</label>
            </div>
        </div>

        <input type='submit' value='Update' className='bg-yellow-500 text-white w-2/6 capitalize cursor-pointer border-2 border-yellow-500 rounded-md hover:bg-white hover:border-yellow-500 hover:text-yellow-500 duration-300' />
    </form>
  )
}

export default UpUser