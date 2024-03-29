import Form from '@/components/Form'
import Table from '@/components/Table'
import { toggleAction, toggleActionWhenwithId } from '@/redux/reducer'
import Head from 'next/head'
import { useDispatch, useSelector } from 'react-redux'


export default function Home() {

  const dispatch = useDispatch()

  const toggleFlag = useSelector((state) => state.app.client.visibleToggle)



  const handleShowForm = () => {
    dispatch(toggleAction())
    dispatch(toggleActionWhenwithId(undefined))
  }


  return (
    <>
      <Head>
        <title>Crud App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>
            {/* Title */}
            <div>

              <h1 className='text-center capitalize font-medium text-xl lg:text-4xl mt-5'>employee management</h1>
               
                {/* Button Add Employee Management */}
              <div className='container mx-auto py-5 border-b'> 
                <div>
                  <button onClick={handleShowForm} className='bg-slate-800 text-white rounded py-2 px-5'>Add Employee</button>
                </div>
              </div>

              {/* Form  */}
              <div className='container mx-auto py-5'>
                {toggleFlag ? <Form /> : <></>}
              </div>

              {/* Table  */}
              <div className='container mx-auto'>
                <Table />
              </div>

            </div>
        </div>
      </main>
    </>
  )
}
