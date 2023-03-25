import { Box, Button, ButtonBase, IconButton } from '@mui/material';
import TableSimpleLayout from 'layout/TableLayout/TableSimpleLayout';
import { apiConfig } from 'config/app.config';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { IconPlus, IconTrash, IconPencil } from '@tabler/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const StaffPage = () => {
    const navigate = useNavigate();

    const columns = [
        { field: 'full_name', headerName: 'Họ và tên', flex: 1 },
        { field: 'phone', flex: 1, headerName: 'Số điện thoại' },
        { field: 'email', flex: 1, headerName: 'Thư điện tử' },
        { field: 'gender', flex: 1, headerName: 'Giới tính' },
        { field: 'address_path_title', headerName: 'Địa chỉ', flex: 1 },
        // { field: 'avatar', flex:1, renderCell: (params) => <img alt='avatar' width={100} height={100} src={params.value} /> },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Thao tác',
            flex: 1,
            getActions: (params) => [
                <GridActionsCellItem
                    icon={<IconTrash />}
                    label="Xóa"
                    onClick={() => {
                        if (confirm('Do you want delete this item ?')) {
                            axios
                                .delete(apiConfig.STAFF_API.DELETE, {
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
                        navigate('form', {
                            state: {
                                data: params.row,
                                mode: 'UPDATE',
                                api: apiConfig.STAFF_API.UPDATE
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
            {/* <Button
                onClick={() => {
                    navigate('form', {
                        state: {
                            mode: 'CREATE',
                            api: apiConfig.STAFF_API.CREATE
                        }
                    });
                }}
            >
                Create
            </Button> */}
            <TableSimpleLayout
                customFields={['gender']}
                columns={columns}
                apiGet={apiConfig.STAFF_API.GET_ALL}
                handleAddButton={() => {
                    navigate('form', {
                        state: {
                            mode: 'CREATE',
                            api: apiConfig.STAFF_API.CREATE
                        }
                    });
                }}
            />
        </Box>
    );
};

export default StaffPage;
