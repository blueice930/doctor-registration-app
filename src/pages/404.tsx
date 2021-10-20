import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box, Button, Typography,
} from '@mui/material';
import styled from '@emotion/styled';

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
`;

const StyledBtn = styled(Button)`
  margin: 40px;
`;

const PageNotFound = () => (
  <StyledContainer>
    <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
      <Typography paragraph sx={{ fontWeight: 'bold', fontSize: '30px' }}>
        Oops, page not found!
      </Typography>
      <Typography sx={{ fontSize: '16px', color: '#888', lineHeight: '2' }}>
        Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL?
        Be sure to check your spelling.
      </Typography>
      <StyledBtn size="large" variant="contained" onClick={() => { window.location.href = '/'; }}>
        Go to Home Page
      </StyledBtn>
    </Box>
  </StyledContainer>
);

export default PageNotFound;
