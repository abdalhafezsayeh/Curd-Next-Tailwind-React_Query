import React, { useState } from "react";
import {GrUpdate } from 'react-icons/gr'
import {AiOutlineDelete} from 'react-icons/ai'
import { useQueryClient, useQuery } from 'react-query';
import { deleteUser, getAllUsers } from "@/lib/helper";
import { useDispatch } from "react-redux";
import { toggleAction, toggleActionWhenwithId } from "@/redux/reducer";


function Table() {
  const [showConfirm, setShowConFirm] = useState(false)
  const [yesOrNo, setYesOrNo] = useState(undefined)

  const dispatch = useDispatch()
  const queryClient = useQueryClient()

  // Gett All Users 
  const {isLoading, isError, data, error} = useQuery('get-users', () => getAllUsers());

  if(isLoading) return <div>Loading...</div>
  if(isError) return <div>Error {error.message}</div>

  const handleToggleFlag = (id) => {
    dispatch(toggleAction())
    dispatch(toggleActionWhenwithId(id))
  }

  const handleDeleteUser = async (id) => {
    setShowConFirm(!showConfirm)
    setYesOrNo(id)
  }

  const handleConfirm = async (what) => {
    if(what == 'yes') {
      await deleteUser(yesOrNo)
      await queryClient.invalidateQueries('get-users')
      setShowConFirm(!showConfirm)
    } else {
      setShowConFirm(!showConfirm)
    }
  }

  return (
    <div>
      {showConfirm ? ( <ConfirmDelet con={handleConfirm} /> ) : <></>}
        
      <table className="w-full p-2 ">
        <tbody>
        <tr className="text-left bg-black text-white">
          <th className="p-2">Name</th>
          <th className="p-2">Email</th>
          <th className="p-2">Salary</th>
          <th className="p-2">Birthdate</th>
          <th className="p-2">Status</th>
          <th className="p-2">Actions</th>
        </tr>
            {data?.data?.map((user, i) => (

            <tr className="h-10" key={i}>
              <td className="p-2  border">{user?.name}</td>
              <td className="p-2  border">{user?.email}</td>
              <td className="p-2  border">{user?.salary}</td>
              <td className="p-2  border">{user?.date}</td>
              <td className={`p-2  border ${user?.status == "InActive" ? "bg-red-300": "bg-green-300"}`}>{user?.status}</td>
              <td className="p-2  border flex justify-around items-center">
                <span onClick={() => handleToggleFlag(user.id)} className="text-blue-500 cursor-pointer hover:rotate-180 duration-500">
                  <GrUpdate size={25} />
                </span>
                <span onClick={() => handleDeleteUser(user.id)} className="text-red-400 cursor-pointer hover:scale-125 duration-200">
                  <AiOutlineDelete size={25} />
                </span>
              </td>
            </tr>

            ))}

        
        </tbody>
      </table>
 
    </div>
  );
}

const ConfirmDelet = ({con}) => {
  return (
    <div className="border py-3">
      <div className="text-center">
        <h1>Are You Soure ?</h1>
        <button onClick={() => con('yes')} className="border mx-2 px-3 border-green-300 text-green-500">yes</button>
        <button onClick={() => con('no')} className="border mx-2 px-3 border-red-300 text-red-400">No</button>
      </div>
    </div>
  )
}

export default Table;
