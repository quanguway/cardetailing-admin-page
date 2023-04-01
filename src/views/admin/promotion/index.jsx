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

const PromotionPage = () => {
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [row, setRow] = useState(null);
    const handleToggle = () => {
        setOpen(!open);
    };

    const columnsShow = ['title', 'description'];

    const columnsChildShow = {
        label: 'promotionLines',
        columns: [
            'promotion_code',
            'start_date',
            'end_date',
            'max_quantity',
            'max_quantity_per_customer',
            'max_quantity_per_customer_per_day'
        ]
    };

    const infoToggle = {
        valueL: ''
    };

    const columns = [
        { field: 'title', headerName: 'Tiêu đề', flex: 1 },
        { field: 'description', headerName: 'Mô tả', flex: 1 },
        {
            field: 'date_start',
            headerName: 'Ngày bắt đầu',
            flex: 1,
            valueFormatter: (params) =>
                moment(params?.value).format('DD/MM/YYYY')
        },
        {
            field: 'date_end',
            headerName: 'Ngày kết thúc',
            flex: 1,
            valueFormatter: (params) =>
                moment(params?.value).format('DD/MM/YYYY')
        },
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
                        handleToggle();
                        setRow(params.row);
                    }}
                    showInMenu
                />,
                <GridActionsCellItem
                    icon={<IconTrash />}
                    label="Delete"
                    onClick={() => {
                        if (confirm('Bạn có chắc muốn xóa ?')) {
                            axios
                                .delete(apiConfig.PROMOTION_API.DELETE, {
                                    data: { id: params.id }
                                })
                                .then(() => {
                                    window.location.reload();
                                });
                        }
                    }}
                    showInMenu
                />,
                <GridActionsCellItem
                    icon={<IconPencil />}
                    label="Edit"
                    onClick={() => {
                        navigate('form', {
                            state: {
                                data: params.row,
                                mode: 'UPDATE',
                                api: apiConfig.PROMOTION_API.UPDATE
                            }
                        });
                    }}
                    showInMenu
                />
            ]
        }
    ];

    return (
        <Box>
            <TableSimpleLayout
                nameButton="Thêm bảng khuyến mãi"
                columns={columns}
                apiGet={apiConfig.PROMOTION_API.GET_ALL}
                handleAddButton={() => navigate('create')}
            />
            <DrawerToggle
                width={1000}
                open={open}
                handleToggle={handleToggle}
                data={row}
                columns={columnsShow}
                columnChild={columnsChildShow}
                infoToggle={infoToggle}
            />
        </Box>
    );
};

export default PromotionPage;
