import React, {
  createContext, useCallback, useContext, useEffect, useMemo, useState,
} from 'react';
import translation from 'src/assets/translation.json';

const LocaleContext = createContext({});

const LOCALES = ['en', 'cn'];

export const useLocale = () => useContext(LocaleContext);

export const LocaleProvider = ({ children }) => {
  const [isCN, setIsCN] = useState(true);
  
  const t = useCallback((key) => {
    return isCN ? translation.cn[key] || translation.en[key] || key : translation.en[key] || key;
  }, [isCN]);

  useEffect(() => {
    const config = localStorage.getItem('_reg_app_config');
    setIsCN(config?.isCN || true);
  }, []);


  const value = {
    isCN,
    setIsCN,
    t,
  };

  return <LocaleContext.Provider value={value}>
    {children}
  </LocaleContext.Provider>;
};
