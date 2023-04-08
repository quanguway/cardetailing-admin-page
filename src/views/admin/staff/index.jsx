import { Box, Button, ButtonBase, Drawer, IconButton } from '@mui/material';
import TableSimpleLayout from 'layout/TableLayout/TableSimpleLayout';
import { apiConfig } from 'config/app.config';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { IconPlus, IconTrash, IconPencil, IconEye } from '@tabler/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useState } from 'react';
import FormSimpleLayout from 'layout/FormLayout/FormSimpleLayout';
import { useEffect } from 'react';
import { renderGender } from 'utils/dataToView';

const StaffPage = () => {
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [row, setRow] = useState(null);
    const handleToggle = () => {
        setOpen(!open);
    };

    const [fullName, setFullName] = useState(row?.full_name ?? '');
    const [phone, setPhone] = useState(row?.phone ?? '');
    const [email, setEmail] = useState(row?.email ?? '');
    const [gender, setGender] = useState(row?.gender ?? '');
    const [address, setAddress] = useState(row?.address_path_title ?? '');

    useEffect(() => {
        setFullName(row?.full_name ?? '');
        setPhone(row?.phone ?? '');
        setEmail(row?.email ?? '');
        setGender(renderGender(row?.gender) ?? '');
        setAddress(row?.address_path_title ?? '');
    }, [row]);
    const fields = [
        {
            label: 'Full name',
            disabled: true,
            text_active: true,
            useState: [fullName, setFullName]
        },
        {
            label: 'Phone',
            disabled: true,
            text_active:true,
            useState: [phone, setPhone]
        },
        {
            label: 'Email',
            disabled: true,
            text_active: true,
            useState: [email, setEmail]
        },
        {
            label: 'Gender',
            disabled: true,
            text_active: true,
            useState: [gender, setGender]
        },
        {
            label: 'Address',
            disabled: true,
            text_active: true,
            useState: [address, setAddress]
        },
    ]

    const columns = [
        { field: 'full_name', headerName: 'Họ và tên', flex: 1 },
        { field: 'phone', flex: 1, headerName: 'Số điện thoại' },
        { field: 'email', flex: 1, headerName: 'Thư điện tử' },
        { field: 'gender', flex: 1, headerName: 'Giới tính' },
        { field: 'address_path_title', headerName: 'Địa chỉ', flex: 1 },
        // { field: 'avatar', flex:1, renderCell: (params) => <img alt='avatar' width={100} height={100} src={params.value} /> },
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
                                .delete(apiConfig.STAFF_API.DELETE, {
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
                        navigate('form', {
                            state: {
                                data: params.row,
                                mode: 'UPDATE',
                                api: apiConfig.STAFF_API.UPDATE
                            }
                        });
                    }}
                    showInMenu
                />,
            ]
        }
    ];

    return (
        <Box>
            {/* <Button
                onClick={() => {
                    navigate('form', {
                        state: {
                            mode: 'CREATE',
                            api: apiConfig.STAFF_API.CREATE
                        }
                    });
                }}
            >
                Create
            </Button> */}
            <TableSimpleLayout
                customFields={['gender']}
                columns={columns}
                apiGet={apiConfig.STAFF_API.GET_ALL}
                handleAddButton={() => {
                    navigate('form', {
                        state: {
                            mode: 'CREATE',
                            api: apiConfig.STAFF_API.CREATE
                        }
                    });
                }}
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

export default StaffPage;
