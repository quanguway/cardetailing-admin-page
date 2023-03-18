import { Autocomplete, Box, Button, ButtonBase, Menu, MenuItem, Step, StepLabel, Stepper, TextField, Typography } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { apiConfig } from "config/app.config";
import React, { useState } from "react";
import { useEffect } from 'react';



const HandleBooking = () => {
    
    const steps = ['Chưa xử lý', 'Xe vào chỗ'];
   
    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set());

    const [serviceList, setServiceList] = useState()
    const [staffList, setStaffList] = useState()
    const [serviceRows, setServiceRows] = useState()
    const [serviceRowSelected, setServiceRowSelected] = useState([])
    const [serviceRowSelectedIds, setServiceRowSelectedIds] = useState([])
  
    useEffect(() => {
        axios.get(apiConfig.PRODUCT_API.GET_ALL).then((value) => {
            setServiceRows(value.data);
        });
        axios.get(apiConfig.STAFF_API.GET_ALL).then((value) => {
            const data = value.data.map((item) => ({...item, label: item.full_name}))
            setStaffList(data)
        })
    }, [])
    
    const isStepSkipped = (step) => {
    return skipped.has(step);
    };
    
    const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStep);
    }
    
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
    };

    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
      setActiveStep(0);
    };
  
    const handleConfirmChange = (rowId, newValue) => {
      console.log(newValue);
      const updatedData = serviceRows.map((x) => {
        if (x.id === rowId) {
          return {
            ...x,
            staff: newValue
          };
        }
        return x;
      });
      setServiceRows(updatedData);
    }
  
    const serviceColumns = [
      { field: 'id', headerName: 'Mã dịch vụ', flex: 1 },
      { field: 'title', headerName: 'Tên dịch vụ', flex:1 },
      { field: 'time', headerName: 'Thời gian xử lý', flex: 1 },
      { field: 'price_line', headerName: 'Giá', flex: 1 },
      { 
        field: 'staff', 
        headerName: 'Staff', 
        width: 180, 
        renderCell: (params) => (
          <Autocomplete
            size='small'
            options={staffList}
            value={params.row.customer}
            sx={{ width: 300 }}
            onChange={(event, newValue) => { console.log(params.row); handleConfirmChange(params.row.id, newValue)}}
            renderInput={(params) => <TextField {...params} />}
          />
        ),
      }
    ]

    const ButtonNavigation = () => {
        return (
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}>
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={activeStep === steps.length - 1 ? handleFinish : handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        );
    }

    const RenderStepContent = () => {
        switch (activeStep) {
            case 0:
                return (
                    <Box>
                        <Box height={400}>
                            <DataGrid
                            columns={serviceColumns}
                            rows={serviceRows}
                            checkboxSelection
                            disableSelectionOnClick
                            onSelectionModelChange={(newSelectionModel) => {
                                const selectedIDs = new Set(newSelectionModel);
                                setServiceRowSelectedIds(newSelectionModel)
                                const selectedRows = serviceRows.filter((row) => {
                                    return selectedIDs.has(row.id.toString())
                                });
                                setServiceRowSelected(selectedRows)
                            }}
                            selectionModel={serviceRowSelectedIds}
                            
                            />
                        </Box>
                    </Box>)
            case 1:
                // return <FormChoiceSlot handleClick={(event, item) => handleBooking(event, item)} slots={slots} selectedSlot={[slots, setSlots]} />;
                return <div>asdsdsdasdsd</div>
          case steps.length:
            return <div>asdsdsdasdsd</div>
          default:
            return <div>Not Found</div>;
        }
    }

    
      

    return (
        <Box>
            <Box>

            </Box>
            <Box bgcolor={'white'} borderRadius={2} width={'100%'} minHeight={'88%'}>
                <Stepper activeStep={activeStep}>
                    {steps.map((label, index) => {
                        return (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
                <React.Fragment>
                    <RenderStepContent />
                    <ButtonNavigation />
                </React.Fragment>
                
            </Box>
        </Box>
    )
}

export default HandleBooking;