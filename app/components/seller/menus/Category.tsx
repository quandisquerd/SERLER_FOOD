'use client';
import { useCreateProductMutation, useGetProductInCategoryQuery } from '@/app/api/category'
import { Button, Col, Collapse, DatePicker, Drawer, Form, Image, Input, Modal, Row, Select, Space, Upload, message } from 'antd'
import React, { useState } from 'react'
import ProductInCategory from './ProductInCategory';
import LoadingOverlay from '../../loading/Loading';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
const { Option } = Select;
import { useGetAllToppingQuery } from '@/app/api/topping';
import { useForm } from 'antd/es/form/Form';
const Category = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = useForm();
    const [open, setOpen] = useState(false);
    const [uploadedImages, setUploadedImages] = useState<any>();
    const [fileList, setFileList] = useState<any[]>([]);
    const [toppingid, setTopping] = useState<any[]>([])
    const [name, setName] = useState<any>()
    const [price, setprice] = useState<any>()
    const [category, setCategory] = useState<any>()
    const [description, setDescription] = useState<any>()
    const { data, isLoading, refetch } = useGetProductInCategoryQuery(0)
    const { data: topping } = useGetAllToppingQuery(0)
    const [create, { isLoading: loading }] = useCreateProductMutation()

    const HandleRefetch = (e: any) => {
        refetch()
    }
    if (isLoading || loading) {
        return <LoadingOverlay />;
    }
    const allKeys = data?.map((item: any) => `${item?.id}`);
    const items: any = data?.map((data1: any, index: any) => {
        return {
            key: data1?.id,
            label: (
                <div className="flex items-center justify-between " key={index}>
                    <span className="font-bold">{data1?.category?.toUpperCase()}</span>
                    <span>{data1?.countview}/{data1?.products?.length}</span>
                </div>
            ),
            children: (<ProductInCategory data={data1?.products} onRefetch={HandleRefetch} />)
        }

    })
    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };
    const onSubmit = () => {
        const data = {
            name: name,
            price: price,
            image: uploadedImages,
            description: description,
            category: category,
            topping_ids: toppingid
        }

        create(data)
            .unwrap()
            .then(() => {
                form.resetFields()
                messageApi.success('Tạo sản phẩm thành công')
                setOpen(false);
            })
            .catch((data: any) => {
                messageApi.open({
                    type: "error",
                    content: 'create failure',
                });
            });
    }
    const props: any = {
        action: "https://api.cloudinary.com/v1_1/dw6wgytc3/image/upload",
        onChange({ file, fileList }: any) {
            if (file.status !== "uploading") {
                setUploadedImages(file.response.secure_url);
            }
            setFileList(fileList);
        },
        data: {
            upload_preset: "demo_upload",
            folder: "DUAN",
        },
    };
    const HandleTopping = (value: any) => {
        setTopping(value);
    }

    return (
        <div >
            <button className="pb-2 pl-2 line-clamp-3" onClick={showDrawer} ><PlusOutlined className='mr-1' />Thêm</button>
            <Collapse items={items} defaultActiveKey={allKeys} />
            <Drawer
                title="Thêm món"
                width={720}
                onClose={onClose}
                open={open}
                styles={{
                    body: {
                        paddingBottom: 80,
                    },
                }}
                extra={
                    <Space>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button onClick={onSubmit} type="primary">
                            Submit
                        </Button>
                    </Space>
                }
            >
                <Form layout="vertical" form={form}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="name"
                                label="Tên"
                                rules={[{ required: true, message: 'Please enter user name' }]}
                            >
                                <Input placeholder="Nhập tên sản phẩm" onChange={(e: any) => setName(e.target.value)} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label='Hình ảnh'
                                name="image"
                                className="col-md-10"
                                validateTrigger={["onChange", "onBlur"]}
                            >
                                {uploadedImages ? <Image src={uploadedImages} style={{ width: 200 }} /> :
                                    <Upload.Dragger {...props} multiple accept=".jpg,.png">
                                        <Button icon={<UploadOutlined />}>Upload</Button>
                                    </Upload.Dragger>
                                }
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="price"
                                label="Giá"
                                rules={[{ required: true, message: 'Please select an price' }]}
                            >
                                <Input placeholder="Nhập giá sản phẩm" type='number' onChange={(e: any) => setprice(e.target.value)} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="category"
                                label="Danh mục"
                                rules={[{ required: true, message: 'Please choose the category' }]}
                            >
                                <Select placeholder="Danh mục" onChange={(value: any) => setCategory(value)}>
                                    {data?.map((data1: any) => {
                                        return (
                                            <Option value={data1?.id} key={data1?.id}>{data1?.category}</Option>
                                        )
                                    })}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="description"
                                label="Description"
                                rules={[
                                    {
                                        required: true,
                                        message: 'please enter url description',
                                    },
                                ]}
                            >
                                <Input.TextArea rows={4} placeholder="Nhập mô tả" onChange={(e: any) => setDescription(e.target.value)} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row className='w-full'>
                        <Col className='w-full'>
                            <Form.Item
                                name="topping"
                                label="Nhóm Topping"
                            >
                                <Select placeholder="Chọn nhóm Topping" mode="multiple" variant="filled" onChange={(e: any) => HandleTopping(e)}>
                                    {topping?.map((data1: any) => {
                                        return (
                                            <Option value={data1?.id} key={data1?.id}>{data1?.name}</Option>
                                        )
                                    })}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Drawer>
        </div>
    )
}

export default Category