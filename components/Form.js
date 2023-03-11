import React from 'react';
import AddUser from './AddUser';
import UpUser from './UpUser';




function Form() {

    const flage = true

  return (
        <>
            { flage ? <AddUser />  : <UpUser />  }
        </>

  )
}

export default Form