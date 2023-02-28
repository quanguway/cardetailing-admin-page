import { Collapse, IconButton } from "@mui/material"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import React, { useState } from 'react';


export function TableToggleItem ({element, columns}) {
    const [openToggleData, setOpenToggleData] = useState(false)
    console.log("dasd" + element);
    console.log("cols" + columns);
    return (
        <>
            <tr>
                {columns.map((column) => (
                <td>{element[column]}</td>))}
                <td>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpenToggleData(!openToggleData)}
                    >
                        {openToggleData ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </td> 
            </tr>
            <Collapse in={openToggleData} timeout="auto" unmountOnExit>
                dasdasdwdsdasd
            </Collapse >
        </>
    )
} 