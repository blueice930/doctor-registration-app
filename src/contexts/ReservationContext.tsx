import React, {
  createContext, useCallback, useContext, useEffect, useState,
} from 'react';
import { getReservations } from 'src/firebase';
import { Consultant } from 'src/types/consultant';

const ReservationContext = createContext<any>({});

export const useReservation = () => useContext(ReservationContext);

export const ReservationProvider = ({ children } :any) => {
  const [reservations, setReservations] = useState<Consultant[]>([]);
  const [loading, setLoading] = useState(true);

  const getConsultantsFnCall = useCallback(async () => {
    try {
      const { data }: { data: any } = await getReservations();
      const { data: consulData } = data;
      setReservations(consulData);
      setLoading(false);
    } catch (e: any) {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getConsultantsFnCall();
  }, []);

  const value = {
    reservations,
    loading,
    reload: getConsultantsFnCall,
  };

  return <ReservationContext.Provider value={value}>
    {children}
  </ReservationContext.Provider>;
};
