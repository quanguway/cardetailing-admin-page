import { Autocomplete, Box, Button, Drawer, Grid, List, ListItem, TextField, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { apiConfig } from 'config/app.config';
import TableSimpleLayout from 'layout/TableLayout/TableSimpleLayout';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { v4 as uuid } from 'uuid';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import moment from 'moment/moment';
import FormSimpleLayout from 'layout/FormLayout/FormSimpleLayout';
import PerfectScrollbar from 'react-perfect-scrollbar';


const BookingDetail = () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const handleToggle = () => {
        setOpen(!open);
    };

    const [listServiceIdBooked, setListServiceIdBooked] = useState();

    const [listInfo, setListInfo] = useState([]);
    const [customerInfo, setCustomerInfo] = useState([]);
    const [carDetailInfo, setCarDetailInfo] = useState([]);
    const [bookDetailRow, setBookDetailRow] = useState([]);
    const [orderPayment, setOrderPayment] = useState();
    const [orderSum, setOrderSum] = useState();
    const [orderSumTime, setOrderSumTime] = useState();
    const [orderCreateDate, setOrderCreateDate] = useState();
    const [promotionCanUse, setPromotionCanUse] = useState();

    const [listServiceWithoutInBook, setListServiceWithoutInBook] = useState();
    const [listStaff, setListStaff] = useState();


    const statusList = ['Đang chờ sử dụng dịch vụ' ,'Đang xử dụng dịch vụ', 'Hoàn thành dịch vụ', 'Hủy dịch vụ'];


    useEffect(() => {
        axios.get(apiConfig.STAFF_API.GET_ALL).then((value) => {
            setListStaff(value.data);
        })
    }, [])

    useEffect(() => {
        axios
            .get(apiConfig.BOOKING_API.GET_BY_ID, {
                params: { id: state.data.booking_id }
            })
            .then((value) => {
                const data = value.data;
                console.log(data);
                setListServiceIdBooked(value.data.booking_details.map((item) => {return item.product.id}))

                axios.get(apiConfig.PRODUCT_API.GET_ALL).then((data) => {
                    console.log(listServiceIdBooked);
                    const arr = data.data.filter((item) => { 
                        console.log(listServiceIdBooked?.includes(item.id));
                        return ! listServiceIdBooked?.includes(item.id) 
                    });
                    console.log(arr);
                    setListServiceWithoutInBook(arr);
                    console.log(listServiceIdBooked);
                })

                setBookDetailRow(
                    value.data.booking_details.map((item) => ({
                        id: item.id,
                        service_title: item.product.title,
                        service_price: item?.price?.price ?? 0,
                        service_price_final: item.price_final,
                        service_product_received: item.product_recived_title,
                        service_time: item.product.time,
                        staff_name: item?.staff?.full_name ?? '',
                        type: item?.type ?? '',
                        status: item?.status ?? ''
                    }))
                );

                setCustomerInfo([
                    {
                        label: 'Tên khách hàng',
                        value: data.customer?.full_name ?? ''
                    },
                    {
                        label: 'Số diện thoại',
                        value: data.customer?.phone ?? ''
                    },
                    {
                        label: 'Thư điện tử',
                        value: data.customer?.email ?? ''
                    },
                    {
                        label: 'Địa chỉ',
                        value: data.customer?.addresses ?? ''
                    }
                ]);
                setCarDetailInfo([
                    {
                        label: 'Loại xe',
                        value: data.car_detail?.car_info.type ?? ''
                    },
                    {
                        label: 'Tên xe',
                        value: data.car_detail?.car_info.branch ?? ''
                    },
                    {
                        label: 'Biển số xe',
                        value: data.car_detail?.number_plate ?? ''
                    }
                ]);

                const orderId = uuid();
                
                const total = data.booking_details.reduce(
                    (partialSum, item) => {
                        if(item.status == statusList[2]) {
                            return partialSum + item.price_final
                        }
                    },
                    0
                );
                const totalTime = data.booking_details.reduce(
                    (partialSum, item) => partialSum + item.product.time,
                    0
                );
                
                
                setOrderSum(total ?? 0);
                console.log(orderSum);

                setOrderSumTime(totalTime);
                setOrderCreateDate(data.date_created);
                const orderDetails = data.booking_details.map((item) => {
                    console.log(item);
                    return {
                        type: item.type,
                        status: item.status,
                        product_id: item.product.id,
                        price_line_id: item?.price?.id ?? null,
                        order_id: orderId
                    };
                });
                setOrderPayment({
                    order: {
                        id: orderId,
                        customer_id: data?.customer?.id ?? null,
                        total: total,
                        status: 'SERVICE',
                        book_id: state.data.booking_id,
                        promotion_line_id:
                            promotionCanUse?.promotionLine?.id ?? null
                    },
                    order_details: orderDetails,
                    slot_id: state.data.id
                });
            }).finally((value) => {
                // axios.get(apiConfig.PRODUCT_API.GET_ALL).then((data) => {
                //     console.log(listServiceIdBooked);
                //     const arr = data.data.filter((item) => { 
                //         console.log(listServiceIdBooked?.includes(item.id));
                //         return ! listServiceIdBooked?.includes(item.id) 
                //     });
                //     console.log(arr);
                //     setListServiceWithoutInBook(arr);
                //     console.log(listServiceIdBooked);
                // })
            });
    }, []);

    useEffect(() => {
        axios
            .get(apiConfig.PROMOTION_API.CHECKPROMOTIONORDER, {
                params: { id: state.data.booking_id, total: orderSum }
            })
            .then((value) => {
                setPromotionCanUse(value.data.promotion_can_use);
                // setOrderPayment({ promotion: value.data.promotion_can_use.promotionLine, ...orderPayment});
            });
    }, [orderSum]);

    const RenderInfoCommon = () => {
        return (
            <Box sx={{ bgcolor: 'background.paper', height: '100%' }}>
                <List sx={{ width: '100%', maxWidth: 360, padding: '14px' }}>
                    <h3>Khách hàng</h3>
                    {customerInfo.map((item) => (
                        <ListItem sx={{ display: 'flex' }}>
                            <Grid container>
                                <Grid item xs={5}>
                                    <Typography>{item.label}:</Typography>
                                </Grid>
                                <Grid item xs={7}>
                                    <Typography>{item.value}</Typography>
                                </Grid>
                            </Grid>
                        </ListItem>
                    ))}
                </List>
                <List
                    sx={{
                        width: '100%',
                        maxWidth: 360,
                        padding: '14px',
                        paddingTop: '0'
                    }}
                >
                    <h3>Thông tin xe</h3>
                    {carDetailInfo.map((item) => (
                        <ListItem sx={{ display: 'flex' }}>
                            <Grid container>
                                <Grid item xs={4}>
                                    <Typography>{item.label} :</Typography>
                                </Grid>
                                <Grid item xs={8}>
                                    <Typography>{item.value}</Typography>
                                </Grid>
                            </Grid>
                        </ListItem>
                    ))}
                </List>
            </Box>
        );
    };

    const handlePayment = async () => {
        const params = {
            ...orderPayment,
            promotion_line: promotionCanUse
        };

        console.log(params);
        console.log(promotionCanUse);

        await axios.post(apiConfig.ORDER_API.PAYMENT, params);

        navigate('/booking');
    };


    const bookDetailColumns = [
        { field: 'service_title', headerName: 'Tên dịch vụ', flex: 1 },
        { field: 'service_time', headerName: 'Thời gian xử lý', flex: 1 },

        // { field: 'service_price', headerName: 'Giá', flex: 1 },
        // { field: 'service_price_final', headerName: 'Thành tiền', flex: 1 },
        {
            headerName: 'Nhân viên',
            field: 'staff_name',
            flex: 1
        },
        {
            headerName: 'Ghi chú',
            flex: 1,
            field: 'type',
            renderCell: (params) =>
                params.value === 'GIFT' ? (
                    <CardGiftcardIcon></CardGiftcardIcon>
                ) : (
                    ''
                )
        },
        {
            field: 'service_price',
            headerName: 'Đơn giá',
            flex: 1,
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
            field: 'status',
            headerName: 'Trạng thái',
            width: 200,
            renderCell: (data) => (
                data.row.type != 'GIFT' ? <Autocomplete
                    size="small"
                    options={data.row.status == statusList[1] ? [statusList[1], statusList[2]] : statusList}
                    value={data.row.status}
                    disabled={data.row.status == statusList[3] || data.row.status == statusList[2]}
                    fullWidth={true}
                    disableClearable
                    onChange={(event, newValue) => {
                        console.log(data.row)
                        const params = {
                            id: data.row.id,
                            item: {
                                'status': newValue,
                            }
                        }
                        if (confirm('BẠn có thực sự muốn chuyển status book detail?')) {
                            axios.post(apiConfig.BOOKING_DETAIL_API.UPDATE, params).then(
                                window.location.reload()
                            );
                        }
                        handleConfirmChange(params.row.id, newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                /> : <></>
            )
        }
        
    ];

    const RenderInfoService = () => {
        return (
            <Box sx={{ bgcolor: 'background.paper' }}>
                <Box height={400}>
                    <DataGrid
                        columns={bookDetailColumns}
                        rows={bookDetailRow}
                        disableSelectionOnClick
                    />
                </Box>
            </Box>
        );
    };

    const [addService, setAddService] = useState();
    const [addStaff, setAddStaff] = useState();

    const addServiceForm = [
        {
            label: 'Dịch vụ',
            useState: [addService, setAddService],
            type: 'combo',
            values: listServiceWithoutInBook,
        },
        {
            label: 'Nhân viên',
            useState: [addStaff, setAddStaff],
            type: 'combo',
            values: listStaff
        },
        
    ]

    return (
        <Box>
            <Box sx={{ height: 'auto', lineHeight: '1.5' }}>
                <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
                    <Grid item xs={4}>
                        <RenderInfoCommon />
                    </Grid>
                    <Grid item xs={8}>
                        <Box
                            sx={{
                                height: '100%',
                                marginBottom: '20px',
                                padding: '14px',
                                bgcolor: 'background.paper'
                            }}
                        >
                            <h3>Thông tin đơn</h3>
                            <Grid
                                container
                                columnSpacing={{ xs: 1, sm: 2, md: 2 }}
                                //sx={{ padding: '0 20px' }}
                            >
                                <Grid item xs={6}>
                                    <ListItem sx={{ display: 'flex' }}>
                                        <Grid container>
                                            <Grid item xs={5}>
                                                <Typography>
                                                    Thời gian bắt đầu:
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={7}>
                                                <Typography>
                                                    {moment(
                                                        orderCreateDate
                                                    ).format(
                                                        'DD/MM/YYYY hh:mm A'
                                                    )}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </ListItem>
                                    <ListItem sx={{ display: 'flex' }}>
                                        <Grid container>
                                            <Grid item xs={5}>
                                                <Typography>
                                                    Kết thúc (dự kiến):
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={7}>
                                                <Typography>
                                                    <b>
                                                        {moment(
                                                            Date.parse(
                                                                orderCreateDate
                                                            ) +
                                                                orderSumTime *
                                                                    60000
                                                        ).format(
                                                            'DD/MM/YYYY hh:mm A'
                                                        )}
                                                    </b>
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </ListItem>
                                </Grid>
                                <Grid item xs={6}>
                                    <ListItem sx={{ display: 'flex' }}>
                                        <Grid container>
                                            <Grid item xs={5}>
                                                <Typography>
                                                    Trạng thái đơn :
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={5}>
                                                <Typography>
                                                    Đang xử lý
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </ListItem>
                                    <ListItem sx={{ display: 'flex' }}>
                                        <Grid container>
                                            <Grid item xs={5}>
                                                <Typography>
                                                    Tổng đơn hàng :
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={5}>
                                                <Typography>
                                                    <b>
                                                        {new Intl.NumberFormat(
                                                            'vi-VN',
                                                            {
                                                                style: 'currency',
                                                                currency: 'VND'
                                                            }
                                                        ).format(orderSum)}
                                                    </b>
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </ListItem>
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    sx={{
                                        margin: '10px 10px'
                                    }}
                                >
                                    {Number(promotionCanUse?.soTienGiam) > 0 ? (
                                        <Box
                                            sx={{
                                                borderRadius: '10px',
                                                padding: '10px',
                                                backgroundColor: '#f1ebeb',
                                                height: '100%'
                                            }}
                                        >
                                            <Grid
                                                container
                                                columnSpacing={{
                                                    xs: 1,
                                                    sm: 2,
                                                    md: 2
                                                }}
                                            >
                                                <Grid item xs={12}>
                                                    <span>
                                                        <b>
                                                            Áp dụng khuyến mại:{' '}
                                                            {
                                                                promotionCanUse
                                                                    .promotionLine
                                                                    .promotion_code
                                                            }
                                                        </b>
                                                    </span>
                                                    <span>
                                                        {' - '}
                                                        {
                                                            promotionCanUse
                                                                .promotionLine
                                                                .title
                                                        }
                                                    </span>
                                                </Grid>
                                                <Grid
                                                    item
                                                    xs={6}
                                                    sx={{
                                                        marginLeft: '10px'
                                                    }}
                                                >
                                                    <span>
                                                        Hình thức: giảm{'  '}
                                                        {promotionCanUse
                                                            .promotionLine
                                                            .type ===
                                                        'CONDITION_PRICE/PERCENT'
                                                            ? promotionCanUse
                                                                  .promotionLine
                                                                  .percent + '%'
                                                            : new Intl.NumberFormat(
                                                                  'vi-VN',
                                                                  {
                                                                      style: 'currency',
                                                                      currency:
                                                                          'VND'
                                                                  }
                                                              ).format(
                                                                  promotionCanUse
                                                                      .promotionLine
                                                                      .maximum_reduction_amount
                                                              )}{' '}
                                                        hóa đơn trên{' '}
                                                        {new Intl.NumberFormat(
                                                            'vi-VN',
                                                            {
                                                                style: 'currency',
                                                                currency: 'VND'
                                                            }
                                                        ).format(
                                                            promotionCanUse
                                                                .promotionLine
                                                                .minimum_total
                                                        )}
                                                    </span>
                                                    <br />
                                                    <span>
                                                        Tối đa:
                                                        {' ' +
                                                            new Intl.NumberFormat(
                                                                'vi-VN',
                                                                {
                                                                    style: 'currency',
                                                                    currency:
                                                                        'VND'
                                                                }
                                                            ).format(
                                                                promotionCanUse
                                                                    .promotionLine
                                                                    .maximum_reduction_amount
                                                            )}
                                                    </span>
                                                </Grid>
                                                <Grid
                                                    item
                                                    xs={5}
                                                    sx={{
                                                        display: 'flex',
                                                        flexDirection:
                                                            'column-reverse',
                                                        marginLeft: '5px'
                                                    }}
                                                >
                                                    <Box>
                                                        <Grid
                                                            container
                                                            columnSpacing={{
                                                                xs: 1,
                                                                sm: 2,
                                                                md: 2
                                                            }}
                                                        >
                                                            <Grid item xs={5}>
                                                                <span>
                                                                    Số tiền
                                                                    giảm:
                                                                </span>
                                                            </Grid>
                                                            <Grid
                                                                item
                                                                xs={6}
                                                                sx={{
                                                                    marginLeft:
                                                                        '10px'
                                                                }}
                                                            >
                                                                <span>
                                                                    <b>
                                                                        {new Intl.NumberFormat(
                                                                            'vi-VN',
                                                                            {
                                                                                style: 'currency',
                                                                                currency:
                                                                                    'VND'
                                                                            }
                                                                        ).format(
                                                                            promotionCanUse.soTienGiam
                                                                        )}
                                                                    </b>
                                                                </span>
                                                            </Grid>
                                                        </Grid>
                                                    </Box>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    ) : (
                                        <></>
                                    )}
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid
                                        container
                                        columnSpacing={{ xs: 1, sm: 2, md: 2 }}
                                        sx={{ padding: '0 20px' }}
                                    >
                                        {/* <Grid item xs={5}></Grid> */}
                                        <Grid item xs={8}>
                                            <Grid
                                                container
                                                columnSpacing={{
                                                    xs: 1,
                                                    sm: 2,
                                                    md: 2
                                                }}
                                                //sx={{ padding: '0 20px' }}
                                            >
                                                <Grid item xs={5}>
                                                    <h3>Tổng thanh toán: </h3>
                                                </Grid>
                                                <Grid item xs={7}>
                                                    <h3>
                                                        {new Intl.NumberFormat(
                                                            'vi-VN',
                                                            {
                                                                style: 'currency',
                                                                currency: 'VND'
                                                            }
                                                        ).format(
                                                            Number(orderSum) -
                                                                Number(
                                                                    promotionCanUse?.soTienGiam ??
                                                                        0
                                                                )
                                                        )}
                                                    </h3>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid
                                        container
                                        columnSpacing={{ xs: 1, sm: 2, md: 2 }}
                                        //sx={{ padding: '0 20px' }}
                                    >
                                        <Grid item xs={6}></Grid>
                                        <Grid item xs={6}>
                                            <Button
                                                sx={{
                                                    margin: '10px 15px',
                                                    width: '300px'
                                                }}
                                                onClick={handlePayment}
                                                variant="contained"
                                                color="primary"
                                            >
                                                Thanh toán
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </Box>

            <Box
                sx={{
                    height: 'auto',
                    marginTop: '20px',
                    bgcolor: 'background.paper',
                    padding: '14px'
                }}
            >
                <Box justifyContent={'space-between'} display={'flex'} mb={1}>
                    <h3>Danh sách dịch vụ</h3>
                    <Button onClick={() => {
                        handleToggle()
                    }} variant='contained' py={0}>Thêm dịch vụ</Button>
                    <Drawer
                        anchor={'right'}
                        onClose={handleToggle}
                        open={open}
                        PaperProps={{
                            sx: {
                                width: 700
                            }
                        }}
                    >
                        <PerfectScrollbar component="div">
                            <FormSimpleLayout fields={addServiceForm} isBackgroud={false} nameForm={'Thêm dịch vụ'} handleSubmit={() => {
                                    // const [addService, setAddService] = useState();
                                    // const [addStaff, setAddStaff] = useState();
                                    console.log(orderPayment);
                                    console.log(addService);
                                // const params = {
                                //     product_id: addService.id,
                                //     status: statusList[0],
                                //     booking_id: orderPayment.order.book_id,
                                //     staff_id: addStaff.id,
                                //     price_id: serv
                                // }

                                // axios.post(apiConfig.BOOKING_DETAIL_API.CREATE, )
                            }}/>
                        </PerfectScrollbar>
                    </Drawer>
                </Box>
                <RenderInfoService />
            </Box>
        </Box>
    );
}

export default BookingDetail
