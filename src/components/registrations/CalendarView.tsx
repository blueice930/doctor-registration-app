import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color:red;
  display: flex;
  flex-direction: column;
  .row {
    display: flex;
  }
  .col.thead {
    color: white;
  }
`;
const rows = [];
const columns = ['Time', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const CalendarView = () => {
  const abc = 123;
  return (
    <Container>
      <h2>Reservation</h2>
      <div className="table-view">
        <div className="row">
          {columns.map((day) => (
            <h4 key={day} className="thead col">{day}</h4>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default CalendarView;
