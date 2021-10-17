import React from 'react';
import App from 'src/App';
import { ConsultantProvider } from './contexts/ConsultantContext';
import { FormProvider } from './contexts/FormContext';

const FormApp = () => (
  <ConsultantProvider>
    <FormProvider>
      <App />
    </FormProvider>
  </ConsultantProvider>
);

export default FormApp;
