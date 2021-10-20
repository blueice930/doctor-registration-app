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
import { getTimeslots } from 'src/firebase';
import { useLocale } from 'src/contexts/LocaleTempContext';

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
    selectedConsultant, setSelectedConsultant, date, time,
    sessions, setdate, settime, setsessions,
  } = useForm();
  const { t, isCN }: any = useLocale();

  const [loading, setLoading] = useState(false);

  const getName = (id: string) => {
    const temp = consultants.find((c: Consultant) => id === c.id);
    return isCN ? temp?.nameCN : temp?.name;
  };

  const handleChange = (e: any) => {
    const value = e?.target?.value;
    setsessions([]);
    setdate('');
    setSelectedConsultant(consultants.find((c: Consultant) => c.id === value));
  };

  const currentDate = useMemo(() => new Date(), []);

  const disableDate = useCallback((day: Date) => {
    const timeslots = selectedConsultant?.timeslots;
    const d = day.getDay();
    return !timeslots?.day?.includes(d);
  }, [selectedConsultant]);

  const handleDateChange = async (newValue: Date | null) => {
    setLoading(true);
    const newDate = dayjs(newValue).format('YYYY/MM/DD');
    const res: any = await getTimeslots({
      consultantId: selectedConsultant.id,
      date: newDate,
    });
    setLoading(false);
    setdate(newDate);
    setsessions(res?.data?.data);
  };

  return (
    <Container>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <FormControl sx={{ m: 10, width: 400 }}>
        <InputLabel id="consultant-chip-label">{t('health_consultant')}</InputLabel>
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
              {isCN ? c.nameCN : c.name}
            </MenuItem>
          ))}
          {consultants.length === 0 && (
            <MenuItem>
              {t('no_available_consultant')}
            </MenuItem>
          )}
        </Select>
        { !isEmpty(selectedConsultant) && (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <MobileDatePicker
              label={t('date')}
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
            <InputLabel id="session-select-label">{t('session')}</InputLabel>
            <Select
              labelId="session-select-label"
              id="session-select"
              onChange={(e) => settime(e.target.value)}
              label={t('session')}
              value={time}
              sx={{ textAlign: 'left' }}
            >
              {sessions.map((s: any) => (
                <MenuItem key={s} value={s}>
                  {s} ({selectedConsultant?.timeslots?.duration}{t('min')})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </FormControl>
    </Container>
  );
};

export default ConsultantSelect;
