'use client';
import './globals.css';
import { Button, Checkbox, Form, Input } from 'antd';
import { useRouter } from 'next/navigation';
import { useGetAllProductQuery } from './api/product';
import { LoadingOutlined } from '@ant-design/icons';
import { useState } from 'react';
import LoadingOverlay from './components/loading/Loading';

export default function Home() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState<any>();
    const onFinish: any = (values: any) => {
        setIsLoading(true)
        router.push('/modules/seller');

    };

    const onFinishFailed: any = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <>
            {isLoading ? (
                <LoadingOverlay />
            ) : ""}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="remember"
                        valuePropName="checked"
                        wrapperCol={{ offset: 8, span: 16 }}
                    >
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>


    );
}