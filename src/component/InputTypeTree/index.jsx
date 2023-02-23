import { IconPlus, IconTrash, IconPencil   } from '@tabler/icons';
import { Autocomplete, Box, IconButton, TextField } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

export default function InputTypeTree ({apiData, listData=[], name}) {

    useEffect(() => {
        axios.get(apiData).then((data) => {
            listData[0].setData(data.data)
        })
    },[])

    // useEffect(() => {
    //     listData[0].setData(async () => {
    //         return await (await axios.get(apiData)).data
    //     })
    // }, [])
    
    console.log(listData[0]);

    const clearAllStartAt = async (index, newValue) => {
        for (index; index < listData.length; index++) {
            await listData[index].setData(null);
        }
    }
    return (
        <Box display={'flex'}>
            {
                listData.map((item, index) => {
                    return (
                        item.data ?  
                            <Autocomplete
                                disablePortal
                                clearIcon={false}
                                options={item.data ?? []}
                                getOptionLabel={(option) => option.title} 
                                onChange={async (event, newValue) => {
                                    if(index+1 < listData.length && listData[index+1].data) {
                                        if (newValue.children != listData[index+1].data) {
                                            await clearAllStartAt(index+1);
                                        }
                                    }
                                    newValue.children ? listData[index+1].setData(newValue.children) : ''
                                }}
                                sx={{
                                    width: '200px',
                                    marginRight: '8px',
                                }}
                                renderInput={(params) => <TextField name={name+index+""} {...params} label={item.label} />}
                            />: <></>)
                })
            }
            {listData[listData.length - 2].data ? <TextField name={name+(listData.length - 1)+""} label={listData[listData.length - 1].label}/>: <></>}
            
        </Box >
    )
}