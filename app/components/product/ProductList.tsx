'use client';
import { useGetAllProductQuery } from '@/app/api/product'
import React from 'react'
import ToppingInProduct from './ToppingInProduct';

type Props = {}

const ProductList = (props: Props) => {
  const { data} = useGetAllProductQuery(0)
  return (
    <div>{data?.results?.data.map((data:any)=>{
      return (
        <div className="border border-gray-500 p-10">
          <h1>name: {data?.name}</h1>
          <h5>price: {data?.price}</h5>
          <p>description: {data?.description}</p>
          <span><ToppingInProduct data={data?.toppings}/></span>
        </div>
      )
    })}</div>
  )
}

export default ProductList