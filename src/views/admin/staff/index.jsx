import { Box, Button, ButtonBase, IconButton } from '@mui/material';
import TableSimpleLayout from 'layout/TableLayout/TableSimpleLayout';
import { apiConfig } from 'config/app.config';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { IconPlus, IconTrash, IconPencil   } from '@tabler/icons';
import { useNavigate } from "react-router-dom";
import axios from 'axios';


const StaffPage = () => {

  const navigate = useNavigate();

    const columns = [
        { field: 'full_name', headerName: 'Full name', flex: 1 },
        { field: 'phone', flex:1 },
        { field: 'email',flex:1 },
        { field: 'gender',flex:1 },
        { field: 'avatar', flex:1, renderCell: (params) => <img alt='avatar' width={100} height={100} src={params.value} /> },
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
                        axios.delete(apiConfig.STAFF_API.DELETE, { data: { id: params.id }}).then(() => {
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
                  navigate('form', {state: params.row}); 
                }}
                showInMenu
              />,
            ],
        },
    ]

    return (
        <Box>
            <TableSimpleLayout customFields={['gender']} columns={columns} apiGet={apiConfig.STAFF_API.GET_ALL} />
        </Box>
    );
};

export default StaffPage;
