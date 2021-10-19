import React, { createContext, useContext, useState } from 'react';

const FormContext = createContext<any>({});

export const useForm = () => useContext(FormContext);

export const FormProvider = ({ children } :any) => {
  const [selectedConsultant, setSelectedConsultant] = useState<any>({});
  const [patientName, setpatientName] = useState('');
  const [patientNameCN, setpatientNameCN] = useState('');
  const [patientMemberId, setpatientMemberId] = useState('');
  const [isFirstVisit, setisFirstVisit] = useState(true);
  const [patientPhone, setpatientPhone] = useState('');
  const [date, setdate] = useState('');
  const [time, settime] = useState('');
  const [consultationNumber, setConsultationNumber] = useState('');
  const [isAppOn, setIsAppOn] = useState(true);

  const isFormReady = () => (isFirstVisit ? (selectedConsultant?.id && patientName
    && patientNameCN && patientPhone && date && time)
    : (selectedConsultant?.id && patientName
     && patientNameCN && patientPhone && date && time && consultationNumber));

  const value = {
    selectedConsultant,
    setSelectedConsultant,
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
    isFormReady,
    consultationNumber,
    setConsultationNumber,
    isAppOn,
    setIsAppOn,
  };

  return <FormContext.Provider value={value}>
    {children}
  </FormContext.Provider>;
};
