import React, { useCallback, useMemo, useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css';
import {
  FormControlLabel, Radio, RadioGroup, TextField, Typography,
} from '@mui/material';

import styled from '@emotion/styled';
import { useForm } from 'src/contexts/FormContext';
import { useLocale } from 'src/contexts/LocaleTempContext';

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
  const { t }: any = useLocale();
  const {
    patientName, patientNameCN, patientPhone, consultationNumber, patientMemberId,
    isFirstVisit, setpatientName, setpatientNameCN, setConsultationNumber,
    setpatientMemberId, setisFirstVisit, setpatientPhone,
  } = useForm();

  return (
    <Container>
      <StyledTextField
        sx={{ width: 400 }}
        id="name"
        required
        label={t('en_name')}
        variant="outlined"
        value={patientName}
        onChange={(e: any) => setpatientName(e.target.value)}
      />
      <StyledTextField
        sx={{ width: 400 }}
        id="name-cn"
        required
        label={t('cn_name')}
        variant="outlined"
        value={patientNameCN}
        onChange={(e: any) => setpatientNameCN(e.target.value)}
      />
      <PhoneInput
        inputProps={{ name: 'phone', required: true }}
        placeholder="Enter phone number"
        country='sg'
        inputClass='phone-input'
        value={patientPhone}
        containerClass='phone-container'
        onChange={(phone) => setpatientPhone(phone)}
        specialLabel={t('phone')}
      />
      <div className="label">
        <Typography>{t('is_first_time?')}</Typography>
        <RadioGroup
          row
          aria-label="first-time"
          value={isFirstVisit}
          name="radio-buttons-group"
          onChange={(e: any) => setisFirstVisit(e.target.value === 'true')}
          >
          <FormControlLabel sx={{ mr: 15 }} value={true} control={<Radio />} label={t('yes')} />
          <FormControlLabel value={false} control={<Radio />} label={t('no')} />
        </RadioGroup>
      </div>
      {!isFirstVisit && (
        <StyledTextField
          sx={{ width: 400 }}
          id="consultation_number"
          label={t('consultation_number')}
          variant="outlined"
          value={consultationNumber}
          required
          onChange={(e: any) => setConsultationNumber(e.target.value)}
        />
      )}
      <StyledTextField
        sx={{ width: 400 }}
        id="member-id"
        label={t('member_id')}
        value={patientMemberId}
        variant="outlined"
        onChange={(e: any) => setpatientMemberId(e.target.value)}
      />
    </Container>
  );
};

export default RegForm;
