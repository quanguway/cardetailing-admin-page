import { Box, Button, ButtonBase, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import {
    DataGrid,
    GridToolbar,
    GridToolbarContainer,
    GridToolbarExport
} from '@mui/x-data-grid';
import axios from 'axios';
import { renderGender } from 'utils/dataToView';
import { useNavigate } from 'react-router-dom';

export default function FormTableLayout({
    setHeightTable,
    nameTable,
    columns,
    rows,
    addButton = true,
    handleAddButton = () => {}
}) {
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
            overflow="auto"
            sx={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '16px',
                border: '1px solid #90caf975',
                marginTop: '10px'
            }}
        >
            <Box display={'flex'} flexDirection="row" alignItems={'center'}>
                <h3>{nameTable ? nameTable : 'Thêm thông tin'}</h3>
                {addButton && (
                    <Button
                        onClick={handleAddButton}
                        variant="contained"
                        color="primary"
                        sx={{ marginLeft: '20px', minWidth: '100px' }}
                    >
                        Thêm
                    </Button>
                )}
            </Box>
            {/* <Box >
                <DataGrid
                    sx={{
                        marginTop: '20px',
                        borderRadius: '20px',
                        border: '1px solid #90caf975'
                    }}
                    density="comfortable"
                    columns={columns}
                    rows={rows}
                />
            </Box> */}
            <DataGrid
                density="comfortable"
                columns={columns}
                rows={rows}
                sx={{
                    marginTop: '20px',
                    borderRadius: '20px',
                    border: '1px solid #90caf975'
                }}
            />
        </Box>
    );
}
