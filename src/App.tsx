import React, { useState } from 'react';
import {
  Box, Stepper, Step, StepLabel, Button, Backdrop, CircularProgress,
} from '@mui/material';
import { isEmpty } from 'lodash';
import styled from 'styled-components';
import ConsultantSelect from './components/registrations/ConsultantSelect';
import Disclaimer from './components/registrations/Disclaimer';
import RegForm from './components/registrations/RegForm';
import Thankyou from './components/registrations/Thankyou';
import { ConsultantProvider } from './contexts/ConsultantContext';
import { FormProvider, useForm } from './contexts/FormContext';
import { createReservation } from './firebase';

const Container = styled.div`
  margin: auto;
  max-width: 640px;
  display: flex;
  flex-direction: column;
`;

const STEPS = ['Read Disclaimer', 'Select Health Consultant', 'Fill in Information'];

const App = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [submitting, setsubmitting] = useState(false);
  const {
    isFormReady, date, time, selectedConsultant, patientName,
    patientNameCN, patientMemberId, isFirstVisit, patientPhone,
  } = useForm();

  const isBtnDisabled = (activeStep === 2 && !isFormReady)
  || (activeStep === 1 && !(selectedConsultant?.id && date && time));

  const handleNext = async () => {
    if (activeStep === 2) {
      setsubmitting(true);
      await createReservation({
        consultantId: selectedConsultant?.id,
        patientName,
        patientNameCN,
        patientMemberId,
        isFirstVisit,
        patientPhone,
        date,
        startTime: time,
        duration: selectedConsultant?.timeslots?.duration,
      });
      setsubmitting(false);
    }
    if (activeStep > 2) {
      window.location.reload();
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
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={submitting}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
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
                disabled={activeStep === 0 || activeStep === 3}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={isBtnDisabled}
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
