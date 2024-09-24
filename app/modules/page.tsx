'use client';
import React, { useEffect, useState } from 'react'
import { decryptMessage } from '../utils/criypto';
import { useCheckRestaurantQuery } from '../api/restaurant';
import { useRouter } from 'next/navigation';
import { ShopOutlined } from '@ant-design/icons';

const page = () => {
    const router = useRouter()
    const user = JSON.parse(localStorage.getItem('user')!)
    const data_decrypto = decryptMessage(user)
    const dec = JSON.parse(data_decrypto)
    const { data } = useCheckRestaurantQuery(dec?.id)
    console.log(data);

    const [checkRestaurant, setCheckRestaurant] = useState(false)
    useEffect(() => {
        if (data?.status == true) {
            router.push("/modules/serler")
        } else {
            setCheckRestaurant(true)
        }
    }, [])
    
    const HandleClick =()=>{
        router.push("/modules/registerrestaurant")
    }


    return (
        <div>
            {checkRestaurant ?
                <>
                    <div className="flex flex-col items-end justify-center ">
                        <button className='border border-red-400 p-2 mt-2 mr-2 text-red-500 rounded' onClick={()=>HandleClick()}>+ Tạo quán mới</button>
                    </div>
                    <div className="flex flex-col items-center justify-center h-screen">
                        <ShopOutlined className='text-8xl text-red-500' />
                        <p className="mt-2">Không có quán nào</p>
                    </div>
                </>
                : ""}
        </div>
    )
}

export default page