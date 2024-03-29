import {
    Autocomplete,
    Box,
    Button,
    ButtonBase,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Grid,
    IconButton,
    Step,
    StepLabel,
    Stepper,
    TextField,
    Typography
} from '@mui/material';
import { apiConfig } from 'config/app.config';
import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import { DataGrid } from '@mui/x-data-grid';
import FormSimpleLayoutV2 from 'layout/FormLayout/FormSimpleLayoutV2';
import FormChoiceSlot from './formChoiceSlot';
import { genderToBool, renderGender } from 'utils/dataToView';
import { Navigate, useNavigate } from 'react-router';
import { getAuth } from 'utils/auth';
import FormSimpleLayout from 'layout/FormLayout/FormSimpleLayout';
// import ChoiceSlotForm from './choiceSlotForm';

const steps = [
    'Chọn Vị trí',
    'Thông tin khác hàng',
    'Thông tin xe',
    'Chọn dịch vụ'
];

const BookingPage = () => {
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const navigate = useNavigate();

    // ------------------------ Chọn vị trí -------------------------------------------
    const [slotSelected, setSlotSelected] = useState();
    const [slots, setSlots] = useState([]);

    useEffect(() => {
        axios.get(apiConfig.SLOT_API.GET_ALL).then((value) => {
            setSlots(value.data);
        });
    }, []);

    const handleBooking = (item) => {
        console.log(item);
        setSlotSelected(item);
        handleNext();
    };

    const handleDetail = (item) => {
        setSlotSelected(item);
        navigate('detail', { state: { data: item } });
    };

    // ------------------------ Thông tin khách hàng -------------------------------------

    const [customerFullName, setCustomerFullName] = useState();
    const [customerPhone, setCustomerPhone] = useState();
    const [customerListPhone, setCustomerListPhone] = useState();
    const [customerEmail, setCustomerEmail] = useState();
    const [customerGender, setCustomerGender] = useState();
    const [customerNote, setCustomerNote] = useState();
    const [customerAddress, setCustomerAddress] = useState();
    const [customerCarDetail, setCustomerCarDetail] = useState();

    useEffect(() => {
        axios.get(apiConfig.ADDRESS_API.GET_ALL).then((value) => {
            setCustomerAddress([value.data[0]]);
        });

        axios.get(apiConfig.CUSTOMER_API.GET_ALL).then((value) => {
            const phones = value.data.map((item) => (item.phone))
            setCustomerListPhone(phones)
        })
    }, []);

    const customerFields = [
        {
            label: 'Tên khách hàng',
            useState: [customerFullName, setCustomerFullName]
        },
        {
            label: 'Email',
            useState: [customerEmail, setCustomerEmail]
        },

        {
            label: 'Giới tính',
            useState: [customerGender, setCustomerGender],
            values: [
                {
                    value: 'Nam'
                },
                {
                    value: 'Nữ'
                }
            ],
            type: 'radio'
        },
        {
            label: 'Ghi chú',
            useState: [customerNote, setCustomerNote],
            type: 'textarea'
        },
        {
            label: 'Địa chỉ',
            useState: [customerAddress, setCustomerAddress],
            type: 'tree',
            labels: [
                'Tỉnh / Thành phố',
                'Quận / Huyện',
                'Phường / xã',
                'Địa chỉ'
            ]
        }
    ];

    // ----------------------------- Thông tin xe -------------------------------------

    // const carDetails = [
    //   {
    //     title: 'Mex',
    //     type: 'Small',
    //   },
    //   {
    //     title: 'Laxi',
    //     type: 'Medium',
    //   },
    //   {
    //     title: 'alaxander',
    //     type: 'Lage',
    //   },
    //   {
    //     title: 'Yasua',
    //     type: 'Super Lage',
    //   }
    // ]

    const [carModel, setCarModel] = useState();
    const [carDetails, setCarDetails] = useState([]);
    const [carBranchs, setCarBranchs] = useState([]);
    const [carBranch, setCarBranch] = useState([]);
    const [engine, setEngine] = useState();
    const [chassis, setChassis] = useState();
    const [number_seat, setNumber_seat] = useState();
    const [color, setColor] = useState();
    const [carType, setCarType] = useState();

    const [listCarBranch, setListCarBranch] = useState();
    const [listCarModel, setListCarModel] = useState();

    const [carNumberPlate, setCarNumberPlate] = useState();

    const [oldCustomerCarDetail, setOldCustomerCarDetail] = useState({});


    // useEffect(() => {
    //     axios.get(apiConfig.CAR_INFO.GET_ALL).then((value) => {
    //         const data = value.data.map((item) => ({
    //             ...item,
    //             title: item.branch
    //         }));
    //         setCarDetails(data);
    //     });
    // }, []);

    // useEffect(() => {
    //     const data = carDetails.filter((item) => {
    //         return item.type == carType.title;
    //     });
    //     setCarBranchs(data);
    // }, [carType]);

    useEffect(() => {
        axios.get(apiConfig.CAR_BRANCH.GET_ALL).then((item) => {
            setListCarBranch(item.data);
        })
    },[])

    useEffect(() => {
        setCarModel('');
        setListCarModel(carBranch?.car_info);
    },[carBranch])


    // useEffect(() => {
    //     navigate('/booking');
    // }, [activeStep]);

    console.log(oldCustomerCarDetail);

    const carFields = [
        {
            label: 'Hãng xe',
            type: 'combo',
            useState: [carBranch, setCarBranch],
            disabled: oldCustomerCarDetail ? true : false,
            values: listCarBranch
        },
        {
            label: 'Dòng xe',
            type: 'combo',
            disabled: oldCustomerCarDetail ? true : false,
            useState: [carModel, setCarModel],
            values: listCarModel
        },
        {
            label: 'Biển số xe',
            disabled: oldCustomerCarDetail ? true : false,
            useState: [carNumberPlate, setCarNumberPlate]
        },
        {
            label: 'Màu xe',
            disabled: oldCustomerCarDetail ? true : false,
            useState: [color, setColor]
        }
    ];

    // -------------------------------- Chọn dịch vụ ---------------------------------------

    const [serviceList, setServiceList] = useState();
    const [staffList, setStaffList] = useState();
    const [serviceRows, setServiceRows] = useState();
    const [serviceRowSelected, setServiceRowSelected] = useState([]);
    const [serviceRowSelectedIds, setServiceRowSelectedIds] = useState([]);

    useEffect(() => {
        axios.get(apiConfig.PRODUCT_API.GET_ALL).then((value) => {
            setServiceRows(value.data);
        });
        axios.get(apiConfig.STAFF_API.GET_ALL).then((value) => {
            const data = value.data.map((item) => ({
                ...item,
                label: item.full_name
            }));
            setStaffList(data);
        });
    }, []);

    const serviceFields = [];

    const handleConfirmChange = (rowId, newValue) => {
        const updatedData = serviceRows.map((x) => {
            if (x.id === rowId) {
                return {
                    ...x,
                    staff: newValue
                };
            }
            return x;
        });
        setServiceRows(updatedData);
    };

    const serviceColumns = [
        { field: 'title', headerName: 'Tên dịch vụ', flex: 1 },
        { field: 'time', headerName: 'Thời gian xử lý (Phút)', flex: 1 },
        // { field: 'price_line', headerName: 'Giá', flex: 1 },
        // { field: 'price_final', headerName: 'Giá Cuối', flex: 1 },
        {
            field: 'product_recived_title',
            headerName: 'Dịch vụ được tặng',
            flex: 1
        },
        // {
        //     field: 'staff',
        //     headerName: 'Nhân viên xử lý',
        //     width: 300,
        //     renderCell: (params) => (
        //         <Autocomplete
        //             size="small"
        //             options={staffList}
        //             value={params.row.staff}
        //             sx={{ width: '100%' }}
        //             onChange={(event, newValue) => {
        //                 handleConfirmChange(params.row.id, newValue);
        //             }}
        //             renderInput={(params) => <TextField {...params} />}
        //         />
        //     )
        // }
    ];

    // ---------------------------- config ------------------------------

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const handleFinish = async () => {
        const addrLength = customerAddress?.length - 1;

        const bookingId = uuid();
        const customerId = uuid();
        const carDetailId = uuid();

        const booking_details = serviceRowSelected.map((item) => ({
            booking_id: bookingId,
            product_id: item.id,
            price_id: item.price_line_id,
            // staff_id: item.staff.id,
            status: 'Đang chờ sử dụng dịch vụ',
            type: 'SERVICE'
        }));

        const total = serviceRowSelected.reduce((accumulator, item) => {
            return accumulator + item.price_line;
        }, 0);

        await axios
            .get(apiConfig.PROMOTION_API.CHECKPROMOTIONSERVICE, {
                params: { booking_details: booking_details }
            })
            .then((value) => {
                value.data.result.map((item) => {
                    booking_details.push({
                        booking_id: bookingId,
                        product_id: item,
                        price_id: null,
                        staff_id: null,
                        type: 'GIFT'
                    });
                });
            });

        const params = {
            id: bookingId,
            total: total,
            slot_id: slotSelected.id,
            car_detail_id: carDetailId,
            booking_details: booking_details,
            customer: {
                id: !isOldCustomer ? customerId : oldCustomerInfo.id,
                full_name: customerFullName,
                phone: customerPhone,
                email: customerEmail,
                gender: genderToBool(customerGender),
                address: customerAddress[addrLength]
            },
            car_detail: {
                id: !oldCustomerCarDetail
                    ? carDetailId
                    : oldCustomerCarDetail.id,
                car_info_id: carBranch.id,
                number_plate: carNumberPlate,
                customer_id: customerId,
                color: color,
                number_seat: number_seat
            },
            isNewCustomer: !isOldCustomer ? true : false,
            isNewCar: !oldCustomerCarDetail ? true : false
        };
        console.log(params);
        // await axios.post(apiConfig.BOOKING_API.CREATE, params).then(() => {
        //     // navigate('detail', { state: { data: { booking_id: bookingId } } });

        // });
        await axios.post(apiConfig.BOOKING_API.CREATE, params).then(() => {
            window.location.reload();
        });
    };

    // --------------------------------- render stepper ---------------------------------

    const [isOldCustomer, setIsOldCustomer] = useState(false);
    const [oldCustomerInfo, setOldCustomerInfo] = useState();
    const [oldCustomerCarDetails, setOldCustomerCarDetails] = useState([]);

    const RenderRowDataFinshed = ({ label, value }) => {
        return (
            <Box
                display={'flex'}
                justifyContent={'space-between'}
                width={'45%'}
            >
                <Typography variant="h6">{label}</Typography>
                <Typography>{value}</Typography>
            </Box>
        );
    };

    console.log(oldCustomerCarDetail?.car_info?.model);

    useEffect(() => {
        console.log(oldCustomerCarDetail);
        if (oldCustomerCarDetail) {
            // setCarType({
            //     ...oldCustomerCarDetail.car_info,
            //     title: oldCustomerCarDetail.car_info.type
            // });
            // setCarBranch({
            //     ...oldCustomerCarDetail.car_info,
            //     title: oldCustomerCarDetail.car_info.title
            // });
            
        }
        setCarModel({ title: oldCustomerCarDetail?.car_info?.model ?? ''});
        setCarBranch(oldCustomerCarDetail?.car_info ?? '');
        setCarNumberPlate(oldCustomerCarDetail?.number_plate ?? '');
        setColor(oldCustomerCarDetail?.color ?? '')
    }, [oldCustomerCarDetail]);

    const handleChangePhone = async (event) => {
        const phone = event.target.value;
        setCustomerPhone(phone);
        setOldCustomerCarDetail();

        if (phone.length === 10) {
            await axios
                .get(apiConfig.CUSTOMER_API.GET_BY_PHONE, {
                    params: {
                        phone: phone
                    }
                })
                .then((value) => {
                    console.log(value.data);
                    setOldCustomerInfo(value.data);
                });
        }
    };

    useEffect(() => {
        if (oldCustomerInfo) {
            console.log(oldCustomerInfo);
            setCustomerEmail(oldCustomerInfo.email);
            setCustomerFullName(oldCustomerInfo.full_name);
            setCustomerGender(renderGender(oldCustomerInfo.gender));
            setCustomerNote(oldCustomerInfo.note);
            const params = { ids: oldCustomerInfo.address_paths };
            axios
                .get(apiConfig.ADDRESS_API.GET_MANY_BY_IDs, { params })
                .then((value) => {
                    console.log(value.data);
                    setCustomerAddress(value.data);
                });

            axios
                .get(apiConfig.CAR_DETAIL.GET_BY_CUSTOMER, {
                    params: {
                        customer_id: oldCustomerInfo.id
                    }
                })
                .then((value) => {
                    console.log(value.data);
                    setOldCustomerCarDetails(value.data);
                });

            setIsOldCustomer(true);
        }
    }, [oldCustomerInfo]);

    const RenderStepContent = () => {
        switch (activeStep) {
            case 0:
                // return <FormChoiceSlot handleClick={(event, item) => handleBooking(event, item)} slots={slots} selectedSlot={[slots, setSlots]} />;
                return (
                    <FormChoiceSlot
                        handleDetail={(event, item) =>
                            handleDetail(event, item)
                        }
                        handleBookingItem={(event, item) =>
                            handleBooking(event, item)
                        }
                        slots={slots}
                    />
                );
            case 1:
                return (
                    <FormSimpleLayoutV2
                        label={'Thông tin khác hàng'}
                        fields={customerFields}
                    >
                        {/* <TextField
                            sx={{ marginY: '8px' }}
                            key={'customer phone'}
                            //helperText="Some important text"
                            variant="outlined"
                            label={'Số điện thoại'}
                            defaultValue={customerPhone}
                            fullWidth={true}
                            onBlur={(event) => handleChangePhone(event)}
                        /> */}

                            <Autocomplete
                                sx={{ marginY: '8px' }}
                                disablePortal
                                options={customerListPhone ?? []}
                                fullWidth={true}
                                defaultValue={customerPhone}
                                onBlur={(event) => handleChangePhone(event)}
                                renderInput={(params) => (
                                    <TextField
                                        // helperText="Some important text"
                                        {...params}
                                        label={"số điện thoại"}
                                    />
                                )}
                            />
      
                        {/* <FormGroup>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={isOldCustomer}
                                        onChange={async (event) => {
                                            await axios
                                                .get(
                                                    apiConfig.CUSTOMER_API
                                                        .GET_BY_PHONE,
                                                    {
                                                        params: {
                                                            phone: customerPhone
                                                        }
                                                    }
                                                )
                                                .then((value) => {
                                                    setOldCustomerInfo(
                                                        value.data
                                                    );
                                                });

                                            if (!oldCustomerInfo) {
                                                alert('Chưa có khách hàng');
                                                return;
                                            }

                                            setCustomerEmail(
                                                oldCustomerInfo.email
                                            );
                                            setCustomerFullName(
                                                oldCustomerInfo.full_name
                                            );
                                            setCustomerGender(
                                                renderGender(
                                                    oldCustomerInfo.gender
                                                )
                                            );
                                            setCustomerNote(
                                                oldCustomerInfo.note
                                            );

                                            axios
                                                .get(
                                                    apiConfig.ADDRESS_API
                                                        .GET_MANY_BY_IDs,
                                                    {
                                                        params: {
                                                            ids: oldCustomerInfo.address_paths
                                                        }
                                                    }
                                                )
                                                .then((value) => {
                                                    setCustomerAddress(
                                                        value.data
                                                    );
                                                });

                                            axios
                                                .get(
                                                    apiConfig.CAR_DETAIL
                                                        .GET_BY_CUSTOMER,
                                                    {
                                                        params: {
                                                            customer_id:
                                                                oldCustomerInfo.id
                                                        }
                                                    }
                                                )
                                                .then((value) => {
                                                    setOldCustomerCarDetails(
                                                        value.data
                                                    );
                                                });

                                            setIsOldCustomer(true);
                                        }}
                                    />
                                }
                                label="Khách hàng cũ"
                            />
                        </FormGroup> */}
                        {isOldCustomer ? (
                            <Autocomplete
                                value={{
                                    number_plate:
                                        oldCustomerCarDetail?.number_plate
                                }}
                                getOptionLabel={(option) =>
                                    option?.number_plate ?? ''
                                }
                                options={oldCustomerCarDetails ?? []}
                                fullWidth={true}
                                onChange={(event, newValue) => {
                                    setOldCustomerCarDetail(newValue);
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        //helperText="Some important text"
                                        {...params}
                                        label={'Xe khách hàng sở hữu'}
                                    />
                                )}
                            />
                        ) : (
                            <></>
                        )}
                    </FormSimpleLayoutV2>
                );
            case 2:
                return (

                    <FormSimpleLayout label={'Thông tin xe'} fields={carFields} isBackgroud={false} showButton={false}>
                        {/* <Box>
                            <Grid
                                container
                                columnSpacing={{ xs: 1, sm: 2, md: 2 }}
                            >
                                <Grid item xs={6}>
                                    <TextField
                                        // error={
                                        //     item?.isError ? item.isError : false
                                        // }
                                        // helperText={item?.helper}
                                        sx={{ marginTop: '20px' }}
                                        variant="outlined"
                                        label="Màu sắc"
                                        defaultValue={color}
                                        fullWidth={true}
                                        onBlur={(event) => {
                                            setColor(event.target.value);
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        // key={index}
                                        // error={
                                        //     item?.isError ? item.isError : false
                                        // }
                                        // helperText={item?.helper}
                                        sx={{ marginTop: '20px' }}
                                        variant="outlined"
                                        label="Số chỗ ngồi"
                                        defaultValue={number_seat}
                                        fullWidth={true}
                                        onBlur={(event) => {
                                            setNumber_seat(event.target.value);
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        // error={
                                        //     item?.isError ? item.isError : false
                                        // }
                                        // helperText={item?.helper}
                                        sx={{ marginTop: '20px' }}
                                        variant="outlined"
                                        label="Số khung"
                                        defaultValue={chassis}
                                        fullWidth={true}
                                        onBlur={(event) => {
                                            setChassis(event.target.value);
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        // key={index}
                                        // error={
                                        //     item?.isError ? item.isError : false
                                        // }
                                        // helperText={item?.helper}
                                        sx={{ marginTop: '20px' }}
                                        variant="outlined"
                                        label="Số máy"
                                        defaultValue={engine}
                                        fullWidth={true}
                                        onBlur={(event) => {
                                            setEngine(event.target.value);
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </Box> */}
                    </FormSimpleLayout>
                );
            case 3:
                return (
                    <Box>
                        <FormSimpleLayoutV2
                            label={'Chọn dịch vụ và gán nhân viên'}
                            fields={serviceFields}
                        />
                        <Box height={400}>
                            <DataGrid
                                // density='standard'
                                columns={serviceColumns}
                                rows={serviceRows}
                                checkboxSelection
                                disableSelectionOnClick
                                onSelectionModelChange={(newSelectionModel) => {
                                    const selectedIDs = new Set(
                                        newSelectionModel
                                    );
                                    setServiceRowSelectedIds(newSelectionModel);
                                    const selectedRows = serviceRows.filter(
                                        (row) => {
                                            return selectedIDs.has(
                                                row.id.toString()
                                            );
                                        }
                                    );
                                    setServiceRowSelected(selectedRows);
                                }}
                                selectionModel={serviceRowSelectedIds}
                            />
                        </Box>
                    </Box>
                );
            case steps.length:
                return (
                    <Grid container display={'flex'}>
                        <Grid item xs={6}>
                            <RenderRowDataFinshed label={''} />
                        </Grid>
                    </Grid>
                );
            default:
                return <div>Not Found</div>;
        }
    };

    const ButtonNavigation = () => {
        return (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    pt: 2,
                    marginBottom: '20px'
                }}
            >
                <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                >
                    Trở lại
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button
                    onClick={
                        activeStep === steps.length - 1
                            ? handleFinish
                            : handleNext
                    }
                >
                    {activeStep === steps.length - 1 ? 'Hoàn tất' : 'Tiếp tục'}
                </Button>
            </Box>
        );
    };

    const ButtonReset = () => {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button onClick={handleReset}>Reset</Button>
            </Box>
        );
    };

    return getAuth() ? (
        <Box
            bgcolor={'white'}
            borderRadius={2}
            width={'100%'}
            minHeight={'88%'}
            paddingTop="20px"
        >
            <Stepper
                activeStep={activeStep}
                sx={{ margin: '0px 10px 20px 10px' }}
            >
                {steps.map((label, index) => {
                    return (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            <React.Fragment>
                <RenderStepContent />
                {activeStep !== 0 && <ButtonNavigation />}
            </React.Fragment>
        </Box>
    ) : (
        <Navigate to={{ pathname: '/login' }} />
    );
};

export default BookingPage;
