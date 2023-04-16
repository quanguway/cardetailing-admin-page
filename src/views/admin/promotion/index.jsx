import {
    Box,
    Button,
    ButtonBase,
    Drawer,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField
} from '@mui/material';
import TableSimpleLayout from 'layout/TableLayout/TableSimpleLayout';
import { apiConfig } from 'config/app.config';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { IconPlus, IconTrash, IconPencil, IconEye } from '@tabler/icons';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';
import DrawerToggle from 'component/DrawerToggle';
import PerfectScrollbar from 'react-perfect-scrollbar';
import moment from 'moment/moment';
import Row from 'component/TableRow';
import FormSimpleLayout from 'layout/FormLayout/FormSimpleLayout';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import Swal from 'sweetalert2';

const PromotionPage = () => {
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [row, setRow] = useState(null);
    const handleToggle = () => {
        setOpen(!open);
    };

    const columnsShow = ['title', 'description'];

    const columnsChildShow = {
        label: 'promotionLines',
        columns: ['Mã khuyễn mãi', 'Ngày bắt đầu', 'Ngày kết thúc']
    };

    const infoToggle = {
        valueL: ''
    };

    const columns = [
        { field: 'code', headerName: 'Mã bảng KM', flex: 1 },
        { field: 'title', headerName: 'Tiêu đề', flex: 1 },
        { field: 'description', headerName: 'Mô tả', flex: 1 },
        {
            field: 'date_start',
            headerName: 'Ngày bắt đầu',
            flex: 1,
            valueFormatter: (params) =>
                moment(params?.value).format('DD/MM/YYYY')
        },
        {
            field: 'date_end',
            headerName: 'Ngày kết thúc',
            flex: 1,
            valueFormatter: (params) =>
                moment(params?.value).format('DD/MM/YYYY')
        },
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
                        setTitle(params.row.title);
                        setPromotionCode(params.row.code);
                        setStartDate(dayjs(params.row.date_start) ?? '');
                        setEndDate(dayjs(params.row.date_end));
                        setRow(params.row);
                        handleToggle();
                    }}
                    showInMenu
                />,
                <GridActionsCellItem
                    icon={<IconTrash />}
                    label="Xóa"
                    onClick={() => {
                        if (dayjs(params?.row?.date_start).isBefore(dayjs())) {
                            Swal.fire({
                                position: 'top',
                                icon: 'error',
                                html: `<h3>Không thể xóa do bảng giá đã được áp dụng</h3>`,
                                showConfirmButton: false,
                                timerProgressBar: true,
                                timer: 2000
                            });
                        } else {
                            if (confirm('Bạn có chắc muốn xóa ?')) {
                                axios
                                    .delete(apiConfig.PROMOTION_API.DELETE, {
                                        data: { id: params.id }
                                    })
                                    .then(() => {
                                        window.location.reload();
                                    });
                            }
                        }
                    }}
                    showInMenu
                />,
                <GridActionsCellItem
                    icon={<IconPencil />}
                    label="Chỉnh sửa"
                    onClick={() => {
                        if (
                            dayjs(params?.row?.date_end).isAfter(dayjs()) ||
                            dayjs(params?.row?.date_end).isSame(dayjs())
                        ) {
                            navigate('update', {
                                state: {
                                    data: params.row,
                                    mode: 'UPDATE',
                                    api: apiConfig.PROMOTION_API.UPDATE
                                }
                            });
                        } else {
                            Swal.fire({
                                position: 'top',
                                icon: 'error',
                                html: `<h3>Không thể chỉnh sửa bảng khuyến mại hết hiệu lực</h3>`,
                                showConfirmButton: false,
                                timerProgressBar: true,
                                timer: 2000
                            });
                        }
                    }}
                    showInMenu
                />
            ]
        }
    ];

    // useEffect(() => {
    //     console.log(row);
    //     setTitle(row?.title);
    //     setPromotionCode(row?.code);
    //     setStartDate(dayjs(row?.date_start) ?? '');
    //     setEndDate(dayjs(row?.date_end));
    // }, [row]);

    const [promotionCode, setPromotionCode] = useState();
    const [title, setTitle] = useState(row?.title ?? '');
    const [status, setStatus] = useState(
        row?.status ? 'Kích hoạt' : 'Hủy kích hoạt'
    );
    const [startDate, setStartDate] = useState(dayjs(row?.start_date) ?? '');
    const [endDate, setEndDate] = useState(dayjs(row?.end_date) ?? '');

    const fieldPromotion = [
        {
            label: 'Mã bảng khuyến mãi',
            text_active: true,
            useState: [promotionCode, setPromotionCode],
            disabled: true
        },
        {
            label: 'Tiêu đề',
            name: 'title',
            text_active: true,
            useState: [title, setTitle],
            disabled: true
        },

        {
            label: 'Ngày bắt đầu',
            useState: [startDate, setStartDate],
            disabled: true,
            text_active: true,
            type: 'date-picker'
        },
        {
            label: 'Ngày kết thúc',
            useState: [endDate, setEndDate],
            type: 'date-picker',
            text_active: true,
            disabled: true
        },
        {
            label: 'Trạng thái',
            useState: [status, setStatus],
            text_active: true,
            disabled: true
        }
    ];

    return (
        <Box>
            <TableSimpleLayout
                nameButton="Thêm bảng khuyến mãi"
                columns={columns}
                apiGet={apiConfig.PROMOTION_API.GET_ALL}
                handleAddButton={() => navigate('create')}
            />
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
                    {row && (
                        <Box
                            sx={{
                                width: '100%',
                                padding: '20px'
                            }}
                        >
                            <FormSimpleLayout
                                showButton={false}
                                fields={fieldPromotion}
                                isBackgroud={false}
                                nameForm={'Thông tin giảm giá'}
                            />

                            <TableContainer component={Paper}>
                                <Table aria-label="collapsible table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell />
                                            {columnsChildShow.columns.map(
                                                (item) => {
                                                    return (
                                                        <TableCell>
                                                            {item}
                                                        </TableCell>
                                                    );
                                                }
                                            )}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {row.promotionLines.map((item) => (
                                            <Row row={item} />
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                            {/* <Box height={320}>
                                <DataGrid
                                    density="comfortable"
                                    columns={priceLineCols}
                                    rows={row.priceLine ?? []}
                                    sx={{
                                        marginTop: '20px',
                                        borderRadius: '20px',
                                        border: '1px solid #90caf975'
                                    }}
                                />
                            </Box> */}
                        </Box>
                    )}
                </PerfectScrollbar>
            </Drawer>
        </Box>
    );
};

export default PromotionPage;
