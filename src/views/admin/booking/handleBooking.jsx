import { Box, Button, ButtonBase, Menu, MenuItem, Step, StepLabel, Stepper, Typography } from "@mui/material"
import React from "react";
import FormChoiceSlot from "./formChoiceSlot";


const steps = ['Chưa xử lý', 'Xe vào chỗ']

export default function HandleBooking() {
    
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());

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
                // return <FormChoiceSlot handleClick={(event, item) => handleBooking(event, item)} slots={slots} selectedSlot={[slots, setSlots]} />;
                return <div>asdsdsdasdsd</div>
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