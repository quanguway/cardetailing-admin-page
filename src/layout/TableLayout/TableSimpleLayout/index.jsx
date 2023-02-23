import { Box, Button, ButtonBase, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import { DataGrid, GridToolbar, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import axios from 'axios';
import { renderGender } from 'utils/dataToView';
import { useNavigate } from "react-router-dom";



export default function TableSimpleLayout({columns ,apiGet, customFields = undefined, handleDelete, handleEdit}) {
    const [isLoading, setLoading] = useState(true);
    const [rows, setRows] = useState([]);

    useEffect(() => {
        setLoading(false);
    }, []);

    // const handleDelete = (id, apiDelete) => {
    //     if(confirm("Do you want delete this item ?")) {
    //         axios.delete(apiDelete, { data: { id }}).then(() => {
    //             window.location.reload();
    //         })
    //     }
    // }
    
    
    
    // const handleEdit = (id, directURL) => {
    //     const navigate = useNavigate();
    //     navigate(directURL);
    // }

    useEffect(() => {
        axios.get(apiGet).then((data) => {

            let dataRows = data.data;

            if(customFields != undefined) {
                customFields.forEach(customField => {
                    switch (customField) {
                        case 'gender':
                            dataRows = dataRows.map((value) => {return {...value, gender: renderGender(value.gender)}});
                            break;
                        default:
                            break;
                    }
                });
            }

            console.log(dataRows);

            setRows(dataRows);
        })
    },[])

    console.log(rows);
    

    return (
        <Box 
            height={600} 
            width={'100%'} 
            backgroundColor={'white'}
            borderRadius={1}
            >
            <DataGrid
                density='comfortable'
                columns={columns}
                rows={rows}
            />
        </Box>
    );
};
