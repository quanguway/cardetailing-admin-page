import { Box, Button, ButtonBase, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import { DataGrid, GridToolbar, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import axios from 'axios';
import { renderGender } from 'utils/dataToView';
import { useNavigate } from "react-router-dom";



export default function FormTableLayout({columns , rows, customFields = undefined}) {
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, []);



    return (
        <Box 
            height={400} 
            width={'100%'} 
            backgroundColor={'white'}
            borderRadius={5}
            >
            <DataGrid
                density='comfortable'
                columns={columns}
                rows={rows}
                sx={{borderRadius : "20px", border: '1px solid #90caf975'}}
            />
            
        </Box>
    );
};
