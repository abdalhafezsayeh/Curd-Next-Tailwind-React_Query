import React from 'react';
import { useRouter } from 'next/router';
import { useQuery, useQueryClient } from 'react-query';
import { getUser } from '@/lib/helper';
import { useSelector } from 'react-redux';

function DetailsUser() {

    const router = useRouter();

    let idUser = router.query.id

    const queryClient = useQueryClient() 

    const numberPagination = useSelector((state) => state.app.client.numberPagination);

    console.log(numberPagination)

    const {isLoading, isError, error , data} = useQuery(['details-user', parseInt(idUser) ],() => getUser(idUser),{
        initialData: () => {
            const hero = queryClient.getQueryData(["get-users",numberPagination])
            ?.data?.find((user) => user.id === parseInt(idUser) )

            if(hero) {
                return {
                    data:hero
                }
            } else {
                return undefined
            }
        }


    })


    if(isLoading) return <div>Loading...</div>
    if(isError) return <div>{error.message}</div>

  return (
    <div>
        <button onClick={() => router.push('/')} className='bg-slate-400 px-8' >Go Home</button>
        {/* Start DetailsUser */}
        <div>
            {/* {JSON.stringify(data.data)} */}
            <h1>{data?.data?.name}</h1>
            <p>{data?.data?.email}</p>
            <p>{data?.data?.date}</p>
        </div>
    </div>
  )
}

export default DetailsUser