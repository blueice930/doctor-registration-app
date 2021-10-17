import React, {
  createContext, useCallback, useContext, useEffect, useState,
} from 'react';
import { getConsultants } from 'src/firebase';
import { Consultant } from 'src/types/consultant';

const ConsultantContext = createContext<any>({});

export const useConsultant = () => useContext(ConsultantContext);

export const ConsultantProvider = ({ children } :any) => {
  const [consultants, setConsultants] = useState<Consultant[]>([]);
  const [loading, setLoading] = useState(true);

  const getConsultantsFnCall = useCallback(async () => {
    try {
      const { data }: { data: any } = await getConsultants();
      const { data: consulData } = data;
      setConsultants(consulData);
      setLoading(false);
    } catch (e: any) {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getConsultantsFnCall();
  }, []);

  const value = {
    consultants,
    loading,
    reload: getConsultantsFnCall,
  };

  return <ConsultantContext.Provider value={value}>
    {children}
  </ConsultantContext.Provider>;
};
