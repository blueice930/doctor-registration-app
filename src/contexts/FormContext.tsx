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
  const [isAppOn, setIsAppOn] = useState(true);

  const isFormReady = (selectedConsultant?.id && patientName
     && patientNameCN && patientPhone && date && time);

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
    isAppOn,
    setIsAppOn,
  };

  return <FormContext.Provider value={value}>
    {children}
  </FormContext.Provider>;
};
