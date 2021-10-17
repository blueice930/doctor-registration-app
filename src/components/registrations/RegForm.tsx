import React, { useCallback, useMemo, useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css';
import {
  FormControlLabel, Radio, RadioGroup, TextField, Typography,
} from '@mui/material';

import styled from '@emotion/styled';
import { useForm } from 'src/contexts/FormContext';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .phone-input {
    width: 400px;
  }
  .phone-container {
    margin: 20px;
    width: 400px;
  }
  .label {
    width: 400px;
    text-align: left;
  }
  
`;

const StyledTextField = styled(TextField)`
  margin: 20px;
`;

const RegForm = () => {
  const {
    setpatientName, setpatientNameCN, setpatientMemberId, setisFirstVisit, setpatientPhone,
  } = useForm();

  return (
    <Container>
      <StyledTextField
        sx={{ width: 400 }}
        id="name"
        required
        label="English Name"
        variant="outlined"
        onChange={(e: any) => setpatientName(e.target.value)}
      />
      <StyledTextField
        sx={{ width: 400 }}
        id="name-cn"
        required
        label="Chinese Name"
        variant="outlined"
        onChange={(e: any) => setpatientNameCN(e.target.value)}
      />
      <PhoneInput
        inputProps={{ name: 'phone', required: true }}
        placeholder="Enter phone number"
        country='sg'
        inputClass='phone-input'
        containerClass='phone-container'
        onChange={(phone) => setpatientPhone(phone)}
      />
      <div className="label">
        <Typography>Is it your first visit?</Typography>
        <RadioGroup
          row
          aria-label="first-time"
          defaultValue="yes"
          name="radio-buttons-group"
          onChange={(e: any) => setisFirstVisit(e.target.value)}
          >
          <FormControlLabel sx={{ mr: 15 }} value={true} control={<Radio />} label="Yes" />
          <FormControlLabel value={false} control={<Radio />} label="No" />
        </RadioGroup>
      </div>
      <StyledTextField
        sx={{ width: 400 }}
        id="member-id"
        label="Member Id (Optional)"
        variant="outlined"
        onChange={(e: any) => setpatientMemberId(e.target.value)}
      />
    </Container>
  );
};

export default RegForm;
