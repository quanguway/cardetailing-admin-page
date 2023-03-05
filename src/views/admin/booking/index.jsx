import { Box, Button, ButtonBase, IconButton } from '@mui/material';
import TableSimpleLayout from 'layout/TableLayout/TableSimpleLayout';
import { apiConfig } from 'config/app.config';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { IconPlus, IconTrash, IconPencil, IconEye   } from '@tabler/icons';
import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import axios from 'axios';
import DrawerToggle from 'component/DrawerToggle';



const UnitPage = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [row, setRow] = useState(null);
  const handleToggle = () => {
    setOpen(!open);
  };

      // id?:string
	// status?:string
	// note?: string
	// customer_id?:string
	// date_created?:Date
	// date_updated?:Date
	// user_created?:Date
	// user_updateed?:Date

  const columnsShow = [
    'status',
    'note',
  ]

  const columnsChildShow = {
    label: 'booking_details',
    columns: [
      'status',  
    ]
  }

    const columns = [
        { field: 'status', flex: 1 },
        { field: 'note', flex: 1 },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'actions',
            flex:1,
            getActions: (params) => [
              <GridActionsCellItem
                icon={<IconEye />}
                label="Show"
                onClick={() => {
                  handleToggle()
                  setRow(params.row);
                }}
                showInMenu
              />,
              <GridActionsCellItem
                icon={<IconTrash />}
                label="Delete"
                onClick={() => {
                  if(confirm("Do you want delete this item ?")) {
                        axios.delete(apiConfig.UNIT_API.DELETE, { data: { id: params.id }}).then(() => {
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
                  navigate('form', {state: { data: params.row, mode: 'UPDATE', api: apiConfig.UNIT_API.EDIT }}); 
                }}
                showInMenu
              />,
            ],
        },
    ]

    return (
        <Box>
            <TableSimpleLayout columns={columns} apiGet={apiConfig.BOOKING_API.GET_ALL} />
            <DrawerToggle open={open} handleToggle={handleToggle} data={row} columns={columnsShow} columnChild={columnsChildShow}/>
        </Box>
    );
};

export default UnitPage;
