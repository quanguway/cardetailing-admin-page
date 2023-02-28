import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import ProgressAction from './ProgressAction';

export default function TableEditableLayout({columns, rows}) {

    const [rowId, setRowId] = useState(null);
    
    useState(() => {
        columns.push({
            field: 'actions',
            headerName: 'Actions',
            type: 'actions',
            renderCell: (params) => (
              <ProgressAction {...{ params, rowId, setRowId }} />
            ),
        })
    }, [])

    console.log(rows);

    return (
        <Box sx={{
            height: 400,
            width: '100%' }}>
            <DataGrid
                columns={columns}
                rows={rows}
                getRowId={(row) => row.id}
                onCellEditCommit={(params) => setRowId(params.id)}
            />
        </Box>
    )
}