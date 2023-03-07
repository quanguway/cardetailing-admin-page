import { Collapse, Drawer } from "@mui/material"
import PerfectScrollbar from 'react-perfect-scrollbar';
import React, { useState } from 'react';
import { Autocomplete, Box, IconButton, TextField } from '@mui/material';
import FormSimpleLayout from "layout/FormLayout/FormSimpleLayout";
import { Children } from "react";

export default function FormToggleContainer({open, handleToggle, width, anchor, handleSubmit, children}) {

    return (
        <Drawer
                anchor={anchor ?? "right"}
                onClose={handleToggle}
                open={open}
                PaperProps={{
                    sx: {
                        width: width ?? 500
                    }
                }}
            >
                <PerfectScrollbar component="div">
                    {children}
                </PerfectScrollbar>
            </Drawer>
    )
}