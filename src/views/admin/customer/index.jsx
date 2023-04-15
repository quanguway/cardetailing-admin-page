import { Box, Button, ButtonBase, Collapse, Drawer, IconButton, Modal, Typography } from '@mui/material';
import TableSimpleLayout from 'layout/TableLayout/TableSimpleLayout';
import { apiConfig } from 'config/app.config';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { IconPlus, IconTrash, IconPencil, IconEye } from '@tabler/icons';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import FormSimpleLayout from 'layout/FormLayout/FormSimpleLayout';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { renderGender } from 'utils/dataToView';
import React from 'react';
import CarDetailRow from 'component/CarDetailRow';


const CustomerPage = () => {
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [row, setRow] = useState(null);
    const [openCollapse, setOpenCollapse] = React.useState(false);

    const [openModal, setOpenModal] = React.useState(false);
    const handleModalOpen = () => setOpenModal(true);
    const handleModalClose = () => setOpenModal(false);

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

    const addCarfields = [
        {
            label: 'Full name',
            disabled: true,
            text_active: true,
            useState: [fullName, setFullName]
        },
    ]

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
        { field: 'full_name', flex: 1, headerName: 'Tên khách hàng' },
        { field: 'phone', flex: 1, headerName: 'Số điện thoại' },
        { field: 'email', flex: 1, headerName: 'Thư điện tử' },
        { field: 'gender', flex: 1, headerName: 'Giới tính' },
        { field: 'address_path_title', flex: 1, headerName: 'Địa chỉ' },
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
                    icon={<IconPencil />}
                    label="Chỉnh sửa"
                    onClick={() => {
                        navigate('update', {
                            state: {
                                data: params.row,
                                api: apiConfig.CUSTOMER_API.UPDATE
                            }
                        });
                    }}
                    showInMenu
                />,
                <GridActionsCellItem
                    icon={<IconPencil />}
                    label="Thêm xe"
                    onClick={() => {
                        handleModalOpen()
                    }}
                    showInMenu
                />
            ]
        }
    ];

    return (
        <Box>
            <TableSimpleLayout
                apiGet={apiConfig.CUSTOMER_API.GET_ALL}
                customFields={['gender']}
                columns={columns}
                // handleAddButton={() => navigate('create')}
                disableButton={true}
            />
            <Modal sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 500,
                height: 600,
                borderRadius: '12px',
                boxShadow: 24,
            }}
                open={openModal}
                onClose={handleModalClose}
                >
                <Box sx={{
                    backgroundColor: '#ffffff !important',
                    width: '100%',
                    height: '100%'
                }}>
                    <PerfectScrollbar component="div">
                        <FormSimpleLayout fields={fields} isBackgroud={false} showButton={true}/>
                    </PerfectScrollbar>
                </Box>
            </Modal>
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
                    <Box display={'flex'} justifyContent={'space-between'}>
                        <h3>Danh sách xe ( số xe: {row?.cars.length}): </h3>
                    </Box>
                    <Box>
                        {row?.cars?.map((item) => {
                            console.log(item);
                            return (
                                <CarDetailRow row={item}/>
                            )
                        })}
                    </Box>
                </PerfectScrollbar>
            </Drawer>
        </Box>
    );
};

export default CustomerPage;
