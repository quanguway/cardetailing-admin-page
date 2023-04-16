import { Box, Button, ButtonBase, IconButton } from '@mui/material';
import TableSimpleLayout from 'layout/TableLayout/TableSimpleLayout';
import { apiConfig } from 'config/app.config';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { IconPlus, IconTrash, IconPencil, IconEye } from '@tabler/icons';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';
import DrawerToggle from 'component/DrawerToggle';

const UnitPage = () => {
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [row, setRow] = useState(null);
    const handleToggle = () => {
        setOpen(!open);
    };


    // const columnsShow = ['title', 'description'];

    // const columnsChildShow = {
    //     label: 'Đơn vị quy đổi',
    //     columns: [
    //         'allow_sale',
    //         'is_active',
    //         'is_base_unit',
    //         'is_report',
    //         'value'
    //     ]
    // };

    const columns = [
        { field: 'code', flex: 1, headerName: 'Mã xe' },
        { field: 'branch', flex: 1, headerName: 'Hãng xe' },
        { field: 'model', flex: 1, headerName: 'Dòng xe' },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Thao tác',
            flex: 1,
            getActions: (params) => [
                <GridActionsCellItem
                    icon={<IconTrash />}
                    label="Xóa"
                    onClick={() => {
                        if (confirm('Bạn có muốn  xóa đơn vị này ?')) {
                            axios
                                .delete(apiConfig.UNIT_API.DELETE, {
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
                    label="Chỉnh sửa"
                    onClick={() => {
                        navigate('update', {
                            state: {
                                data: params.row,
                                mode: 'UPDATE',
                                api: apiConfig.UNIT_API.EDIT
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
                nameButton="Thêm thông tin xe"
                columns={columns}
                apiGet={apiConfig.CAR_INFO.GET_ALL}
                handleAddButton={() => navigate('create')}
            />
            {/* <DrawerToggle
                open={open}
                handleToggle={handleToggle}
                data={row}
                columns={columnsShow}
                columnChild={columnsChildShow}
            /> */}
        </Box>
    );
};

export default UnitPage;
