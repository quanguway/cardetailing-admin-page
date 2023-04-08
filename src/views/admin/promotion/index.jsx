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
import FormSimpleLayout from 'layout/FormLayout/FormSimpleLayout';
import dayjs from 'dayjs';
import { useEffect } from 'react';

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

    useEffect(() => {
        setTitle(row?.title)
        setPromotionCode(row?.promotionCode)
        setStartDate(dayjs(row?.startDate) ?? '')
        setEndDate(dayjs(row?.endDate))
    }, [row])

    const [promotionCode, setPromotionCode] = useState();
    const [title, setTitle] = useState(row?.title ?? '');
    const [startDate, setStartDate] = useState(dayjs(row?.date_end) ?? '');
    const [endDate, setEndDate] = useState(dayjs(row?.date_end) ?? '');

    const fieldPromotion = [    
        {
            label: 'Promotion code',
            text_active: true,
            useState: [promotionCode, setPromotionCode],
            disabled: true,
        },
        {
            label: 'Title',
            name: 'title',
            text_active: true,
            useState: [title, setTitle],
            disabled: true,
        },
        
        {
            label: 'Start date',
            useState: [startDate, setStartDate],
            disabled: true,
            type: 'date-picker'
        },
        {
            label: 'End date',
            useState: [endDate, setEndDate],
            type: 'date-picker'
        }
    ]

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
                            
                            <FormSimpleLayout fields={fieldPromotion} isBackgroud={false} nameForm={'Thông tin giảm giá'}/>

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
                                            <Row row={item}/>
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
