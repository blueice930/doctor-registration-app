import React from "react";

// react-bootstrap components
import { Form } from "react-bootstrap";

function Settings() {
  return (
    <>
      <Form>
        <Form.Check 
          type="switch"
          id="custom-switch"
          label="App On"
        />
      </Form>
    </>
  );
}

export default Settings;
