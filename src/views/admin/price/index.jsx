import {
    Box,
    Button,
    ButtonBase,
    Drawer,
    IconButton,
    TextField
} from '@mui/material';
import TableSimpleLayout from 'layout/TableLayout/TableSimpleLayout';
import { apiConfig } from 'config/app.config';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { IconPlus, IconTrash, IconPencil, IconEye } from '@tabler/icons';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';
import moment from 'moment/moment';
import PerfectScrollbar from 'react-perfect-scrollbar';

const PricePage = () => {
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [row, setRow] = useState(null);
    const handleToggle = () => {
        setOpen(!open);
    };
    console.log(row);

    const columnsShow = ['title', 'start_date', 'end_date'];

    const columnsChildShow = {
        label: 'priceLine',
        columns: ['price', 'is_active']
    };
    const priceLineCols = [
        { field: 'product_title', flex: 1, headerName: 'Tên dịch vụ' },
        { field: 'price', flex: 1, headerName: 'Giá' },
        { field: 'unit_title', flex: 1, headerName: 'Đơn vị' },
        { field: 'is_active', flex: 1, headerName: 'Kích hoạt' }
    ];

    const columns = [
        { field: 'title', flex: 1, headerName: 'Tên bảng giá' },
        {
            field: 'start_date',
            flex: 1,
            headerName: 'Ngày áp dụng',
            valueFormatter: (params) =>
                moment(params?.value).format('DD/MM/YYYY hh:mm A')
        },
        {
            field: 'end_date',
            flex: 1,
            headerName: 'Ngày kết thúc',
            valueFormatter: (params) =>
                moment(params?.value).format('DD/MM/YYYY hh:mm A')
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
                        if (confirm('Bạn có chắc muốn xóa bảng giá này?')) {
                            axios
                                .delete(apiConfig.PRICE_HEADER.DELETE, {
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
                        navigate('update', { state: { data: params.row } });
                    }}
                    showInMenu
                />
            ]
        }
    ];

    const handleAddButton = () => {
        navigate('create');
    };

    return (
        <Box>
            <TableSimpleLayout
                nameButton="Thêm bảng giá"
                columns={columns}
                apiGet={apiConfig.PRICE_HEADER.GET_ALL}
                handleAddButton={handleAddButton}
            />
            {/* <DrawerToggle open={open} handleToggle={handleToggle} data={row} columns={columnsShow} columnChild={columnsChildShow}/> */}

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
                            <Box>
                                <h3>Thông tin bảng giá</h3>
                            </Box>
                            <TextField
                                //helperText="Some important text"
                                sx={{
                                    marginTop: '20px',
                                    '& .MuiInputBase-input.Mui-disabled': {
                                        WebkitTextFillColor: 'black'
                                    }
                                }}
                                variant="outlined"
                                label="Tên Bảng giá"
                                value={row.title}
                                fullWidth={true}
                                disabled={true}
                            />
                            <TextField
                                //helperText="Some important text"
                                sx={{
                                    marginTop: '20px',
                                    '& .MuiInputBase-input.Mui-disabled': {
                                        WebkitTextFillColor: 'black'
                                    }
                                }}
                                variant="outlined"
                                label="Trạng thái"
                                value={
                                    row.is_active
                                        ? 'Đang hoạt động'
                                        : 'Không hoạt động'
                                }
                                fullWidth={true}
                                disabled={true}
                            />
                            <TextField
                                //helperText="Some important text"
                                sx={{
                                    marginTop: '20px',
                                    '& .MuiInputBase-input.Mui-disabled': {
                                        WebkitTextFillColor: 'black'
                                    }
                                }}
                                variant="outlined"
                                label="Thời gian bắt đầu"
                                value={moment(row.start_date).format(
                                    'DD/MM/YYYY hh:mm A'
                                )}
                                fullWidth={true}
                                disabled={true}
                            />
                            <TextField
                                //helperText="Some important text"
                                sx={{
                                    marginTop: '20px',
                                    '& .MuiInputBase-input.Mui-disabled': {
                                        WebkitTextFillColor: 'black'
                                    }
                                }}
                                variant="outlined"
                                label="thời gian kết thúc"
                                value={moment(row.end_date).format(
                                    'DD/MM/YYYY hh:mm A'
                                )}
                                fullWidth={true}
                                disabled={true}
                            />
                            <Box height={320}>
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
                            </Box>
                        </Box>
                    )}
                </PerfectScrollbar>
            </Drawer>
        </Box>
    );
};

export default PricePage;
