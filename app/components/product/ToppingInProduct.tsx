import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Checkbox } from 'antd';
import React, { useState } from 'react'
import { Collapse, Table, Button } from 'antd';
type Props = {}

const ToppingInProduct = ({ data }: any) => {
    const [value, setValue] = useState(1);
    const [open, setopen] = useState(false)
    const onChange = (e: any) => {
        setValue(e.target.value);
    };
    const HandleOpenSubtopping = () => {
        setopen(true)
    }
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Action',
            key: 'action',
            render: () => (
                <>
                    <Button icon={< EditOutlined />} className='mr-2'></Button>
                    <Button icon={<DeleteOutlined />}></Button>
                </>
            )
        },
    ];
    const items: any = data?.map((data: any) => {
        return (
            {
                key: `${data?.id}`,
                label: `${data?.name}`,
                children: <Table dataSource={data?.sub_toppings} columns={columns} pagination={false} />,
            }
        )
    })
    return (
        <div>
            <Collapse items={items} defaultActiveKey={['1']} />
        </div>

    )
}

export default ToppingInProduct