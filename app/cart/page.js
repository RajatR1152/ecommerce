'use client'
import Card from '@/components/Card';
import { UserContext } from '@/context/UserContext'
import axios from 'axios';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react'

export default function page() {

  const { userData } = useContext(UserContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.post('https://ecommerce-ffvg.vercel.app//cartData', { user: userData.username }).then((res) => {
      setData(res.data.cart);
    })
  }, []);

  console.log("data:", data);

  return (

    <div className='container w-full md:h-screen'>
      {data?.length > 0 ?
        (
          <>
            <h1 className="md:text-6xl text-3xl text-center font-extrabold my-5">Your Orders</h1>

            <div className="container w-full md:h-[700px] md:columns-4 overflow-y-auto h-screen px-5 py-2">

              {
                data?.map((d, i) => {
                  return <Card key={i} data={d} />

                })
              }
            </div>
          </>
        )

        : <div className="contianer flex flex-col h-[700px] items-center justify-center w-full p-5 text-center">
          <h1 className="md:text-6xl font-extrabold text-3xl">Your Cart is empty</h1> <Link className='text-red-500 md:mt-16 px-8 py-5 md:text-6xl font-extrabold text-3xl' href={'/store'}>add now</Link>
        </div>}
    </div>

  )
}
