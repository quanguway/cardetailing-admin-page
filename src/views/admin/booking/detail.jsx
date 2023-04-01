import { Box, Button, Grid, List, ListItem, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { apiConfig } from 'config/app.config';
import TableSimpleLayout from 'layout/TableLayout/TableSimpleLayout';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { v4 as uuid } from 'uuid';
import moment from 'moment/moment';

const BookingDetail = () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    const [listInfo, setListInfo] = useState([]);
    const [customerInfo, setCustomerInfo] = useState([]);
    const [carDetailInfo, setCarDetailInfo] = useState([]);
    const [bookDetailRow, setBookDetailRow] = useState([]);
    const [orderPayment, setOrderPayment] = useState();
    const [orderSum, setOrderSum] = useState();
    const [orderSumTime, setOrderSumTime] = useState();
    const [orderCreateDate, setOrderCreateDate] = useState();

    useEffect(() => {
        axios
            .get(apiConfig.PROMOTION_API.CHECKPROMOTIONORDER,{
                params: { id: state.data.booking_id }
            })
            .then((value) => {
                console.log(value.data);
            });

        axios
            .get(apiConfig.BOOKING_API.GET_BY_ID, {
                params: { id: state.data.booking_id }
            })
            .then((value) => {
                const data = value.data;
                console.log(data);
                setBookDetailRow(
                    value.data.booking_details.map((item) => ({
                        id: item.id,
                        service_title: item.product.title,
                        service_price: item.price.price,
                        service_price_final: item.price_final,
                        service_product_received: item.product_recived_title,
                        service_time: item.product.time,
                        staff_name: item.staff.full_name
                    }))
                );
                setCustomerInfo([
                    {
                        label: 'Tên khách hàng',
                        value: data.customer.full_name
                    },
                    {
                        label: 'Số diện thoại',
                        value: data.customer.phone
                    },
                    {
                        label: 'Thư điện tử',
                        value: data.customer.email
                    },
                    {
                        label: 'Địa chỉ',
                        value: data.customer.addresses
                    }
                ]);
                setCarDetailInfo([
                    {
                        label: 'Loại xe',
                        value: data.car_detail.car_info.type
                    },
                    {
                        label: 'Tên xe',
                        value: data.car_detail.car_info.branch
                    },
                    {
                        label: 'Biển số xe',
                        value: data.car_detail.number_plate
                    }
                ]);

                const orderId = uuid();
                const total = data.booking_details.reduce(
                    (partialSum, item) => partialSum + item.price_final,
                    0
                );
                const totalTime = data.booking_details.reduce(
                    (partialSum, item) => partialSum + item.product.time,
                    0
                );
                setOrderSum(total);

                setOrderSumTime(totalTime);
                setOrderCreateDate(data.date_created);
                const orderDetails = data.booking_details.map((item) => {
                    return {
                        type: 'SERVICE',
                        status: 'SERVICE',
                        product_id: item.product.id,
                        price_line_id: item.price.id
                    };
                });
                setOrderPayment({
                    order: {
                        id: orderId,
                        customer_id: data.customer.id,
                        total: total,
                        status: 'SERVICE'
                    },
                    order_details: orderDetails,
                    slot_id: state.data.id
                });

                console.log(orderSumTime);
            });
    }, []);

    console.log(orderPayment);

    const RenderInfoCommon = () => {
        return (
            <Box sx={{ bgcolor: 'background.paper', maxHeight: '400px' }}>
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
                <List sx={{ width: '100%', maxWidth: 360, padding: '14px' }}>
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
        console.log(orderPayment);
        const params = {
            ...orderPayment
        };

        await axios.post(apiConfig.ORDER_API.PAYMENT, params);

        navigate('/booking');
    };

    const bookDetailColumns = [
        { field: 'service_title', headerName: 'Tên dịch vụ', flex: 1 },
        { field: 'service_time', headerName: 'Thời gian xử lý', flex: 1 },
        { field: 'service_price', headerName: 'Đơn giá', flex: 1 },
        // { field: 'service_price', headerName: 'Giá', flex: 1 },
        // { field: 'service_price_final', headerName: 'Thành tiền', flex: 1 },
        {
            headerName: 'Nhân viên',
            field: 'staff_name',
            flex: 1
        },
        { headerName: 'Ghi chú', flex: 1 }
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

    return (
        <Box>
            <Box sx={{ height: 'auto' }}>
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
                                <Grid item xs={12}>
                                    {/* <Button onClick={handlePayment}>Thanh toán</Button> */}
                                    <Button
                                        sx={{ margin: '10px 20px' }}
                                        onClick={handlePayment}
                                        variant="contained"
                                        color="primary"
                                    >
                                        Thanh toán
                                    </Button>
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
                <h3>Danh sách dịch vụ</h3>
                <RenderInfoService />
            </Box>
        </Box>
    );
};

export default BookingDetail;
