import React from 'react';
import {
  Box, Button, Typography,
} from '@mui/material';
import styled from '@emotion/styled';
import { useLocale } from 'src/contexts/LocaleTempContext';
import Logo from 'src/assets/img/logo.png';
import { useAuth } from 'src/contexts/AuthContext';

const StyledContainer = styled.div`
  background-color: #b4b4b4;
  min-height: 1200px;
  height: 100vh;
`;

const TopBar = styled.div`
  color: white;
  padding: 8px 16px;
  background-color: #343a40;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding-left: 20%;
  height: 60px;
  img {
    height: 40px;
    margin-right: 20px;
  }
`;

const FooterBar = styled.div`
  color: white;
  padding: 8px 16px;
  background-color: #343a40;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding-left: 20%;
  height: 60px;
`;

const InnerContainer = styled.div`
  margin: auto;
  max-width: 700px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  padding: 20px 80px;
  height: calc(100% - 120px);

  .locale-btn {
    display: flex;
    justify-content: right;
    width: 100%;
  }
`;

const NotAvailable = () => {
  const { t }: any = useLocale();
  const { appStartDays, appStartTime, appEndTime } = useAuth();
  const { setLocale }: any = useLocale();

  const getAvailableTime = (d: number) => {
    switch (d) {
      case 0:
        return 'sun';
      case 1:
        return 'mon';
      case 2:
        return 'tue';
      case 3:
        return 'wed';
      case 4:
        return 'thu';
      case 5:
        return 'fri';
      case 6:
        return 'sat';
      default:
        return '';
    }
  };

  return (
    <StyledContainer>
      <TopBar>
        <img src={Logo} alt="logo" />
          {t('global_ginseng')}
      </TopBar>
      <InnerContainer>
        <div className="locale-btn">
          <Button sx={{ height: '40px', borderRadius: '4px', right: 0 }} onClick={setLocale}>中 | En</Button>
        </div>
        <Typography paragraph sx={{ fontWeight: 'bold', fontSize: '30px', textAlign: 'center' }}>
          {t('app-not-available')}
        </Typography>
        <Typography sx={{
          fontSize: '20px', color: '#888', lineHeight: '2', textAlign: 'center',
        }}>
          {t('app_available_at')}
          <br />
          {appStartDays.map((d: any) => t(getAvailableTime(d)))?.join(', ')}
          <br />
          {`${appStartTime} - ${appEndTime}`}
        </Typography>
      </InnerContainer>
      <FooterBar>
      </FooterBar>
    </StyledContainer>
  );
};

export default NotAvailable;
