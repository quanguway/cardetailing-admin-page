import {
    Autocomplete,
    Box,
    Button,
    ButtonBase,
    FormControlLabel,
    FormLabel,
    IconButton,
    InputLabel,
    Radio,
    RadioGroup,
    TextField
} from '@mui/material';
import { useEffect, useState } from 'react';
import { FormControl } from '@mui/material';
import axios from 'axios';
import { borderRadius } from '@mui/system';
import FileUpload from 'react-mui-fileuploader';
import InputTypeTree from 'component/InputTypeTree';
import { apiConfig } from 'config/app.config';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import InputTypeTreeSimple from 'component/InputTreeSimple';

export default function FormSimpleLayoutV2({
    fields,
    mode = 'update' | 'create',
    handleSubmit = () => {},
    label,
    children
}) {
    const [isLoading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        setLoading(false);
    }, []);

    const handleFilesChange = () => {};

    // const handleChangeTextfield = (event) => {
    //     event
    //     item.useState[1](event.target.value)
    // }

    const [text, setText] = useState();

    const handleOnchange = (event, setValue) => {
        setValue(event.target.value);
    };

    return (
        <Box px={3}>
            <Box component={'form'}>
                <h2>{label}</h2>
                {children}
                {fields.map((item, index) => {
                    switch (item.type) {
                        case 'hidden':
                            return (
                                <input
                                    key={index}
                                    type={'hidden'}
                                    name={item.name}
                                    value={item.value}
                                />
                            );
                        case 'tree':
                            return (
                                <InputTypeTree
                                    key={index}
                                    useStateValue={item.useState}
                                    labels={item.labels}
                                />
                            );
                        case 'tree-simple':
                            return (
                                <InputTypeTreeSimple
                                    lengthItem={item.lengthItem}
                                    useStateValue={item.useState}
                                    labels={item.labels}
                                />
                            );
                        case 'file':
                            return item.value ? (
                                <img src={item.value} alt={'avatar'} />
                            ) : (
                                <FileUpload
                                    key={index}
                                    multiFile={true}
                                    onFilesChange={handleFilesChange}
                                    onContextReady={(context) => {}}
                                />
                            );
                        case 'combo':
                            return (
                                <Autocomplete
                                    sx={{ marginY: '8px' }}
                                    key={index}
                                    disablePortal
                                    id="combo-box-demo"
                                    value={{
                                        title: item.useState[0]?.title ?? ''
                                    }}
                                    getOptionLabel={(option) =>
                                        option?.title ?? ''
                                    }
                                    options={item.values ?? []}
                                    fullWidth={true}
                                    disabled={item.disabled ?? false}
                                    onChange={(event, newValue) => {
                                        item.useState[1](newValue);
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            // helperText="Some important text"
                                            {...params}
                                            label={item.label}
                                        />
                                    )}
                                />
                            );
                        case 'combo-multiple':
                            return (
                                <Autocomplete
                                    key={index}
                                    id="combo-box-demo"
                                    value={{
                                        title: item.useState[0]?.title ?? ''
                                    }}
                                    getOptionLabel={(option) =>
                                        option?.title ?? ''
                                    }
                                    options={item.values ?? []}
                                    fullWidth={true}
                                    disabled={item.disabled ?? false}
                                    onChange={(event, newValue) => {
                                        item.useState[1](newValue);
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label={item.label}
                                        />
                                    )}
                                />
                            );
                        case 'textarea':
                            return (
                                <TextField
                                    key="dasdasd"
                                    multiline
                                    fullWidth={true}
                                    rows={3}
                                    label={item.label}
                                    defaultValue={item.useState[0]}
                                    onBlur={(event) =>
                                        handleOnchange(event, item.useState[1])
                                    }
                                    maxRows={5}
                                    sx={{marginTop: "10px"}}
                                />
                            );
                        case 'radio':
                            return (
                                <Box key={index}>
                                    <FormControl>
                                        <FormLabel>{item.label}</FormLabel>
                                        <RadioGroup
                                            value={item.useState[0]}
                                            onChange={(event) =>
                                                handleOnchange(
                                                    event,
                                                    item.useState[1]
                                                )
                                            }
                                        >
                                            {item.values.map((option) => {
                                                return (
                                                    <FormControlLabel
                                                        value={option.value}
                                                        disabled={
                                                            option.disabled ??
                                                            false
                                                        }
                                                        control={<Radio />}
                                                        label={option.value}
                                                    />
                                                );
                                            })}
                                        </RadioGroup>
                                    </FormControl>
                                    <br />
                                </Box>
                            );
                        case 'date-picker':
                            return (
                                <LocalizationProvider
                                    dateAdapter={AdapterDayjs}
                                >
                                    <DatePicker
                                        disabled={item.disabled ?? false}
                                        label={item.label}
                                        defaultValue={item.useState[0]}
                                        onChange={(event) =>
                                            item.useState[1](event)
                                        }
                                    />
                                </LocalizationProvider>
                            );
                        case 'text':
                        default:
                            return (
                                <TextField
                                    sx={{ marginY: '8px' }}
                                    key={index}
                                    error={isError}
                                    // helperText="Some important text"
                                    variant="outlined"
                                    label={item.label}
                                    defaultValue={item.useState[0]}
                                    fullWidth={true}
                                    onBlur={(event) =>
                                        handleOnchange(event, item.useState[1])
                                    }
                                    disabled={item.disabled ?? false}
                                />
                            );
                    }
                })}
            </Box>
        </Box>
    );
}
