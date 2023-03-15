import { Box, Button, ButtonBase, IconButton } from '@mui/material';
import TableSimpleLayout from 'layout/TableLayout/TableSimpleLayout';
import { apiConfig } from 'config/app.config';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { IconPlus, IconTrash, IconPencil   } from '@tabler/icons';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useState } from 'react';



const FormChoiceService = ({columns, rows = [], rowSeledted}) => {

    return (
        <Box height={400}>
            <DataGrid
                density='standard'
                columns={serviceColumns}
                rows={serviceRows}
                checkboxSelection
                onSelectionModelChange={(newSelectionModel) => {
                const selectedIDs = new Set(newSelectionModel);
                setServiceRowSelectedIds(newSelectionModel)
                const selectedRows = serviceRows.filter((row) => {
                    console.log(selectedIDs.has(row.id.toString()));
                    return selectedIDs.has(row.id.toString())
                });
                setServiceRowSelected(selectedRows)
                }}
                selectionModel={serviceRowSelectedIds}
            />
        </Box>
    );
};

export default FormChoiceService;
