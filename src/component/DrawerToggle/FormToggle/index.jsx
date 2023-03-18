import { Collapse, Drawer } from "@mui/material"
import PerfectScrollbar from 'react-perfect-scrollbar';
import React, { useState } from 'react';
import { Autocomplete, Box, IconButton, TextField } from '@mui/material';
import FormSimpleLayout from "layout/FormLayout/FormSimpleLayout";

export default function FormToggle({open, handleToggle, fields, width, anchor, mode, api, handleSubmit, children}) {

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
                    <FormSimpleLayout mode={mode} fields={fields} api={api} handleSubmit={handleSubmit} nameForm= "Thêm đơn giá dịch vụ" />
                    {children}
                </PerfectScrollbar>
            </Drawer>
    )
}