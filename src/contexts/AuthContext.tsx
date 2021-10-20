import React, { useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Loading from 'src/components/Loading';
import { isPublicRoute } from 'src/routes/Routes';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, getAppAvailability, getConfigs } from 'src/firebase';

const AuthContext = React.createContext<any>({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children } : any) => {
  const [currUser, setCurrUser] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(true);
  const [isAppOn, setIsAppOn] = useState(true);
  const [appStartDays, setAppStartDays] = useState([]);
  const [appStartTime, setAppStartTime] = useState('');
  const [appEndTime, setAppEndTime] = useState('');
  const { pathname } = useLocation();

  const login = async (email: string, password: string) => {
    const res = await signInWithEmailAndPassword(auth, email, password);
    return res;
  };

  const logout = async () => {
    await auth.signOut();
    setCurrUser(undefined);
  };

  const asyncFetch = async () => {
    if (isPublicRoute(pathname)) {
      setLoading(false);
    }
    setFetching(true);
    const { data }: any = await getAppAvailability();
    const { data: { data: configs } }: any = await getConfigs();

    setAppStartDays(configs?.days);
    setAppStartTime(configs?.startTime);
    setAppEndTime(configs?.endTime);
    setFetching(false);
    setIsAppOn(data);
    onAuthStateChanged(auth, (user) => {
      setCurrUser(user);
      setLoading(false);
    });
  };

  useEffect(() => {
    asyncFetch();
  }, []);

  const value = {
    login,
    logout,
    fetching,
    setFetching,
    isAppOn,
    setIsAppOn,
    currUser,
    appStartDays,
    appStartTime,
    appEndTime,
    setAppStartDays,
    setAppStartTime,
    setAppEndTime,
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? <Loading /> : children}
    </AuthContext.Provider>
  );
};
