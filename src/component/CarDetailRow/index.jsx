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
                        <h3>Hãng xe: </h3>
                    </Grid>
                    <Grid item xs={8}>
                    <p>{row?.car_info.title}</p>
                    </Grid>
                    <Grid item xs={4}>
                        <h3>Dòng xe: </h3>
                    </Grid>
                    <Grid item xs={8}>
                    <p>{row?.car_info.model}</p>
                    </Grid>
                    <Grid item xs={4}>
                        <h3>Số chỗ ngồi: </h3>
                    </Grid>
                    <Grid item xs={8}>
                        <p>{row?.car_info.number_of_seats}</p>
                    </Grid>
                    <Grid item xs={4}>
                        <h3>Màu: </h3>
                    </Grid>
                    <Grid item xs={8}>
                        <p>{row?.color}</p>
                    </Grid>
                </Grid>
                </Box>
            </Collapse>
        </>
    );
}