import {
  Box, Stepper, Step, StepLabel, Button,
} from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import ConsultantSelect from './components/registrations/ConsultantSelect';
import Disclaimer from './components/registrations/Disclaimer';
import RegForm from './components/registrations/RegForm';
import Thankyou from './components/registrations/Thankyou';
import { ConsultantProvider } from './contexts/ConsultantContext';
import { FormProvider, useForm } from './contexts/FormContext';

const Container = styled.div`
  margin: auto;
  max-width: 640px;
  display: flex;
  flex-direction: column;
`;

const STEPS = ['Read Disclaimer', 'Select Health Consultant', 'Fill in Information'];

const App = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const { isFormReady } = useForm();

  const handleNext = () => {
    if (activeStep > 2) {
      setActiveStep(0);
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const renderStepComponent = () => {
    switch (activeStep) {
      case 0:
        return <Disclaimer />;
      case 1:
        return <ConsultantSelect />;
      case 2:
        return <RegForm />;
      default:
        return <Thankyou />;
    }
  };

  const getBtnText = () => {
    if (activeStep === STEPS.length - 1) {
      return 'Finish';
    }
    if (activeStep < STEPS.length - 1) {
      return 'Next';
    }
    return 'Refresh';
  };

  return (
    <Container>
        <h2>Reservation</h2>
        <Box sx={{ width: '100%' }}>
          <Stepper activeStep={activeStep}>
            {STEPS.map((label) => {
              const stepProps: { completed?: boolean } = {};
              const labelProps: {
                optional?: React.ReactNode;
              } = {};
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {renderStepComponent()}
          <React.Fragment>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                variant="outlined"
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={activeStep === STEPS.length - 1 && !isFormReady}
              >
                {getBtnText()}
              </Button>
            </Box>
          </React.Fragment>
        </Box>
    </Container>
  );
};

export default App;
