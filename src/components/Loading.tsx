import React from 'react';
import { CircularProgress } from '@mui/material';
import { themeColor } from 'src/theme';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;

  .loading {
    font-size: 30px;
    color: ${themeColor.dark};
    margin: 15px;
  }
`;

const Loading = () => (
  <Container>
    <CircularProgress size={50} />
    <div className="loading">
      Loading
    </div>
  </Container>
);

export default Loading;
