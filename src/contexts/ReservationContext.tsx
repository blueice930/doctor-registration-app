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

  const getReservationsFnCall = useCallback(async () => {
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
    getReservationsFnCall();
  }, []);

  const value = {
    reservations,
    loading,
    reload: getReservationsFnCall,
  };

  return <ReservationContext.Provider value={value}>
    {children}
  </ReservationContext.Provider>;
};
