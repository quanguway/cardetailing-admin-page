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
import axios from 'axios';
import { set } from 'date-fns';


const CustomerPage = () => {
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [row, setRow] = useState(null);
    const [customer, setCustomer] = useState();

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


    const [carBranch, setCarBranch] = useState();
    const [listCarBranch, setListCarBranch] = useState();

    const [carModel, setCarModel] = useState();
    const [listCarModel, setListCarModel] = useState();
    const [numberPlate, setNumberPlate] = useState();
    const [carColor, setCarColor] = useState();

    // useEffect(() => {
        
    // }, [row]);



    useEffect(() => {
        axios.get(apiConfig.CAR_BRANCH.GET_ALL).then((item) => {
            setListCarBranch(item.data);
        })
    },[])

    useEffect(() => {
        setCarModel('');
        setListCarModel(carBranch?.car_info);
    },[carBranch])

    const handleAddCar = async () => {
        const params = {
            item: {
                car_info_id: carModel.id,
                customer_id: customer.id,
                number_plate: numberPlate,
                color: carColor
            }
        }

        await axios.post(apiConfig.CAR_DETAIL.CREATE, params);

        window.location.reload();
    }

    const addCarfields = [
        {
            label: 'Hãng xe',
            type: 'combo',
            useState: [carBranch, setCarBranch],
            values: listCarBranch
        },
        {
            label: 'Dòng xe',
            text_active: true,
            type: 'combo',
            useState: [carModel, setCarModel],
            values: listCarModel
        },
        {
            label: 'Biển số xe',
            useState: [numberPlate, setNumberPlate]
        },
        {
            label: 'Màu xe',
            useState: [carColor, setCarColor]
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
                    setRow(params.row);
                    setFullName(params.row.full_name ?? '');
                    setPhone(params.row.phone ?? '');
                    setEmail(params.row.email ?? '');
                    setGender(renderGender(params.row.gender) ?? '');
                    setAddress(params.row.address_path_title ?? '');
                    handleToggle();
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
                        setCustomer(params.row)
                        setCarBranch('')
                        setCarModel('')
                        setNumberPlate('')
                        setCarColor('')
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
                handleAddButton={() => navigate('create')}
                disableButton={false}
            />
            <Modal
                open={openModal}
                onClose={handleModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box sx={{
                    backgroundColor: '#ffffff',
                    padding: "4px",
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 500,
                    borderRadius: '12px',
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                }}>
                    <PerfectScrollbar component="div">
                        <FormSimpleLayout fields={addCarfields} isBackgroud={false} showButton={true} handleSubmit={handleAddCar}/>
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
