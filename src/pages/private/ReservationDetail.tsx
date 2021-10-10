import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import styled from 'styled-components';
import { isEmpty } from 'lodash';

import { themeColor } from 'src/theme';
import PageNotFound from 'src/pages/404';
import Loading from 'src/components/Loading';

const StyledContainer = styled.div`
  max-width: 800px;
  margin: 5px auto;
  border: 1px solid ${themeColor.dark};

  h3 {
    margin: 20px 0;
    color: white;
    background-color: ${themeColor.dark};
    padding: 10px 30px;
    border-radius: 4px;;
  }

  .detail-container {
    display: flex;
    align-items: center;
    justify-content: left;
  }

  .label {
    font-weight: bold;
    padding: 40px;
  }
  .text {
    padding: 40px;
  }

  .items-container {
    border: 1px solid ${themeColor.atomBlue};
    border-radius: 4px;
    margin: 20px;
  }
`;

const ReservationDetail = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentReservation, setCurrentReservation] = useState(null);
  const params: any = useParams();

  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && isEmpty(currentReservation) && <PageNotFound />}
      {!isLoading && !isEmpty(currentReservation) && (
        <StyledContainer>
          <h3>Order Detail</h3>
          <div className="detail-container">
            <div className="label">Order ID</div>
            <div className="text">{currentReservation || ''}</div>
          </div>
          <div className="detail-container">
            <div className="label">Total Price</div>
            <div className="text">{currentReservation || ''}</div>
          </div>
          <div className="detail-container">
            <div className="label">Create Date</div>
            <div className="text">{currentReservation || ''}</div>
          </div>
          <div className="detail-container">
            <div className="label">Update Date</div>
            <div className="text">{currentReservation || ''}</div>
          </div>
          <div className="detail-container">
            <div className="label">Status</div>
            <div className="text">{currentReservation || ''}</div>
          </div>
        </StyledContainer>
      )}
    </>
  );
};

export default ReservationDetail;
