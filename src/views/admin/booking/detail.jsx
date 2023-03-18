import { Box, Button, Grid, List, ListItem, Typography, } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { apiConfig } from 'config/app.config';
import TableSimpleLayout from 'layout/TableLayout/TableSimpleLayout';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';

const BookingDetail = () => {

    const { state } = useLocation();
    const navigate = useNavigate();

    const [listInfo, setListInfo] = useState([]);
    const [customerInfo, setCustomerInfo] = useState([]);
    const [carDetailInfo, setCarDetailInfo] = useState([])
    const [bookDetailRow, setBookDetailRow] = useState([]);

    useEffect(() => {
        axios.get(apiConfig.BOOKING_API.GET_BY_ID, {params:{id: state.data.booking_id}}).then((value) => {
            const data = value.data;
            console.log(data);
            setBookDetailRow(value.data.booking_details.map((item) => ({
                id: item.id,
                service_title: item.product.title,
                service_price: item.price.price,
                service_time: item.product.time,
                staff_name: item.staff.full_name,
            }))) ;
            setCustomerInfo([
                {
                    'label': 'Tên khách hàng',
                    'value': data.customer.full_name
                },
                {
                    'label': 'Số diện thoại',
                    'value': data.customer.phone
                }
            ]);
            setCarDetailInfo([
                {
                    'label': 'Tên xe',
                    'value': data.car_detail.car_info.branch,
                },
                {
                    'label': 'Biển số xe',
                    'value': data.car_detail.number_plate,
                },
            ])
            console.log(customerInfo);
        })
    },[])

    const RenderInfoCommon = () => {
        return (
            <Box sx={{bgcolor: 'background.paper'}}>
                <List sx={{ width: '100%', maxWidth: 360 }}>
                    <h2>Khách hàng</h2> 
                    {customerInfo.map((item) => (
                        <ListItem sx={{display: 'flex' }}>
                            <Grid container>
                                <Grid item xs={4}>
                                    <Typography>{item.label} :</Typography>
                                </Grid >   
                                <Grid item xs={8}>
                                    <Typography>{item.value}</Typography>
                                </Grid > 
                            </Grid>
                        </ListItem>
                    ))}
                </List>
                <List sx={{ width: '100%', maxWidth: 360 }}>
                    <h2>Thông tin xe</h2> 
                    {carDetailInfo.map((item) => (
                        <ListItem sx={{display: 'flex' }}>
                            <Grid container>
                                <Grid item xs={4}>
                                    <Typography>{item.label} :</Typography>
                                </Grid >   
                                <Grid item xs={8}>
                                    <Typography>{item.value}</Typography>
                                </Grid > 
                            </Grid>
                        </ListItem>
                    ))}
                </List>
            </Box>
        )
    }

    const bookDetailColumns = [
        { field: 'service_title', headerName: 'Tên dịch vụ', flex:1 },
        { field: 'service_time', headerName: 'Thời gian xử lý', flex: 1 },
        { field: 'service_price', headerName: 'Giá', flex: 1 },
        { 
            field: 'staff_name', 
            flex: 1,
        }

    ];

    const RenderInfoService = () => {
        return (
            <Box sx={{bgcolor: 'background.paper'}}>
                <Box height={400}>
                    <DataGrid
                    columns={bookDetailColumns}
                    rows={bookDetailRow}
                    disableSelectionOnClick

                    />
                </Box>
            </Box>
        )
    }

    return (
        <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={6}>
                <RenderInfoCommon />
            </Grid>
            <Grid item xs={6}>
                <RenderInfoService />
            </Grid>
        </Grid >
    );
}

export default BookingDetail