import React from "react";
import {GrUpdate } from 'react-icons/gr'
import {AiOutlineDelete} from 'react-icons/ai'
import { useQuery } from 'react-query';
import { getAllUsers } from "@/lib/helper";
import { useSelector } from "react-redux";


function Table() {

  const state = useSelector((state) => state.app)
  // console.log(state.visibleToggle)

  // Gett All Users 
  const {isLoading, isError, data, error} = useQuery('get-users', () => getAllUsers());

  if(isLoading) return <div>Loading...</div>
  if(isError) return <div>Error {error.message}</div>


  return (
    <div>
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
            {data?.data.map((user, i) => (

            <tr className="h-10" key={i}>
              <td className="p-2  border">{user?.name}</td>
              <td className="p-2  border">{user?.email}</td>
              <td className="p-2  border">{user?.salary}</td>
              <td className="p-2  border">{user?.birth}</td>
              <td className={`p-2  border ${user?.status == "InActive" ? "bg-red-300": "bg-green-300"}`}>{user?.status}</td>
              <td className="p-2  border flex justify-around items-center">
                <span className="text-blue-500 cursor-pointer hover:rotate-180 duration-500">
                  <GrUpdate size={25} />
                </span>
                <span className="text-red-400 cursor-pointer hover:scale-125 duration-200">
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




export default Table;
