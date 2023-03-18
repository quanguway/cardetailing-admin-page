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
import { useNavigate } from 'react-router';

export default function FormSimpleLayout({
    nameButtonSave,
    returnButton,
    nameForm,
    fields,
    mode = 'update' | 'create',
    handleSubmit = () => {},
    children
}) {
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        setLoading(false);
    }, []);

    const handleFilesChange = () => {};

    // const handleSubmit = event => {
    //     event.preventDefault();
    //     var params = {};

    //     fields.forEach(element => {
    //         if (element.type === 'tree') {
    //             params[element.name] = [];
    //             for (let index = 0; index < 4; index++) {
    //                 params[element.name].push(event.target[element.name+index+""].value)
    //             }
    //         } else {
    //             params[element.name] = event.target[element.name].value
    //         }

    //     });
    //     axios.post(api, params);
    // };

    const handleOnchange = (event, setValue) => {
        setValue(event.target.value);
    };

    return (
        <Box>
            <Box
                component={'form'}
                sx={{
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    padding: '16px',
                    border: '1px solid #90caf975'
                }}
            >
                <h3>{nameForm ? nameForm : 'Thêm thông tin'}</h3>
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
                                    sx={{ marginTop: '20px' }}
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
                                            name={item.name}
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
                                    sx={{ marginTop: '20px' }}
                                    key={index}
                                    multiline
                                    fullWidth={true}
                                    rows={3}
                                    label={item.label}
                                    value={item.useState[0]}
                                    onBlur={(event) =>
                                        handleOnchange(event, item.useState[1])
                                    }
                                    maxRows={5}
                                />
                            );
                        case 'radio':
                            return (
                                <Box key={index} sx={{ marginTop: '20px' }}>
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
                                        sx={{
                                            marginTop: '20px',
                                            marginRight: '10px'
                                        }}
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
                                    key={index}
                                    error={isError}
                                    //helperText="Some important text"
                                    sx={{ marginTop: '20px' }}
                                    variant="outlined"
                                    label={item.label}
                                    value={item.useState[0]}
                                    fullWidth={true}
                                    onBlur={(event) => {
                                        item.useState[1](event.target.value);
                                    }}
                                    name={item.name}
                                    disabled={item.disabled ?? false}
                                />
                            );
                    }
                })}                
                <br />
                {children}
                <Box display={'flex'} justifyContent={'right'}>
                    {returnButton && (
                        <Button
                            variant="outlined"
                            color="error"
                            sx={{ marginRight: '20px', minWidth: '100px' }}
                            onClick={() => navigate(-1)}
                        >
                            Quay Lại
                        </Button>
                    )}
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        sx={{ minWidth: '100px' }}
                    >
                        {nameButtonSave ? nameButtonSave : "Lưu"}
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}
