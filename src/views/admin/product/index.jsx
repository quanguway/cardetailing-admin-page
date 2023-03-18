import { Box, Button, ButtonBase, IconButton } from '@mui/material';
import TableSimpleLayout from 'layout/TableLayout/TableSimpleLayout';
import { apiConfig } from 'config/app.config';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { IconPlus, IconTrash, IconPencil } from '@tabler/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductPage = () => {
    const navigate = useNavigate();

    const columns = [
        // { field: 'product_code', headerName: 'code', flex: 1 },
        { field: 'title', flex: 1, headerName: 'Tên dịch vụ' },
        // { field: 'type', flex:1, headerName: "Loại"  },
        { field: 'category_paths', flex: 1, headerName: 'Loại' },
        { field: 'time', flex: 1, headerName: 'Thời gian dự kiến (phút)' },
        { field: 'description', flex: 1, headerName: 'Mô tả' },
        // { field: 'image', flex:1, renderCell: (params) => <img alt='avatar' width={100} height={100} src={params.value} /> },
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
                                .delete(apiConfig.PRODUCT_API.DELETE, {
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
                    label="Sửa"
                    onClick={() => {
                        navigate('update', { state: { data: params.row } });
                    }}
                    showInMenu
                />
            ]
        }
    ];

    return (
        <Box>
            <TableSimpleLayout
                apiGet={apiConfig.PRODUCT_API.GET_ALL}
                customFields={['gender']}
                columns={columns}
                handleAddButton={() => navigate('create')}
                nameButton="Thêm dịch vụ"
            />
        </Box>
    );
};

export default ProductPage;
