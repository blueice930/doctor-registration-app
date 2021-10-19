import React, { useState } from 'react';
import {
  Box, Stepper, Step, StepLabel, Button, Backdrop, CircularProgress,
} from '@mui/material';

import styled from 'styled-components';
import Logo from 'src/assets/img/logo.png';
import ConsultantSelect from './components/registrations/ConsultantSelect';
import Disclaimer from './components/registrations/Disclaimer';
import RegForm from './components/registrations/RegForm';
import Thankyou from './components/registrations/Thankyou';
import { useForm } from './contexts/FormContext';
import { createReservation } from './firebase';
import { useLocale } from './contexts/LocaleTempContext';

const Container = styled.div`
  background-color: #b4b4b4;
  min-height: 1200px;
  height: 100vh;
`;

const InnerContainer = styled.div`
  margin: auto;
  max-width: 700px;
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 0 80px;
  height: calc(100% - 120px);
`;

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TopBar = styled.div`
  color: white;
  padding: 8px 16px;
  background-color: #343a40;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding-left: 20%;
  height: 60px;
  img {
    height: 40px;
    margin-right: 20px;
  }
`;

const FooterBar = styled.div`
  color: white;
  padding: 8px 16px;
  background-color: #343a40;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding-left: 20%;
  height: 60px;
  img {
    height: 40px;
    margin-right: 20px;
  }
`;

const App = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [submitting, setsubmitting] = useState(false);
  const { t, setLocale }: any = useLocale();

  const STEPS = [t('read_disclaimer'), t('select_health_consultant'), t('fill_in_information')];

  const {
    isFormReady, date, time, selectedConsultant, patientName,
    patientNameCN, patientMemberId, isFirstVisit, patientPhone, consultationNumber,
  } = useForm();

  const isBtnDisabled = (activeStep === 2 && !isFormReady())
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
        consultationNumber,
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
      return t('finish');
    }
    if (activeStep < STEPS.length - 1) {
      return t('next');
    }
    return t('refresh');
  };

  return (
    <Container>
      <TopBar>
        <img src={Logo} alt="logo" />
          {t('global_ginseng')}
      </TopBar>
      <InnerContainer>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={submitting}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <StyledHeader>
          <h2>{t('reservation')}</h2>
          <Button sx={{ height: '40px', borderRadius: '4px' }} onClick={setLocale}>中 | En</Button>
        </StyledHeader>
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
                {t('back')}
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
      </InnerContainer>
      <FooterBar>
      </FooterBar>
    </Container>
  );
};

export default App;
