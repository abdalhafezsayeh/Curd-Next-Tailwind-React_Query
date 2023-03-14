import React, { useState } from "react";
import {GrLinkNext, GrLinkPrevious, GrUpdate } from 'react-icons/gr'
import {AiOutlineDelete} from 'react-icons/ai'
import { useQueryClient, useQuery } from 'react-query';
import { deleteUser, getAllUsers } from "@/lib/helper";
import { useDispatch } from "react-redux";
import { toggleAction, toggleActionWhenwithId } from "@/redux/reducer";


function Table() {
  const [showConfirm, setShowConFirm] = useState(false)
  const [yesOrNo, setYesOrNo] = useState(undefined)
  const [pageNumberPagination, setPageNumberPagination] = useState(1) 

  const dispatch = useDispatch()
  const queryClient = useQueryClient()


  // Gett All Users 
  const {isLoading, isFetching, isError, data, error} = useQuery(['get-users', pageNumberPagination ], () => getAllUsers(pageNumberPagination),{
    keepPreviousData:true
  });

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
      {showConfirm ? <ConfirmDelet con={handleConfirm} /> : <></>}

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
              <td
                className={`p-2  border ${
                  user?.status == "InActive" ? "bg-red-300" : "bg-green-300"
                }`}
              >
                {user?.status}
              </td>
              <td className="p-2  border flex justify-around items-center">
                <span
                  onClick={() => handleToggleFlag(user.id)}
                  className="text-blue-500 cursor-pointer hover:rotate-180 duration-500"
                >
                  <GrUpdate size={25} />
                </span>
                <span
                  onClick={() => handleDeleteUser(user.id)}
                  className="text-red-400 cursor-pointer hover:scale-125 duration-200"
                >
                  <AiOutlineDelete size={25} />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Start Pagination  */}
      <div className="">
        <ul className={`flex justify-around items-center m-auto bg-slate-100 mt-5 w-1/2 h-10 rounded-full ${isFetching && "border-black"} border relative duration-500`}>
          <li>
            <button onClick={() => setPageNumberPagination((prev) => prev - 1)} disabled={pageNumberPagination <= 1} className={`flex items-center top-0  py-2 px-4 rounded-full ${pageNumberPagination <= 1 ? "scale-100 bg-slate-400 absolute left-0 " : "scale-110 bg-slate-200 left-20"}  text-gray-900 hover:scale-100 duration-500 `}>
              <span className="mr-1">
                <GrLinkPrevious />
              </span>
              <span>
                Prev
              </span>
            </button>
          </li>
          <li>
            <button onClick={() => setPageNumberPagination((prev) => prev + 1)} disabled={data.data.length < 5}  className={`flex items-center top-0 ${data.data.length < 5 ? "scale-100 bg-slate-400 absolute right-0 " : "scale-110 bg-slate-200 right-20"} py-2 px-4 rounded-full scale-110 text-gray-900 hover:scale-100 duration-500`}>
              <span className="mr-1">
                Next
              </span>
              <span>
                <GrLinkNext />
              </span>
            </button>
          </li>
        </ul>
      </div>
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
