import React from 'react';
import styled from 'styled-components';
import ReactHtmlParser from 'react-html-parser';

const StyledDisclaimer = styled.div`
  margin: 4px 40px;
  .title {
    font-size: 26px;
    font-weight: bold;
    margin: 30px 0;
  }
  .sub {
    font-size: 22px;
  }
  .terms {
    font-size: 20px;
    line-height: 1.5
  }
`;

const HTML = `
<ol className="terms">
  <li>Only members of Global Ginseng are eligible to make appointment for health consultation.</li>
  <li> No walk-ins will be accepted.</li>
  <li>Once your appointment is successfully made, please screenshot the appointment details and show it to the staff for verification on your appointment date.</li>
  <li>Reservations cannot be changed and transferred to others once the appointment is made. You will be turned away if your name does not match the registered name.</li>
  <li>Please arrive 15 minutes before your appointment time.</li>
  <li>Your appointment will be automatically cancelled if you are late for more than 15 minutes of your appointment time.</li>
  <li>Members failing to notify company (with valid reasons) for their absence in <span style="color: red;">ONE (1) or more appointments</span> will be blacklisted and suspended for making appointment for 1 month (30 days).</li>
  <li>The company reserves the right to amend the terms and conditions at any time without prior notice.</li>
</ol>
`;

const Disclaimer = () => (
    <StyledDisclaimer>
      <div className="title">Global Ginseng Health Consultation Online Appointment</div>
      <div className="sub">Terms and Conditions</div>
      <div className="terms">
        {ReactHtmlParser(HTML)}
      </div>
    </StyledDisclaimer>
);

export default Disclaimer;
