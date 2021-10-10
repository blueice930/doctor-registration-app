import React, { useMemo, useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css';
import {
  FormControlLabel, Radio, RadioGroup, TextField, Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import {
  MobileDatePicker, TimePicker, LocalizationProvider,
} from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import styled from '@emotion/styled';
import { add } from 'date-fns';

const useStyles = makeStyles({
  input: {
    width: 400,
    margin: 20,
  },
});

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
  .date {
    width: 400px;
  }
`;

const StyledTextField = styled(TextField)`
  margin: 20px;
`;

const RegForm = () => {
  const [name, setName] = useState('');
  const [nameZH, setNameZH] = useState('');
  const [phone, setPhone] = useState('');
  const [datetime, setDatetime] = React.useState<Date | null>(
    new Date(),
  );
  const classes = useStyles();

  const currentDate = useMemo(() => new Date(), []);

  const disableDate = (day: Date) => day.getDay() % 2 !== 0;
  const disableTime = (timeValue: number, clockType: 'hours' | 'minutes' | 'seconds') => (clockType === 'minutes' && timeValue % 5 !== 0);

  const handleChange = (newValue: Date | null) => {
    setDatetime(newValue);
  };

  return (
    <Container>
      <StyledTextField
        sx={{ width: 400 }}
        id="name"
        required
        label="English Name"
        variant="outlined"
      />
      <StyledTextField
        sx={{ width: 400 }}
        id="name-cn"
        required
        label="Chinese Name"
        variant="outlined"
      />
      <PhoneInput
        inputProps={{ name: 'phone', required: true }}
        placeholder="Enter phone number"
        onChange={() => setPhone('1321123')}
        country='sg'
        inputClass='phone-input'
        containerClass='phone-container'
      />
      <div className="label">
        <Typography>Is it your first visit?</Typography>
        <RadioGroup
          row
          aria-label="first-time"
          defaultValue="yes"
          name="radio-buttons-group"
          >
          <FormControlLabel sx={{ mr: 15 }} value="yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="no" control={<Radio />} label="No" />
        </RadioGroup>
      </div>
      <StyledTextField
        sx={{ width: 400 }}
        id="member-id"
        label="Member Id (Optional)"
        variant="outlined"
      />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <MobileDatePicker
          label="Date"
          inputFormat="yyyy/MM/dd"
          minDate={currentDate}
          maxDate={add(currentDate, { months: 2 })}
          shouldDisableDate={disableDate}
          value={datetime}
          defaultCalendarMonth={currentDate}
          onChange={handleChange}
          InputProps={{ required: true }}
          renderInput={(params) => <TextField className={classes.input} {...params} />}
        />
        <TimePicker
          label="Start Time"
          value={datetime}
          onChange={handleChange}
          shouldDisableTime={disableTime}
          minTime={new Date(currentDate.setHours(9))}
          maxTime={new Date(currentDate.setHours(18))}
          InputProps={{ required: true }}
          renderInput={(params) => <TextField className={classes.input} {...params} />}
        />
      </LocalizationProvider>
    </Container>
  );
};

export default RegForm;
