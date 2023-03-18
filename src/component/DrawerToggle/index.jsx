import { Collapse, Drawer } from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import React, { useState } from 'react';
import { Autocomplete, Box, IconButton, TextField } from '@mui/material';
import { TableToggleItem } from './TableToggleItem';

export default function DrawerToggle({
    open,
    handleToggle,
    data,
    columns,
    columnChild,
    width,
    infoToggle,
    anchor
}) {
    return (
        <Drawer
            anchor={anchor ?? 'right'}
            onClose={handleToggle}
            open={open}
            PaperProps={{
                sx: {
                    width: width ?? 500
                }
            }}
        >
            <PerfectScrollbar component="div">
                {data ? (
                    <Box>
                        {columns.map((column) => (
                            <Box display={'flex'}>
                                <p>{column}: </p>
                                <p>{data[column]}</p>
                            </Box>
                        ))}
                        <p>{columnChild.label}</p>
                        <table>
                            <thead>
                                {columnChild.columns.map((column) => (
                                    <th>{column}</th>
                                ))}
                            </thead>
                            <tbody>
                                {data[columnChild.label].map((element) => {
                                    return (
                                        <TableToggleItem
                                            element={element}
                                            columns={columnChild.columns}
                                            infoToggle={infoToggle}
                                        />
                                    );
                                })}
                            </tbody>
                        </table>
                    </Box>
                ) : (
                    <></>
                )}
            </PerfectScrollbar>
        </Drawer>
    );
}
