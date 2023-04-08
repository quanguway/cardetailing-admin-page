import { Box, Button, ButtonBase, Drawer, IconButton } from '@mui/material';
import TableSimpleLayout from 'layout/TableLayout/TableSimpleLayout';
import { apiConfig } from 'config/app.config';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { IconPlus, IconTrash, IconPencil, IconEye } from '@tabler/icons';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import FormSimpleLayout from 'layout/FormLayout/FormSimpleLayout';

const ProductPage = () => {
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [row, setRow] = useState(null);

    const handleToggle = () => {
        setOpen(!open);
    };

    const [productCode, setProductCode] = useState(row?.promotio_code ?? '');
    const [title, setTitle] = useState(row?.title ?? '');
    const [description, setDescription] = useState(row?.email ?? '');
    const [time, setTime] = useState(row?.time ?? '');
    const [category, setCategory] = useState(row?.category_paths.split('/')[1] ?? '');

    useEffect(() => {
        setProductCode(row?.promotio_code ?? '');
        setTitle(row?.title ?? '');
        setDescription(row?.description ?? '');
        setTime(row?.time ?? '');
        setCategory(row?.category_paths);
    }, [row]);

    const fields = [
        {
            label: 'Mã dịch vụ',
            disabled: true,
            text_active: true,
            useState: [productCode, setProductCode]
        },
        {
            label: 'Phone',
            disabled: true,
            text_active:true,
            useState: [title, setTitle]
        },
        {
            label: 'Description',
            disabled: true,
            text_active: true,
            useState: [description, setDescription]
        },
        {
            label: 'Time',
            disabled: true,
            text_active: true,
            useState: [time, setTime]
        },
        {
            label: 'Category',
            disabled: true,
            text_active: true,
            useState: [category, setCategory]
        },
    ]

    const columns = [
        { field: 'product_code', flex: 1, headerName: 'Mã dịch vụ' },
        { field: 'title', flex: 1, headerName: 'Tên dịch vụ' },
        { field: 'category_paths', flex: 1, headerName: 'Loại' },
        { field: 'time', flex: 1, headerName: 'Thời gian dự kiến (phút)' },
        { field: 'description', flex: 1, headerName: 'Mô tả' },
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
                        console.log(params.row);
                        handleToggle();
                        setRow(params.row);
                    }}
                    showInMenu
                />,
                <GridActionsCellItem
                    icon={<IconTrash />}
                    label="Xóa"
                    onClick={() => {
                        if (confirm('Do you want delete this item ?')) {
                            axios
                                .delete(apiConfig.PRODUCT_API.DELETE, {
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
                    label="Sửa"
                    onClick={() => {
                        navigate('update', { state: { data: params.row } });
                    }}
                    showInMenu
                />
            ]
        }
    ];

    return (
        <Box>
            <TableSimpleLayout
                apiGet={apiConfig.PRODUCT_API.GET_ALL_WITHOUT_PRICE}
                customFields={['gender']}
                columns={columns}
                handleAddButton={() => navigate('create')}
                nameButton="Thêm dịch vụ"
            />
            <Drawer
                anchor={'right'}
                onClose={handleToggle}
                open={open}
                PaperProps={{
                    sx: {
                        width: 500,
                        padding: '14px'
                    }
                }}
            >
                <PerfectScrollbar component="div">
                    <FormSimpleLayout fields={fields} isBackgroud={false} showButton={false}/>
                </PerfectScrollbar>
            </Drawer>
        </Box>
    );
};

export default ProductPage;
