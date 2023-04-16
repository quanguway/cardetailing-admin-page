import * as React from 'react';
import {
    Box,
    IconButton,
    TableCell,
    TableRow,
    Typography,
    TableBody,
    Collapse,
    Table,
    TableHead,
    Grid
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import FormSimpleLayout from 'layout/FormLayout/FormSimpleLayout';
import { useState } from 'react';
import dayjs from 'dayjs';
import moment from 'moment';
import { useEffect } from 'react';
import axios from 'axios';
import { apiConfig } from 'config/app.config';

// const rowsDetail = [
//   {
//     value: "promotion_code",
//     label: 'Promotion code'
//   },
//   {
//     value: "title",
//     label: 'Title'
//   }
// ]

export default function Row(props) {
    const { row, rowsDetail } = props;
    const [open, setOpen] = React.useState(false);
    const [promotionCode, setPromotionCode] = useState(row.promotion_code);
    const [title, setTitle] = useState(row.title);
    const [startDate, setStartDate] = useState(dayjs(row.start_date));
    const [endDate, setEndDate] = useState(dayjs(row.end_date));
    const [maxCustomer, setMaxCustomer] = useState(row?.max_customer);
    const [percent, setPercent] = useState(row?.percent);
    const [productBuyId, setProductBuyId] = useState(row?.product_buy?.title);
    const [productReceivedId, setProductReceivedId] = useState(
        row?.product_received?.title
    );
    const [maximumReductionAmount, setMaximumReductionAmount] = useState(
        row?.maximum_reduction_amount
    );
    const [type, setType] = useState(
        row.type === 'CONDITION_PRICE/PRICE'
            ? 'Giảm giá cho hóa đơn 1 số tiền cụ thể'
            : row.type === 'CONDITION_PRODUCT/GET_PRODUCT'
            ? 'Dùng dịch vụ tặng dịch vụ'
            : 'Giảm giá hóa đơn theo %'
    );

    useEffect(() => {
        setPromotionCode(row.promotion_code);
        setTitle(row.title);
        setStartDate(dayjs(row.start_date));
        setEndDate(dayjs(row.end_date));
        setMaxCustomer(row?.max_customer);
        setPercent(row?.percent);
        setProductBuyId(row?.product_buy?.title);
        setProductReceivedId(row?.product_received?.title);
        setMaximumReductionAmount(row?.maximum_reduction_amount);
    }, [row]);

    var rowsShowDetail = [
        {
            label: 'Mã khuyến mãi',
            name: 'promotion_code',
            text_active: true,
            useState: [promotionCode, setPromotionCode],
            disabled: true
        },
        {
            label: 'Tên khuyến mãi',
            text_active: true,
            name: 'title',
            useState: [title, setTitle],
            disabled: true
        },
        {
            text_active: true,
            label: 'Ngày bắt đầu',
            useState: [startDate, setStartDate],
            disabled: dayjs().isAfter(dayjs(startDate)),
            type: 'date-picker'
        },
        {
            label: 'Ngày kết thúc',
            useState: [endDate, setEndDate],
            type: 'date-picker'
        },
        {
            text_active: true,
            label: 'Loại khuyến mại',
            name: 'type',
            useState: [type, setType],
            disabled: true
        }
    ];

    if (row.type === 'CONDITION_PRICE/PRICE') {
        rowsShowDetail = [
            ...rowsShowDetail,
            {
                text_active: true,
                label: 'Số tiền giảm',
                name: 'maximumReductionAmount',
                useState: [maximumReductionAmount, setMaximumReductionAmount],
                disabled: true
            }
        ];
        rowsShowDetail = [
            ...rowsShowDetail,
            {
                text_active: true,
                label: 'Số lượt áp dụng',
                name: 'maxCustomer',
                useState: [maxCustomer, setMaxCustomer],
                disabled: true
            }
        ];
    } else if (row.type === 'CONDITION_PRODUCT/GET_PRODUCT') {
        rowsShowDetail = [
            ...rowsShowDetail,
            {
                text_active: true,
                label: 'Dịch vụ sử dụng',
                name: 'productBuyId',
                useState: [productBuyId, setProductBuyId],
                disabled: true
            }
        ];
        rowsShowDetail = [
            ...rowsShowDetail,
            {
                text_active: true,
                label: 'Dịch vụ được tặng',
                name: 'productReceivedId',
                useState: [productReceivedId, setProductReceivedId],
                disabled: true
            }
        ];
    } else {
        rowsShowDetail = [
            ...rowsShowDetail,
            {
                text_active: true,
                label: '% giảm giá',
                name: 'percent',
                useState: [percent, setPercent],
                disabled: true
            }
        ];
        rowsShowDetail = [
            ...rowsShowDetail,
            {
                text_active: true,
                label: 'Số tiền giảm tối đa',
                name: 'maximumReductionAmount',
                useState: [maximumReductionAmount, setMaximumReductionAmount],
                disabled: true
            }
        ];
    }

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? (
                            <KeyboardArrowUpIcon />
                        ) : (
                            <KeyboardArrowDownIcon />
                        )}
                    </IconButton>
                </TableCell>
                <TableCell>{row.promotion_code}</TableCell>
                <TableCell>
                    {moment(row.start_date).format('DD/MM/YYYY')}
                </TableCell>
                <TableCell>
                    {moment(row.end_date).format('DD/MM/YYYY')}
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={6}
                >
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            {/* <Grid container spacing={2}>
                {rowsDetail.map((item) => (
                  < >
                    <Grid item xs={4}>
                      <h4>{item.label}:</h4>
                    </Grid>
                    <Grid item xs={8}>
                      <p>{row[item.value]}</p>
                    </Grid>
                  </>
                ))}
              </Grid> */}
                            <FormSimpleLayout
                                fields={rowsShowDetail}
                                isBackgroud={false}
                                nameForm={'Thông tin các giảm giá'}
                                nameButtonSave={'Lưu chi tiết giảm giá'}
                            />
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}
