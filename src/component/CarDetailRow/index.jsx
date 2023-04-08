import { Box, Collapse, Grid, IconButton } from "@mui/material";
import PerfectScrollbar from 'react-perfect-scrollbar';
import FormSimpleLayout from 'layout/FormLayout/FormSimpleLayout';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import React from "react";

export default function CarDetailRow({row}) {
    const [openCollapse, setOpenCollapse] = React.useState(false);

    console.log(row);

    return (
        <>
            <Box display={'flex'} justifyContent={'space-between'} px={1} borderBottom={'1px solid lightgrey'}>
                <h3>Number Plate: {row?.number_plate} </h3>

                <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => setOpenCollapse(!openCollapse)}
                    >
                    {openCollapse ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
                
            </Box>
            <Collapse in={openCollapse} timeout="auto" unmountOnExit>
                <Box sx={{ margin: 1 }}>
                <Grid container>
                    <Grid item xs={4}>
                        <h3>Branch: </h3>
                    </Grid>
                    <Grid item xs={8}>
                    <p>{row?.car_info.branch}</p>
                    </Grid>
                    <Grid item xs={4}>
                        <h3>Type: </h3>
                    </Grid>
                    <Grid item xs={8}>
                        <p>{row?.car_info.type}</p>
                    </Grid>
                </Grid>
                </Box>
            </Collapse>
        </>
    );
}