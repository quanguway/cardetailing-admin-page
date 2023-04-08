import { Box, Button, Grid, List, ListItem, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { apiConfig } from 'config/app.config';
import TableSimpleLayout from 'layout/TableLayout/TableSimpleLayout';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { v4 as uuid } from 'uuid';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
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
    const [promotionCanUse, setPromotionCanUse] = useState();

    useEffect(() => {
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
                        service_price: item?.price?.price ?? 0,
                        service_price_final: item.price_final,
                        service_product_received: item.product_recived_title,
                        service_time: item.product.time,
                        staff_name: item?.staff?.full_name ?? '',
                        type: item?.type ?? ''
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
                console.log(data.booking_details);
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
                    console.log(item);
                    return {
                        type: item.type,
                        status: 'SERVICE',
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
                <h3>Danh sách dịch vụ</h3>
                <RenderInfoService />
            </Box>
        </Box>
    );
};

export default BookingDetail;
