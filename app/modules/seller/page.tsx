'use client';

import { useGetAllProductQuery } from '@/app/api/product'
import { BankOutlined, FileTextOutlined, FormOutlined, LoadingOutlined, QuestionCircleOutlined, StarOutlined, TeamOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import LoadingOverlay from '@/app/components/loading/Loading';
type Props = {}

const page = (props: Props) => {
    const router:any = useRouter()
    const [isLoading, setIsLoading] = useState<any>();
    const onChangProduct = () => {
        setIsLoading(true)
        router.push('/modules/seller/product');
    }
    const onChangMenu = () => {
        setIsLoading(true)
        router.push('/modules/seller/category');
    }
    return (
        <>
            {isLoading ? (
                <LoadingOverlay/>
            ) : ""}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <div>
                    <button onClick={() => onChangProduct()}>
                        <div className='flex items-center justify-center'>
                            <div className='inline-flex items-center justify-center'>
                                <FileTextOutlined style={{ fontSize: '60px', padding: '5px', background: 'red', borderRadius: '5px', color: 'white' }} />
                            </div>

                        </div>
                        <div className='ml-2'>
                            <span className='text-xl'>Đơn hàng</span>
                        </div>
                    </button>
                </div>

                <div className='pl-5' style={{ marginLeft: "15px" }}>
                    <Link href="/modules/seller/product" >
                        <div className='flex items-center justify-center'>
                            <div className='inline-flex items-center justify-center' style={{ flexShrink: 0 }}>
                                <StarOutlined style={{ fontSize: '60px', padding: '5px', background: 'red', borderRadius: '5px', color: 'white' }} />
                            </div>

                        </div>
                        <div className='ml-2'>
                            <span className='text-xl'>Đánh giá</span>
                        </div>
                    </Link>

                </div>
                <div className='pl-5' style={{ marginLeft: "15px" }}>
                    <button onClick={() => onChangMenu()}>
                        <div className='flex items-center justify-center'>
                            <div className='inline-flex items-center justify-center border rounded-lg border-gray-300 bg-red-500' style={{ flexShrink: 0 }}>
                                <FormOutlined style={{ fontSize: '60px', padding: '5px', background: 'red', borderRadius: '5px', color: 'white' }} />
                            </div>

                        </div>
                        <div className='ml-2'>
                            <span className='text-xl'>Thực đơn</span>
                        </div>
                    </button>
                </div>
                <div className='pl-5' style={{ marginLeft: "15px" }}>
                    <Link href="/modules/seller/product" >
                        <div className='flex items-center justify-center'>
                            <div className='inline-flex items-center justify-center border rounded-lg border-gray-300 bg-red-500' style={{ flexShrink: 0 , borderRadius:'5px'}}>
                                <QuestionCircleOutlined style={{ fontSize: '60px', padding: '5px', background: 'red', borderRadius: '5px', color: 'white' }} />
                            </div>

                        </div>
                        <div className='ml-2'>
                            <span className='text-xl'>Trung tâm trợ giúp</span>
                        </div>
                    </Link>
                </div>
                <div className='pl-15' style={{ marginLeft: "15px" }}>
                    <Link href="/modules/seller/product" >
                        <div className='flex items-center justify-center'>
                            <div className='inline-flex items-center justify-center border rounded-lg border-gray-300 bg-red-500' style={{ flexShrink: 0 }}>
                                <BankOutlined style={{ fontSize: '60px', padding: '5px', background: 'red', borderRadius: '5px', color: 'white' }} />
                            </div>

                        </div>
                        <div className='ml-2'>
                            <span className='text-xl'>Học viện</span>
                        </div>
                    </Link>
                </div>
                <div className='pl-5' style={{ marginLeft: "15px" }}>
                    <button >
                        <div className='flex items-center justify-center'>
                            <div className='inline-flex items-center justify-center border rounded-lg border-gray-300 bg-red-500' style={{ flexShrink: 0 }}>
                                <TeamOutlined style={{ fontSize: '60px', padding: '5px', background: 'red', borderRadius: '5px', color: 'white' }} />
                            </div>

                        </div>
                        <div className='ml-2'>
                            <span className='text-xl'>Quản lý nhân viên</span>
                        </div>
                    </button>
                </div>
            </div>
        </>
    )
}

export default page