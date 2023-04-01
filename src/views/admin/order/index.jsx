import { Box, Button, ButtonBase, IconButton } from '@mui/material';
import TableSimpleLayout from 'layout/TableLayout/TableSimpleLayout';
import { apiConfig } from 'config/app.config';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { IconPlus, IconTrash, IconPencil, IconEye } from '@tabler/icons';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';
import DrawerToggle from 'component/DrawerToggle';

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
        { field: 'total', flex: 1, headerName: 'Tổng tiền' },
        { field: 'final_total', flex: 1, headerName: 'Tổng thanh toán' },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Thao tác',
            flex: 1,
            getActions: (params) => [
                <GridActionsCellItem
                    icon={<IconEye />}
                    label="Show"
                    onClick={() => {
                        console.log(params.row);
                        //handleToggle()
                        setRow(params.row);
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
