import React, { useEffect } from 'react';
import styled from 'styled-components';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
  const abc = 123;
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
        table
      </div>
    </StyledContainer>
  );
};

export default Thankyou;
