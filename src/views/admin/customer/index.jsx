import { Box, Button, ButtonBase, IconButton } from '@mui/material';
import TableSimpleLayout from 'layout/TableLayout/TableSimpleLayout';
import { apiConfig } from 'config/app.config';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { IconPlus, IconTrash, IconPencil } from '@tabler/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';

const CustomerPage = () => {
    const navigate = useNavigate();

    const columns = [
        //{ field: 'avatar', headerName: 'code', flex: 1 },
        { field: 'full_name', flex: 1, headerName: 'Tên khách hàng' },
        // { field: 'type', flex:1, headerName: "Loại"  },
        { field: 'phone', flex: 1, headerName: 'Số điện thoại' },
        { field: 'email', flex: 1, headerName: 'Thư điện tử' },
        { field: 'gender', flex: 1, headerName: 'Giới tính' },
        { field: 'address_path_title', flex: 1, headerName: 'Địa chỉ' },
        // { field: 'image', flex:1, renderCell: (params) => <img alt='avatar' width={100} height={100} src={params.value} /> },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Thao tác',
            flex: 1,
            getActions: (params) => [
                <GridActionsCellItem
                    icon={<IconPencil />}
                    label="Chỉnh sửa"
                    onClick={() => {
                        navigate('update', {
                            state: {
                                data: params.row,
                                api: apiConfig.CUSTOMER_API.UPDATE
                            }
                        });
                    }}
                    showInMenu
                />
            ]
        }
    ];

    return (
        <Box>
            <TableSimpleLayout
                apiGet={apiConfig.CUSTOMER_API.GET_ALL}
                customFields={['gender']}
                columns={columns}
                // handleAddButton={() => navigate('create')}
                disableButton={true}
            />
        </Box>
    );
};

export default CustomerPage;
