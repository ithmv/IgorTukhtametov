
import React, { useState, useEffect } from "react";
import { Table, Space, Popconfirm, Typography } from 'antd';
import 'antd/dist/antd.css';
import  OrdersApi from "../../api/orders-api";
import CreateOrders from "./CreateOrders";

const { Title } = Typography;


export function OrderPage () {
    const [data, setData] = useState([null]);

    const columns = [
        {
            title: 'Имя',
            dataIndex: 'customer',
            key: 'customer',
            render: customer => `${customer? customer.fullName : null}`
        },
        {
            title: 'Телефон',
            dataIndex: 'customer',
            key: 'customer',
            render: customer => `${customer? customer.phone : null}`
        },
        {
            title: 'Мастер',
            dataIndex: 'master',
            key: 'master',
            render: master => `${master? master.fullName : null} - опыт работы ${master? getDataDiff(master.startWorkDate) : null} день`
        },{
            title: 'Услуга',
            dataIndex: 'service',
            key: 'servise',
            render: servise => `${servise? servise.name : null} - ${servise? servise.description : null}`
        },
        {
            title: 'Дата',
            dataIndex: 'visitDate',
            key: 'visitDate',
            render: visitDate => `${visitDate? visitDate : null}`
        },
        {
            title: '',
            key: 'action',
            render: (text, record) => (
            <Space size="large">
                <CreateOrders  buttonName="Изменить" ColumId={record? record.id : null}/>
            </Space>
            ),
        },
        {
            title: '',
            key: 'action',
            render: (text, record) => (
            <Popconfirm title="Вы уверены?" onConfirm={() => deleteOrder(record.id)}>
            <Space size="large">
                <a>Удалить</a>
            </Space>
            </Popconfirm>
            ),
        },
    ];
    
    async function deleteOrder(order_id) {
        var response = OrdersApi.deleteOrders(order_id);
        console.log(response)
        OrdersApi.getOrders().then(setData);
    }
    
    function getDataDiff(date) {
        const currentDate = new Date()
        const oldDate = new Date(date)
        return Math.ceil(Math.abs(currentDate.getTime() - oldDate.getTime()) / (1000 * 3600 * 24));
    }

    useEffect(() => {
        OrdersApi.getOrders().then(setData);
    }, []);

    return (
        <>
            <CreateOrders buttonName = "Cоздать новую заявку"/>
            <Table columns={columns} dataSource={data} />
        </>
    )
}