import React, { useCallback, useMemo, useState } from 'react';
import {
  Box, Chip, MenuItem, FormControl, InputLabel, OutlinedInput, Select,
  SelectChangeEvent, TextField, Backdrop, CircularProgress,
} from '@mui/material';
import styled from 'styled-components';
import {
  MobileDatePicker, TimePicker, LocalizationProvider,
} from '@mui/lab';
import { makeStyles } from '@mui/styles';
import { add } from 'date-fns';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { useConsultant } from 'src/contexts/ConsultantContext';
import { Consultant } from 'src/types/consultant';
import { useForm } from 'src/contexts/FormContext';
import { isEmpty } from 'lodash';
import dayjs from 'dayjs';

const useStyles = makeStyles({
  input: {
    width: 400,
    margin: '30px 0',
  },
});

const Container = styled.div`
  height: 30vh;
  min-height: 300px;
  text-align: center;
  .date {
    width: 400px;
  }
`;

const ConsultantSelect = () => {
  const classes = useStyles();
  const { consultants } = useConsultant();
  const {
    selectedConsultant, setSelectedConsultant, date, setdate, settime,
  } = useForm();

  const [loading, setLoading] = useState(false);

  const getName = (id: string, CN = false) => {
    const temp = consultants.find((c: Consultant) => id === c.id);
    return CN ? temp?.nameCN : temp?.name;
  };

  const handleChange = (e: any) => {
    const value = e?.target?.value;
    setSelectedConsultant(consultants.find((c: Consultant) => c.id === value));
  };

  const currentDate = useMemo(() => new Date(), []);

  const disableDate = useCallback((day: Date) => {
    const timeslots = selectedConsultant?.timeslots;
    const d = day.getDay();
    return !timeslots.includes(d);
  }, [selectedConsultant]);

  const handleDateChange = async (newValue: Date | null) => {
    setLoading(true);
    await setTimeout(() => {
      setLoading(false);
      setdate(dayjs(newValue).format('YYYY/MM/DD'));
    }, 3000);
  };

  console.log('date', date);

  return (
    <Container>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <FormControl sx={{ m: 10, width: 400 }}>
        <InputLabel id="consultant-chip-label">Health Consultant</InputLabel>
        <Select
          labelId="consultant-chip-label"
          id="consultant-chip-select"
          value={selectedConsultant?.id}
          onChange={handleChange}
          input={<OutlinedInput id="select-chip" label="Health Consultant" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              <Chip key={selected} label={getName(selected)} />
            </Box>
          )}
        >
          {consultants.filter((c: Consultant) => c?.enabled).map((c: Consultant) => (
            <MenuItem
              key={c.id}
              value={c.id}
            >
              {c.name}
            </MenuItem>
          ))}
          {consultants.length === 0 && (
            <MenuItem>
              No available health consultants.
            </MenuItem>
          )}
        </Select>
        { !isEmpty(selectedConsultant) && (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <MobileDatePicker
              label="Date"
              inputFormat="yyyy/MM/dd"
              minDate={currentDate}
              maxDate={add(currentDate, { months: 2 })}
              shouldDisableDate={disableDate}
              value={date}
              defaultCalendarMonth={currentDate}
              onChange={handleDateChange}
              InputProps={{ required: true }}
              renderInput={(params) => <TextField className={classes.input} {...params} />}
              disableCloseOnSelect={false}
            />
          </LocalizationProvider>
        )}
        { !isEmpty(selectedConsultant) && date && (
          <FormControl>
            <InputLabel id="session-select-label">Session</InputLabel>
            <Select
              labelId="session-select-label"
              id="session-select"
              value={10}
              label="Session"
              sx={{ textAlign: 'left' }}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        )}
      </FormControl>
    </Container>
  );
};

export default ConsultantSelect;
