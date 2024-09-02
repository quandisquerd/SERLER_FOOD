import { Switch, message } from 'antd'
import React from 'react'
import './style.css';
import { PlusOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { useParams } from 'next/navigation';
import { useGetOneToppingQuery, useUpdateViewSubtoppingInToppingMutation } from '@/app/api/topping';
import LoadingOverlay from '../../loading/Loading';
import FormatTotal from '@/app/utils/FormatTotal';
import AddSuptoppingInTopping from './AddSuptoppingInTopping';

const ListSubTopping = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const { id } = useParams();
  const { data, isLoading } = useGetOneToppingQuery(id)
  const [updateView, { isLoading: loadding }] = useUpdateViewSubtoppingInToppingMutation()

  if (isLoading ) { return <LoadingOverlay /> }
  const HandleView = (e: any, idsub: any) => {
    const data = {
      view: e
    }
    updateView({ id: idsub, data })
      .unwrap()
      .then(() => {
        messageApi.success('update topping successfully!');
      })
      .catch((data: any) => {
        messageApi.open({
          type: "error",
          content: 'update failure',
        });
      });
  }
  return (
    <>
      {contextHolder}
      <div className='pl-10 pr-10 pt-5 pb-5 bg-gray-100'>
        <div className='p-2 flex'>
          <span>Mã</span>
          <span className='ml-auto'>{data?.data?.id}</span>
        </div>
        <div className='h-px bg-gray-300 mb-1'></div>
        <div className='p-2 flex'>
          <span>Tên<span className='text-red-500'>*</span></span>
          <span className='ml-auto'><input className='w-full border-0 outline-none p-1 bg-gray-100 text-right' defaultValue={data?.data?.name} placeholder='Nhập tên món ăn' /></span>
        </div>
      </div>
      <div className=' pl-10 pr-10 mt-5 mb-5 pt-5 pb-5 bg-gray-100'>
        <div className='p-2 flex'>
          <span>Món thêm</span>
        </div>
        <div className='h-px bg-gray-300 mb-1'></div>
        {data?.data?.sub_toppings?.map((data1: any) => {
          return (
            <div className='p-2 flex' key={data1?.id}>
              <div className=''>
                <p>{data1?.name}</p>
                <p className='text-gray-400'><FormatTotal amount={data1?.price} /></p>
              </div>
              <span className='ml-auto'><Switch defaultChecked={data1?.view} onChange={(e: any) => HandleView(e, data1?.id)} className='text-green-500 bg-green-500' /></span>

            </div>
          )
        })}
        <div className='h-px bg-gray-300 mb-1'></div>
        <AddSuptoppingInTopping />

      </div>
      <button className=' w-full flex items-center justify-center p-2 border border-gray-600 text-gray-800 rounded'>
        Xóa nhóm Topping
      </button>
      <button
        className={classNames(
          ' w-full sticky bottom-0 shadow-xl z-50 p-2 bg-red-500 rounded mt-5 text-white',
          // {
          //     'bg-white': !isLoading,
          //     'bg-transparent': isLoading,
          //     'text-black': !isLoading,
          //     'text-gray-500': isLoading
          // }
        )}
      >
        Lưu
      </button>
    </>
  )
}

export default ListSubTopping