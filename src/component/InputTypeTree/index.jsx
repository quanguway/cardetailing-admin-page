import { IconPlus, IconTrash, IconPencil   } from '@tabler/icons';
import { Autocomplete, Box, IconButton, TextField } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import { v4 as uuid } from 'uuid';


export default function InputTypeTree ({useStateValue, name, labels, helper, isError}) {

    // const [data, useStateValue] = useState(useStateValue[0]);

    // useEffect(() => {
    //     useStateValue[1(useStateValue[0])
    // })

    // useEffect(() => {
    //     useStateValue[1](data)
    // },[data])

    const handleChange = (newValue, indexFrom) => {
        const dataDeleted = useStateValue[0].filter((value, index) => index < indexFrom );
        useStateValue[1]([...dataDeleted, newValue])
    }

    return (
        <Box display={'flex'} sx={{marginTop: "20px"}}>
            {(useStateValue[0] ?? []).length != 0 ? useStateValue[0].map((value, index) => {
                return index < 3 ? (
                    useStateValue[0][index+1] ? 
                        <Autocomplete
                            disablePortal
                            disableClearable
                            
                            sx={{width: '200px', marginRight: "10px"}}
                            value={{title: useStateValue[0][index+1]?.title}}
                            getOptionLabel={option => option?.title}
                            options={useStateValue[0][index].children ?? []}
                            name={name}
                            onChange = {
                                (event, newValue) => {
                                    handleChange(newValue, index+1)
                                }
                            }
                            renderInput={(params) => <TextField {...params} label={labels[index]} />}
                        />
                        :<Autocomplete
                            disablePortal
                            disableClearable
                            getOptionLabel={option => option?.title}
                            options={useStateValue[0][index].children ?? []}
                            name={name}
                            sx={{width: '200px'}}
                            onChange = {
                                (event, newValue) => {
                                    handleChange(newValue, index+1)
                                }
                            }
                            renderInput={(params) => <TextField error={isError} helperText={helper} {...params} label={labels[index]} />}
                    />): index < 4 ? <TextField defaultValue={useStateValue[0][index+1]?.title ?? ""} label={labels[index]} onBlur={(event) => handleChange({id: uuid(),level: index+1 , title: event.target.value, parent_id: useStateValue[0][index].id} ,index+1)} /> : <></>
            }): <></>}
        </Box >
    )
}