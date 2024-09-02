"use client"
import { useGetAllToppingQuery } from '@/app/api/topping'
import { RightOutlined } from '@ant-design/icons'
import { Card, Space } from 'antd'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import LoadingOverlay from '../../loading/Loading'

type Props = {}

const ListTopping = (props: Props) => {
    const router: any = useRouter()
    const [isLoading, setIsLoading] = useState<any>();
    const { data } = useGetAllToppingQuery(0)
    const handleRowClick = (record: any) => {
        setIsLoading(true)
        router.push(`/modules/seller/topping/${record?.id}`);
    };
    return (
        <>
            {
                isLoading ? (
                    <LoadingOverlay />
                ) : ""
            }
            <Space direction="vertical" size={16} className='w-full'>
                {data?.map((data1: any) => {
                    const names = data1?.sub_toppings
                        ?.filter((data3: any) => data3?.view === true)
                        ?.map((data4: any) => data4?.name)
                        .join(', ');
                    return (
                        <Card
                            key={data1?.id}
                            title={data1?.name}
                            extra={
                                <button onClick={() => handleRowClick(data1)}>
                                    <p>
                                        {data1?.countview}/{data1?.sub_toppings?.length}
                                        <RightOutlined className="ml-2" />
                                    </p>
                                </button>
                            }
                            className="w-full"
                        >
                            <span>{names}</span>
                        </Card>
                    )
                })}

            </Space>
        </>
    )
}

export default ListTopping