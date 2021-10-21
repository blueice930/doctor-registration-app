import React, { createContext, useContext, useState } from 'react';

const FormContext = createContext<any>({});

export const useForm = () => useContext(FormContext);

export const FormProvider = ({ children } :any) => {
  const [selectedConsultant, setSelectedConsultant] = useState<any>({});
  const [patientName, setpatientName] = useState('');
  const [patientNameCN, setpatientNameCN] = useState('');
  const [patientMemberId, setpatientMemberId] = useState('');
  const [isFirstVisit, setisFirstVisit] = useState(false);
  const [patientPhone, setpatientPhone] = useState('');
  const [date, setdate] = useState('');
  const [time, settime] = useState('');
  const [consultationNumber, setConsultationNumber] = useState('');
  const [sessions, setsessions] = useState<string[]>([]);

  const isFormReady = () => (isFirstVisit ? (selectedConsultant?.id && patientName
    && patientNameCN && patientPhone && date && time)
    : (selectedConsultant?.id && patientName
     && patientNameCN && patientPhone && date && time && consultationNumber));

  const resetForm = () => {
    setSelectedConsultant({});
    setpatientName('');
    setpatientNameCN('');
    setpatientMemberId('');
    setisFirstVisit(false);
    setpatientPhone('');
    setdate('');
    settime('');
    setConsultationNumber('');
  };

  const resetConsultant = () => {
    setSelectedConsultant({});
    setdate('');
    settime('');
  };

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
    resetForm,
    sessions,
    setsessions,
    resetConsultant,
  };

  return <FormContext.Provider value={value}>
    {children}
  </FormContext.Provider>;
};
