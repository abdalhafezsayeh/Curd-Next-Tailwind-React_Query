import React from 'react';
import { useSelector } from 'react-redux';
import AddUser from './AddUser';
import UpUser from './UpUser';


function Form() {

    const flag = useSelector((state) => state.app.client.toggleWithId)

  return (
        <>
            { flag ? <UpUser /> : <AddUser />  }
        </>

  )
}

export default Form