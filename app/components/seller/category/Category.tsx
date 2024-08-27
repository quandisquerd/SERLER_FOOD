'use client';
import { useGetProductInCategoryQuery } from '@/app/api/category'
import { Collapse } from 'antd'
import React from 'react'
import ProductInCategory from './ProductInCategory';
import LoadingOverlay from '../../loading/Loading';
const Category = () => {
    const { data, isLoading ,refetch} = useGetProductInCategoryQuery(0)
    const HandleRefetch=(e:any)=>{
        refetch()
    }
    if (isLoading) {
        return <LoadingOverlay />;
    }
    const allKeys = data?.map((item: any) => `${item?.id}`);
    const items: any = data?.map((data1: any, index: any) => {
        return {
            key: data1?.id,
            label: (
                <div className="flex items-center justify-between" key={index}>
                    <span className="font-bold">{data1?.category?.toUpperCase()}</span>
                    <span>{data1?.countview}/{data1?.products?.length}</span>
                </div>
            ),
            children: (<ProductInCategory data={data1?.products} onRefetch ={HandleRefetch}/>)
        }

    })
    return (
        <div className='pl-40 pr-40'>
            <Collapse items={items} defaultActiveKey={allKeys} />
        </div>
    )
}

export default Category