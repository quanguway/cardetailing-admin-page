import { Box, Button, ButtonBase, IconButton } from '@mui/material';
import TableSimpleLayout from 'layout/TableLayout/TableSimpleLayout';
import { apiConfig } from 'config/app.config';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { IconPlus, IconTrash, IconPencil   } from '@tabler/icons';
import { useNavigate } from "react-router-dom";
import axios from 'axios';


const ProductPage = () => {

  const navigate = useNavigate();

    const columns = [
        { field: 'product_code', headerName: 'code', flex: 1 },
        { field: 'type', flex:1 },
        { field: 'title',flex:1 },
        { field: 'category_paths', headerName: 'category',flex:1 },
        { field: 'image', flex:1, renderCell: (params) => <img alt='avatar' width={100} height={100} src={params.value} /> },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'actions',
            flex:1,
            getActions: (params) => [
              <GridActionsCellItem
                icon={<IconTrash />}
                label="Delete"
                onClick={() => {
                  if(confirm("Do you want delete this item ?")) {
                        axios.delete(apiConfig.PRODUCT_API.DELETE, { data: { id: params.id }}).then(() => {
                            window.location.reload();
                        })
                    }
                }}
                showInMenu
              />,
              <GridActionsCellItem
                icon={<IconPencil />}
                label="Edit"
                onClick={() => {
                  navigate('form', {state: { data: params.row, mode: 'update', api: apiConfig.PRODUCT_API.EDIT }}); 
                }}
                showInMenu
              />,
            ],
        },
    ]

    return (
        <Box>
            <TableSimpleLayout customFields={['gender']} columns={columns} apiGet={apiConfig.PRODUCT_API.GET_ALL} />
        </Box>
    );
};

export default ProductPage;
