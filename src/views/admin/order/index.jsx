import { Box, Button, ButtonBase, IconButton } from '@mui/material';
import TableSimpleLayout from 'layout/TableLayout/TableSimpleLayout';
import { apiConfig } from 'config/app.config';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { IconPlus, IconTrash, IconPencil, IconEye } from '@tabler/icons';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';
import DrawerToggle from 'component/DrawerToggle';

import moment from 'moment/moment';

const OrderPage = () => {
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [row, setRow] = useState(null);
    const handleToggle = () => {
        setOpen(!open);
    };

    const columnsShow = ['title', 'description'];

    const columnsChildShow = {
        label: 'priceLine',
        columns: [
            'id',
            'status',
            'quality',
            'total',
            'max_quantity_per_customer',
            'max_quantity_per_customer_per_day'
        ]
    };

    const infoToggle = {
        valueL: ''
    };

    const columns = [
        { field: 'id', flex: 1, headerName: 'Mã HD' },
        {
            field: 'customer',
            flex: 1,
            headerName: 'Tên KH / Số điện thoại',
            renderCell: (params) =>
                params.value.full_name + ' / ' + params.value.phone
        },
        // {
        //     field: 'customer.phone',
        //     flex: 1,
        //     headerName: 'Số điện thoại',
        //     renderCell: (params) => params.value.phone
        // },
        {
            field: 'date_created',
            flex: 1,
            headerAlign: 'center',
            align: 'center',
            headerName: 'Thời gian',
            valueFormatter: (params) =>
                moment(params?.value).format('DD/MM/YYYY')
        },
        {
            field: 'final_total',
            flex: 1,
            headerName: 'Thanh toán',
            headerAlign: 'right',
            renderCell: (params) => (
                <div style={{ width: '100%', textAlign: 'right' }}>
                    <b>
                        {new Intl.NumberFormat('vi-VN', {
                            style: 'currency',
                            currency: 'VND'
                        }).format(params.value)}
                    </b>
                </div>
            )
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Thao tác',
            flex: 1,
            getActions: (params) => [
                <GridActionsCellItem
                    icon={<IconEye />}
                    label="Chi tiết"
                    onClick={() => {
                        // console.log(params.row)
                        //handleToggle()
                        // setRow(params.row);
                        navigate('detail', { state: { data: params.row } });
                    }}
                    showInMenu
                />
            ]
        }
    ];

    return (
        <Box>
            <TableSimpleLayout
                columns={columns}
                apiGet={apiConfig.ORDER_API.GET_ALL}
                disableButton={true}
            />
            {/* <DrawerToggle width={1000} open={open} handleToggle={handleToggle} data={row} columns={columnsShow} columnChild={columnsChildShow} infoToggle={infoToggle}/> */}
        </Box>
    );
};

export default OrderPage;
