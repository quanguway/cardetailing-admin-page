import { Box, Button, ButtonBase, IconButton } from '@mui/material';
import TableSimpleLayout from 'layout/TableLayout/TableSimpleLayout';
import { apiConfig } from 'config/app.config';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { IconPlus, IconTrash, IconPencil, IconEye   } from '@tabler/icons';
import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import axios from 'axios';
import DrawerToggle from 'component/DrawerToggle';



const OrderPage = () => {
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
    label: 'priceLine',
    columns: [
      'promotion_code', 'start_date', 'end_date', 'max_quantity', 'max_quantity_per_customer', 'max_quantity_per_customer_per_day' 
    ]
  }

  const infoToggle = {
    valueL: ''
  }

    const columns = [
        { field: 'total', flex: 1 },
        { field: 'final_total', flex: 1 },
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
                  console.log(params.row);
                }}
                showInMenu
              />,
            ],
        },
    ]

    return (
        <Box>
            <TableSimpleLayout columns={columns} apiGet={apiConfig.ORDER_API.GET_ALL} handleAddButton={() => navigate('create')} />
            <DrawerToggle width={1000} open={open} handleToggle={handleToggle} data={row} columns={columnsShow} columnChild={columnsChildShow} infoToggle={infoToggle}/>
        </Box>
    );
};

export default OrderPage;
