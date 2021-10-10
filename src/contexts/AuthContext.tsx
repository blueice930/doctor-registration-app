import React, { useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { User } from 'src/types/user';
import Loading from 'src/components/Loading';
import { isPublicRoute } from 'src/routes/Routes';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from 'src/firebase';

const AuthContext = React.createContext<any>({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children } : any) => {
  const [currUser, setCurrUser] = useState<User>();
  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();

  const login = async (email: string, password: string) => {
    const res = await signInWithEmailAndPassword(auth, email, password);
    return res;
  };

  const logout = async () => {
    await auth.signOut();
    setCurrUser(undefined);
  };

  useEffect(() => {
    if (isPublicRoute(pathname)) {
      setLoading(false);
    }
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('user', user);
      }
      setLoading(false);
    });
  }, []);

  const value = {
    login,
    logout,
    currUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? <Loading /> : children}
    </AuthContext.Provider>
  );
};
