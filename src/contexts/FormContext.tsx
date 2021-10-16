import React, { createContext, useContext, useState } from 'react';

const FormContext = createContext<any>({});

export const useForm = () => useContext(FormContext);

export const FormProvider = ({ children } :any) => {
  const [consultantId, setConsultantId] = useState('');
  const [patientName, setpatientName] = useState('');
  const [patientNameCN, setpatientNameCN] = useState('');
  const [patientMemberId, setpatientMemberId] = useState('');
  const [isFirstVisit, setisFirstVisit] = useState(true);
  const [patientPhone, setpatientPhone] = useState('');
  const [date, setdate] = useState('');
  const [time, settime] = useState('');

  const value = {
    consultantId,
    setConsultantId,
    patientName,
    setpatientName,
    patientNameCN,
    setpatientNameCN,
    patientMemberId,
    setpatientMemberId,
    isFirstVisit,
    setisFirstVisit,
    patientPhone,
    setpatientPhone,
    date,
    setdate,
    time,
    settime,
  };

  return <FormContext.Provider value={value}>
    {children}
  </FormContext.Provider>;
};
