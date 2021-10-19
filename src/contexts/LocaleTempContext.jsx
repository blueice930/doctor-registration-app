import React, {
  createContext, useCallback, useContext, useEffect, useState,
} from 'react';
import translation from 'src/assets/translation.json';

const LocaleContext = createContext({});

export const useLocale = () => useContext(LocaleContext);

export const LocaleProvider = ({ children }) => {
  const [isCN, setIsCN] = useState(true);
  
  const t = useCallback((key) => {
    return isCN ? translation.cn[key] || translation.en[key] || key : translation.en[key] || key;
  }, [isCN]);

  const setLocale = () => {
    localStorage.setItem('_reg_app_locale', !isCN);
    setIsCN(!isCN);
  }

  useEffect(() => {
    // read as string
    const cache = localStorage.getItem('_reg_app_locale') === 'true';
    setIsCN(cache);
  }, []);

  const value = {
    isCN,
    t,
    setLocale
  };

  return <LocaleContext.Provider value={value}>
    {children}
  </LocaleContext.Provider>;
};
