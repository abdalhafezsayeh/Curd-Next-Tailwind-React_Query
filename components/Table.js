import React from "react";
import {GrUpdate } from 'react-icons/gr'
import {AiOutlineDelete} from 'react-icons/ai'

function Table() {
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
        <tr className="h-10">
          <td className="p-2  border">Ahmed</td>
          <td className="p-2  border">Ahmed@gmail.com</td>
          <td className="p-2  border">2500</td>
          <td className="p-2  border">20-10-1997</td>
          <td className="p-2  border">Active</td>
          <td className="p-2  border flex justify-around items-center">
            <span className="text-blue-500 cursor-pointer hover:rotate-180 duration-500">
              <GrUpdate size={25} />
            </span>
            <span className="text-red-400 cursor-pointer hover:scale-125 duration-200">
              <AiOutlineDelete size={25} />
            </span>
          </td>
        </tr>
        
        </tbody>
      </table>
    </div>
  );
}

export default Table;
