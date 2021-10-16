import React, { createContext, useContext, useState } from 'react';
import { Consultant } from 'src/types/consultant';

const ConsultantContext = createContext<any>({});

export const useConsultant = () => useContext(ConsultantContext);

export const ConsultantProvider = ({ children } :any) => {
  const [consultants, setConsultants] = useState<Consultant[]>([]);

  const value = {
    consultants,
  };

  return <ConsultantContext.Provider value={value}>
    {children}
  </ConsultantContext.Provider>;
};
