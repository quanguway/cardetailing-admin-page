import { Box, Button, ButtonBase, Drawer, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
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
        columns: [
            'promotion_code',
            'start_date',
            'end_date'
        ]
    };

    const infoToggle = {
        valueL: ''
    };

    const columns = [
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
                    label="Show"
                    onClick={() => {
                        handleToggle();
                        setRow(params.row);
                    }}
                    showInMenu
                />,
                <GridActionsCellItem
                    icon={<IconTrash />}
                    label="Delete"
                    onClick={() => {
                        if (confirm('Bạn có chắc muốn xóa ?')) {
                            axios
                                .delete(apiConfig.PROMOTION_API.DELETE, {
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
                    label="Edit"
                    onClick={() => {
                        navigate('form', {
                            state: {
                                data: params.row,
                                mode: 'UPDATE',
                                api: apiConfig.PROMOTION_API.UPDATE
                            }
                        });
                    }}
                    showInMenu
                />
            ]
        }
    ];

    console.log(row);

    return (
        <Box>
            <TableSimpleLayout
                nameButton="Thêm bảng khuyến mãi"
                columns={columns}
                apiGet={apiConfig.PROMOTION_API.GET_ALL}
                handleAddButton={() => navigate('create')}
            />
            {/* <DrawerToggle
                width={1000}
                open={open}
                handleToggle={handleToggle}
                data={row}
                columns={columnsShow}
                columnChild={columnsChildShow}
                infoToggle={infoToggle}
            /> */}
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
                                <h3>Thông tin giảm giá</h3>
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
                                label="Tiêu đề giảm giá"
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
                                    row.status
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
                                label="Mô tả"
                                value={row.description}
                                rows={3}
                                fullWidth={true}
                                disabled={true}
                            />

                            <TableContainer component={Paper}>
                                <Table aria-label="collapsible table">
                                    <TableHead>
                                    <TableRow>
                                        <TableCell />
                                        {columnsChildShow.columns.map((item) => {
                                            return (
                                                <TableCell>{item}</TableCell>
                                            )
                                        })}
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
