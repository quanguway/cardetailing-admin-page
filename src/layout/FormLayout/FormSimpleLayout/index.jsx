import { Autocomplete, Box, Button, ButtonBase, FormControlLabel, FormLabel, IconButton, InputLabel, Radio, RadioGroup, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { FormControl } from '@mui/material';
import axios from 'axios';
import { borderRadius } from '@mui/system';
import FileUpload from 'react-mui-fileuploader';
import InputTypeTree from 'component/InputTypeTree';
import { apiConfig } from 'config/app.config';




export default function FormSimpleLayout({fields, route}) {
    const [isLoading, setLoading] = useState(true);
    const [isError ,setIsError] = useState(false)

    useEffect(() => {
        setLoading(false);
    }, []);
    
    const handleFilesChange = () => {

    }

    const handleSubmit = event => {
        event.preventDefault();
        var params = {};

        fields.forEach(element => {
            if (element.type === 'tree') {
                params[element.name] = [];
                for (let index = 0; index < 4; index++) {
                    params[element.name].push(event.target[element.name+index+""].value)
                }
            } else {
                params[element.name] = event.target[element.name].value
            }

        });
        console.log(params);
        
        
        
        // fetch("https://pointy-gauge.glitch.me/api/form", {
        //   method: "POST",
        //   body: JSON.stringify(data),
        //   headers: {
        //     "Content-Type": "application/json"
        //   }
        // })
        //   .then(response => response.json())
        //   .then(response => console.log("Success:", JSON.stringify(response)))
        //   .catch(error => console.error("Error:", error));
    };

    return (
        <Box>
            <Box 
                component={'form'}
                sx={{
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    padding: '16px',
                    border: '1px solid #90caf975',
                }}
                onSubmit={handleSubmit} >
                <h3>Form</h3>
                {
                    fields.map((item, index) => {
                        switch (item.type) {
                            case 'hidden':
                                return <input key={index} type={'hidden'} name={item.name} value={item.value}/>
                            case 'tree':
                                return (
                                    <InputTypeTree name={item.name} key={index} apiData={item.apiData} listData={item.values} />
                                )
                            case 'file':
                                return item.value ? <img src={item.value} alt={'avatar'}/> : (
                                    <FileUpload
                                        key={index}
                                        multiFile={true}
                                        onFilesChange={handleFilesChange}
                                        onContextReady={(context) => {}}
                                    />
                                )
                            case 'combo':
                                return (
                                    <Autocomplete
                                        key={index}
                                        disablePortal
                                        id="combo-box-demo"
                                        value={{title: item.value}}
                                        getOptionLabel={option => option.title}
                                        options={item.values}
                                        fullWidth={true}
                                        name={item.name}
                                        renderInput={(params) => <TextField name={item.name}  {...params} label={item.label} />}
                                    />
                                )
                            case 'textarea':
                                return (
                                    <TextField
                                        name={item.name}
                                        key={index}
                                        multiline
                                        fullWidth={true}
                                        rows={3}
                                        label={item.label}
                                        value={item.value}
                                        maxRows={5}/>
                                ) 
                            case 'radio':
                                return(
                                    <Box key={index}>
                                        <FormControl>
                                            <FormLabel>{item.label}</FormLabel>
                                            <RadioGroup
                                                defaultValue={item.values[0].value}
                                                name={item.name}
                                            >
                                                {item.values.map((option) => {
                                                    return <FormControlLabel checked={option.value == item.value} value={option.value} control={<Radio />} label={option.value} />
                                                })}
                                            </RadioGroup>
                                        </FormControl><br/>
                                    </Box>
                                )
                            case 'text':
                            default:
                                return (
                                    <TextField
                                        key={index}
                                        error={isError}
                                        helperText="Some important text"
                                        variant="outlined"
                                        label={item.label}
                                        value={item.value}
                                        fullWidth={true}
                                        name={item.name}
                                    />
                                )
                        }
                    })
                }
                <br/>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary">
                    Save
                </Button>
            </Box >
        </Box>
    );
};
