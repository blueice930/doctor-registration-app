import React, { useEffect } from 'react';
import styled from 'styled-components';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm } from 'src/contexts/FormContext';
import {
  Paper, Table, TableBody, TableCell, TableContainer, TableRow,
} from '@mui/material';

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

const Thankyou = () => {
  const {
    selectedConsultant, patientName, patientNameCN,
    patientMemberId,
    isFirstVisit,
    patientPhone,
    date,
    time,
  } = useForm();
  return (
    <StyledContainer>
      <div className="icon">
        <StyledIcon
          icon={faCheckCircle}
          color="#00b881"
          size="3x"
        />
      </div>
      <div className="title">Thank you!</div>
      <p className="text">Your reservation has been made successfully. Please arrive on time. If there is any change please inform us soon.</p>
      <div className="subtitle">Reservation Detail:</div>
      <div className="detail">
        <TableContainer component={Paper} elevation={2}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableBody>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>
                Date:
              </TableCell>
              <TableCell>
                {date}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>
                Time:
              </TableCell>
              <TableCell>
                {time}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>
                English Name:
              </TableCell>
              <TableCell>
                {patientName}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>
                Chinese Name:
              </TableCell>
              <TableCell>
                {patientNameCN}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>
                Phone:
              </TableCell>
              <TableCell>
                {patientPhone}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>
                Consultant:
              </TableCell>
              <TableCell>
                {selectedConsultant?.name}, {selectedConsultant?.nameCN}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>
                First time visit:
              </TableCell>
              <TableCell>
                {isFirstVisit ? 'Yes' : 'No'}
              </TableCell>
            </TableRow>
            {patientMemberId && (
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>
                  Member ID:
                </TableCell>
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
