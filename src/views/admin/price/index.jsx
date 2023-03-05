import { Box, Button, ButtonBase, IconButton } from '@mui/material';
import TableSimpleLayout from 'layout/TableLayout/TableSimpleLayout';
import { apiConfig } from 'config/app.config';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { IconPlus, IconTrash, IconPencil, IconEye   } from '@tabler/icons';
import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import axios from 'axios';
import DrawerToggle from 'component/DrawerToggle';
import moment from 'moment/moment';



const PricePage = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [row, setRow] = useState(null);
  const handleToggle = () => {
    setOpen(!open);
  };

  const columnsShow = [
    'title',
    'start_date',
    'end_date' 
  ]

  const columnsChildShow = {
    label: 'priceLine',
    columns: [
        'price', 'is_active'
    ]
  }

    const columns = [
        { field: 'title', flex: 1 },
        { field: 'start_date', flex: 1, valueFormatter: params => 
            moment(params?.value).format("DD/MM/YYYY hh:mm"), },
        { field: 'end_date', flex: 1,valueFormatter: params => moment(params?.value).format("DD/MM/YYYY hh:mm"), },
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
                        axios.delete(apiConfig.PRICE_HEADER.DELETE, { data: { id: params.id }}).then(() => {
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
                  navigate('update', {state: { data: params.row }}); 
                }}
                showInMenu
              />,
            ],
        },
    ]

    const handleAddButton = () => {
      navigate('create');
    }

    return (
        <Box>
            <TableSimpleLayout columns={columns} apiGet={apiConfig.PRICE_HEADER.GET_ALL} handleAddButton={handleAddButton}/>
            <DrawerToggle open={open} handleToggle={handleToggle} data={row} columns={columnsShow} columnChild={columnsChildShow}/>
        </Box>
    );
};

export default PricePage;
