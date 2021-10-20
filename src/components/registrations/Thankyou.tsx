import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm } from 'src/contexts/FormContext';
import {
  Paper, Table, TableBody, TableCell, TableContainer, TableRow,
} from '@mui/material';
import { useLocale } from 'src/contexts/LocaleTempContext';

const StyledContainer = styled.div`
  width: 100%;
  text-align: center;
  padding: 40px;

  .title {
    font-weight: bold;
    font-size: 46px;
    padding: 10px;
  }
  p.text {
    font-size: 20px;
    line-height: 2;
  }

  .subtitle {
    padding-left: 30px;
    font-size: 28px;
    font-weight: bold;
    margin-top: 50px;
  }

  .detail {
    margin-top: 30px;
  }
`;

const StyledIcon = styled(FontAwesomeIcon)`
`;

const StyledTitleCell = styled(TableCell)`
  width: 40%;
`;

const Thankyou = () => {
  const {
    selectedConsultant, patientName, patientNameCN,
    patientMemberId,
    isFirstVisit,
    consultationNumber,
    patientPhone,
    date,
    time,
  } = useForm();

  const { t }: any = useLocale();
  return (
    <StyledContainer>
      <div className="icon">
        <StyledIcon
          icon={faCheckCircle}
          color="#00b881"
          size="3x"
        />
      </div>
      <div className="title">{t('thankyou')}</div>
      <p className="text">{t('thankyou_text')}</p>
      <div className="subtitle">{t('reservation_detail')}</div>
      <div className="detail">
        <TableContainer component={Paper} elevation={2}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableBody>
            <TableRow>
              <StyledTitleCell sx={{ fontWeight: 'bold' }}>
                {`${t('date')}:`}
              </StyledTitleCell>
              <TableCell>
                {date}
              </TableCell>
            </TableRow>
            <TableRow>
              <StyledTitleCell sx={{ fontWeight: 'bold' }}>
                {`${t('time')}:`}
              </StyledTitleCell>
              <TableCell>
                {time}
              </TableCell>
            </TableRow>
            <TableRow>
              <StyledTitleCell sx={{ fontWeight: 'bold' }}>
                {`${t('en_name')}:`}
              </StyledTitleCell>
              <TableCell>
                {patientName}
              </TableCell>
            </TableRow>
            <TableRow>
              <StyledTitleCell sx={{ fontWeight: 'bold' }}>
                {`${t('cn_name')}:`}
              </StyledTitleCell>
              <TableCell>
                {patientNameCN}
              </TableCell>
            </TableRow>
            <TableRow>
              <StyledTitleCell sx={{ fontWeight: 'bold' }}>
                {`${t('phone')}:`}
              </StyledTitleCell>
              <TableCell>
                {patientPhone}
              </TableCell>
            </TableRow>
            <TableRow>
              <StyledTitleCell sx={{ fontWeight: 'bold' }}>
                {`${t('health_consultant')}:`}
              </StyledTitleCell>
              <TableCell>
                {selectedConsultant?.name}, {selectedConsultant?.nameCN}
              </TableCell>
            </TableRow>
            <TableRow>
              <StyledTitleCell sx={{ fontWeight: 'bold' }}>
                {`${t('first_time_visit')}:`}
              </StyledTitleCell>
              <TableCell>
                {isFirstVisit ? t('yes') : t('no')}
              </TableCell>
            </TableRow>
            {!isFirstVisit && (
              <TableRow>
                <StyledTitleCell sx={{ fontWeight: 'bold' }}>
                {`${t('consultation_number')}:`}
                </StyledTitleCell>
                <TableCell>
                  {consultationNumber || ''}
                </TableCell>
              </TableRow>
            )}
            {patientMemberId && (
              <TableRow>
                <StyledTitleCell sx={{ fontWeight: 'bold' }}>
                  Member ID:
                </StyledTitleCell>
                <TableCell>
                  {patientMemberId}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      </div>
    </StyledContainer>
  );
};

export default Thankyou;
