import React from 'react';
import styled from 'styled-components';
import ReactHtmlParser from 'react-html-parser';
import { useLocale } from 'src/contexts/LocaleTempContext';

const StyledDisclaimer = styled.div`
  margin: 4px 40px;
  .title {
    font-size: 26px;
    font-weight: bold;
    margin: 30px 0;
  }
  .sub {
    font-size: 22px;
  }
  .terms {
    font-size: 20px;
    line-height: 1.5;
  }
`;

const Disclaimer = () => {
  const { t }: any = useLocale();
  return (
    <StyledDisclaimer>
      <div className="title">{t('disclaimer_title')}</div>
      <div className="sub">{t('terms_and_conditions')}</div>
      <div className="terms">
        {ReactHtmlParser(t('disclaimer_body'))}
      </div>
    </StyledDisclaimer>
  );
};

export default Disclaimer;
