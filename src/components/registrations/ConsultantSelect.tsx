import React from 'react';
import {
  Box, Chip, MenuItem,
  FormControl, InputLabel, OutlinedInput, Select, SelectChangeEvent,
} from '@mui/material';
import styled from 'styled-components';

const Container = styled.div`
  height: 30vh;
  min-height: 300px;
  text-align: center;

`;

const NAMES = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

const ConsultantSelect = () => {
  const [personName, setPersonName] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a the stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <Container>
      <FormControl sx={{ m: 10, width: 400 }}>
        <InputLabel id="consultant-chip-label">Health Consultant</InputLabel>
        <Select
          labelId="consultant-chip-label"
          id="consultant-chip-select"
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput id="select-chip" label="Health Consultant" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
        >
          {NAMES.map((name) => (
            <MenuItem
              key={name}
              value={name}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Container>
  );
};

export default ConsultantSelect;
