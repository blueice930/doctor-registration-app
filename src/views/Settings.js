import React, {useState} from "react";
import styled from '@emotion/styled';
import {
  Switch, Button, TextField, Select, MenuItem, Checkbox, ListItemText, OutlinedInput, Backdrop, CircularProgress,
} from '@mui/material';

import { getDayText } from 'src/views/ConsultantView';

import { useAuth } from "src/contexts/AuthContext";
import { setConfigs } from "src/firebase";

const Container = styled.div`
  padding: 0 40px;

  .save-btn {
    margin: 40px 0;
  }
`;

function Settings() {
  const [updating, setUpdating] = useState(false);
  const {
    isAppOn, setIsAppOn,
    appStartDays, setAppStartDays,
    appStartTime, setAppStartTime,
    appEndTime, setAppEndTime,
  } = useAuth();

  const handleSave = async () => {
    setUpdating(true);
    await setConfigs({
      days: appStartDays,
      startTime: appStartTime,
      endTime: appEndTime,
      isAppOn,
    })
    setUpdating(false);
  }

  return (
    <>
      <Container>
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={updating}
          >
          <CircularProgress color="inherit" />
        </Backdrop>
        <h4>App On / Off</h4>
        <Switch checked={isAppOn} onChange={() => setIsAppOn(!isAppOn)} />
        <h4>App Start Time</h4>
        <TextField
          id="start-time"
          label="Start Time"
          value={appStartTime}
          onChange={(e) => setAppStartTime(e.target.value)}
          variant="outlined"
        />
        <h4>App End Time</h4>
        <TextField
          id="end-time"
          label="End Time"
          value={appEndTime}
          onChange={(e) => setAppEndTime(e.target.value)}
          variant="outlined"
        />
        <h4>App Open Day</h4>
        <Select
          labelId="day-multiple-checkbox-label"
          id="day-multiple-checkbox"
          multiple
          value={appStartDays || [0,1,2,3,4,5,6]}
          onChange={(e) => setAppStartDays(e.target.value)}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected?.sort()?.map((d) => getDayText(d))?.join(', ')}
        >
          {[0,1,2,3,4,5,6].map((day) => (
            <MenuItem key={day} value={day}>
              <Checkbox checked={appStartDays?.indexOf(day) > -1} />
              <ListItemText primary={getDayText(day)} />
            </MenuItem>
          ))}
        </Select>
        <div className="save-btn">
          <Button variant="contained" color="primary" onClick={handleSave}>Save</Button>
        </div>
      </Container>
    </>
  );
}

export default Settings;
