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

  const columnsShow = [
    'title',
    'description' 
  ]

  const columnsChildShow = {
    label: 'unitExchanges',
    columns: [
      'allow_sale', 'is_active', 'is_base_unit', 'is_report', 'value', 
    ]
  }

    const columns = [
        { field: 'title', flex: 1 },
        { field: 'description', flex: 1 },
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
            <TableSimpleLayout columns={columns} apiGet={apiConfig.UNIT_API.GET_ALL} handleAddButton={() => navigate('create')} />
            <DrawerToggle open={open} handleToggle={handleToggle} data={row} columns={columnsShow} columnChild={columnsChildShow}/>
        </Box>
    );
};

export default UnitPage;
