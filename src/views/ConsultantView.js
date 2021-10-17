import React, { useState } from "react";

// react-bootstrap components
import {
  Badge, Button,  Card,  Form,  Navbar,  Nav,  Container,  Row,  Col, Modal,
} from "react-bootstrap";
import {
  Backdrop, CircularProgress, Table, TableRow, TableCell, TableHead, TableBody, TableContainer, Paper, Switch,
} from "@mui/material";

import styled from 'styled-components';
import {range, padStart} from 'lodash';
import { faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import shortid from 'shortid';
import { createConsultant, deleteConsultant, updateConsultant } from 'src/firebase';
import { useConsultant } from "src/contexts/ConsultantContext";
import { Day } from "src/types/consultant";

const StyledDeleteTimeSlotBtn = styled(Button)`
  margin: 10px auto;
  display: block;
`

const StyledAddTimeSlotBtn = styled(Button)`
  margin: 10px auto;
  display: block;
`

const StyledModal = styled(Modal)`
  .modal-dialog {
    width: 70%;
    transform: none !important;
    transition: none !important;
  }
  .modal-content {
    border-radius: 8px;
  }
  .modal-body {
    padding-left: 20px;
    padding-right: 20px;
  }
  .modal-title {
    margin: 10px 0;
  }
  .title {
    margin: 30px 0;
    font-weight: bold;
  }
`;

function ConsultantView() {
  const [modalShow, setModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [name, setName] = useState('');
  const [editname, seteditName] = useState('');
  const [nameCN, setNameCN] = useState('');
  const [editnameCN, seteditNameCN] = useState('');
  const [email, setEmail] = useState('');
  const [editemail, seteditEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [editphone, seteditPhone] = useState('');
  const [timeslots, setTimeslots] = useState([{id: 0, day: Day.WD, duration: 15, start: '08:00', end: '18:00'}]);
  const [edittimeslots, seteditTimeslots] = useState([{id: 0, day: Day.WD, duration: 15, start: '08:00', end: '18:00'}]);
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState(false);
  const [deleting, setdeleting] = useState(false);
  const [editId, setEditId] = useState('');
  const [editEnabled, setEditEnabled] = useState(true);

  const { consultants, reload } = useConsultant();

  const resetFields = () => {
    setName('')
    setNameCN('')
    setEmail('')
    setPhone('')
    setTimeslots([{id: 0, day: Day.WD, duration: 15, start: '08:00', end: '18:00'}]);
    setAdding(false);
    setModalShow(false);
  }

  const handleAdd = async () => {
    try {
      if (name && nameCN && phone) {
        setAdding(true);
        const res = await createConsultant({
          name,
          nameCN,
          email,
          phone,
          timeslots
        });
        await reload();
        resetFields();
      }
    } catch(e) {
      console.error(e)
    }
  };

  const resetEditFields = () => {
    seteditName('')
    seteditNameCN('')
    seteditEmail('')
    seteditPhone('')
    seteditTimeslots([{id: 0, day: Day.WD, duration: 15, start: '08:00', end: '18:00'}]);
    setEditing(false);
    setEditModalShow(false);
  }

  const handleEdit = async (id) => {
    try {
      setEditing(true);
      const res = await updateConsultant({
        id,
        name: editname,
        nameCN: editnameCN,
        email: editemail,
        phone: editphone,
        enabled: editEnabled,
        timeslots: edittimeslots
      });
      await reload();
      resetEditFields()
    } catch(e) {
      console.error(e)
    }
  };

  const handleModalClose = () => setModalShow(false);
  const handleModalShow = () => setModalShow(true);

  const addTimeslots = () => {
    if (timeslots.length < 7 ) {
      const newSlot = {id: shortid.generate(), day: Day.WD, duration: 15, start: '08:00', end: '18:00'};
      setTimeslots([...timeslots, newSlot]);
    }
  }

  const removeTimeslots = (id) => {
    const temp = timeslots.filter((ts) => ts.id !== id);
    setTimeslots(temp);
  }

  const updateTimeslots = (id, field, value) => {
    const temp = [...timeslots];
    const ts = temp.find((ts) => ts.id === id);
    ts[field] = value
    setTimeslots(temp);
  }

  const addEditTimeslots = () => {
    if (edittimeslots.length < 7 ) {
      const newSlot = {id: shortid.generate(), day: Day.WD, duration: 15, start: '08:00', end: '18:00'};
      seteditTimeslots([...edittimeslots, newSlot]);
    }
  }

  const removeEditTimeslots = (id) => {
    const temp = edittimeslots.filter((ts) => ts.id !== id);
    seteditTimeslots(temp);
  }

  const updateEditTimeslots = (id, field, value) => {
    const temp = [...edittimeslots];
    const ts = temp.find((ts) => ts.id === id);
    ts[field] = value
    seteditTimeslots(temp);
  }

  const handleDelete = async (id) => {
    setdeleting(true);
    const res = await deleteConsultant({id});
    await reload();
    setdeleting(false);
  }

  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={deleting}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <StyledModal
        show={editModalShow}
        onHide={() => setEditModalShow(false)}
        backdrop="static"
        keyboard={false}
      >
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={editing}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Modal.Header closeButton>
          <Modal.Title>Edit Consultant</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label>Name</Form.Label>
          <Form.Control isInvalid={editname === ""} value={editname} onChange={(e) => seteditName(e.target.value)} required type="text" placeholder="Enter name" />
          <Form.Label>Chinese Name</Form.Label>
          <Form.Control isInvalid={editnameCN === ""} value={editnameCN} onChange={(e) => seteditNameCN(e.target.value)} required type="text" placeholder="Enter Chinese name" />
          <Form.Label>Email address</Form.Label>
          <Form.Control value={editemail} onChange={(e) => seteditEmail(e.target.value)} type="email" placeholder="Enter email" />
          <Form.Label>Phone</Form.Label>
          <Form.Control isInvalid={editphone === ""} value={editphone} onChange={(e) => seteditPhone(e.target.value)} required type="phone" placeholder="Enter phone number" />
          <Form.Label>Enabled</Form.Label>
          <div className="enable-toggle">
            <Switch checked={editEnabled} onChange={() => setEditEnabled(!editEnabled)} />
          </div>
          <div className="title">
          Time slots
          </div>
          {edittimeslots?.map((ts) => (
            <div key={ts.id}>
              <Form.Label>Duration</Form.Label>
              <Form.Control required as="select" defaultValue={ts.duration} onChange={(e) => updateEditTimeslots(ts.id, 'duration', e.target.value)}>
                <option value={10}>10 minutes</option>
                <option value={15}>15 minutes</option>
                <option value={20}>20 minutes</option>
                <option value={30}>30 minutes</option>
                <option value={60}>1 hour</option>
              </Form.Control>
              <Form.Label>Day</Form.Label>
              <Form.Control required as="select" value={ts.day} onChange={(e) => updateEditTimeslots(ts.id, 'day', e.target.value)}>
                <option value={Day.WD}>Weekdays</option>
                <option value={Day.ALL}>All week</option>
                <option value={Day.MON}>Monday</option>
                <option value={Day.TUE}>Tuesday</option>
                <option value={Day.WED}>Wednesday</option>
                <option value={Day.THU}>Thursday</option>
                <option value={Day.FRI}>Friday</option>
                <option value={Day.SAT}>Saturday</option>
                <option value={Day.SUN}>Sunday</option>
              </Form.Control>
              <Form.Label>Start time</Form.Label>
              <Form.Control required as="select" value={ts.start} onChange={(e) => updateEditTimeslots(ts.id, 'start', e.target.value)}>
                {range(7, 19).map((h) => (
                  <>
                    <option value={`${padStart(h, 2, '0')}:00`}>{`${padStart(h, 2, '0')}:00`}</option>
                    <option value={`${padStart(h, 2, '0')}:15`}>{`${padStart(h, 2, '0')}:15`}</option>
                    <option value={`${padStart(h, 2, '0')}:30`}>{`${padStart(h, 2, '0')}:30`}</option>
                    <option value={`${padStart(h, 2, '0')}:45`}>{`${padStart(h, 2, '0')}:45`}</option>
                  </>
                ))}
              </Form.Control>
              <Form.Label>End time</Form.Label>
              <Form.Control required as="select" value={ts.end} onChange={(e) => updateEditTimeslots(ts.id, 'end', e.target.value)}>
                {range(7, 19).map((h) => (
                  <>
                    <option value={`${padStart(h, 2, '0')}:00`}>{`${padStart(h, 2, '0')}:00`}</option>
                    <option value={`${padStart(h, 2, '0')}:15`}>{`${padStart(h, 2, '0')}:15`}</option>
                    <option value={`${padStart(h, 2, '0')}:30`}>{`${padStart(h, 2, '0')}:30`}</option>
                    <option value={`${padStart(h, 2, '0')}:45`}>{`${padStart(h, 2, '0')}:45`}</option>
                  </>
                ))}
              </Form.Control>
              <StyledDeleteTimeSlotBtn variant="danger" className="btn-fill" onClick={() => removeEditTimeslots(ts.id)}>
                <FontAwesomeIcon color="white" icon={faMinusCircle} />
                &nbsp; Delete slot
              </StyledDeleteTimeSlotBtn>
              <hr />
            </div>
          ))}
          <StyledAddTimeSlotBtn disabled={false} variant="info" className="btn-fill" onClick={() => {addEditTimeslots();}}>
            <FontAwesomeIcon color="white" icon={faPlusCircle} />
            &nbsp; Add new slot
          </StyledAddTimeSlotBtn>
        </Modal.Body>
        <Modal.Footer>
          <Button style={{margin: '30px 0'}}  variant="secondary" onClick={() => setEditModalShow(false)}>
            Close
          </Button>
          <Button className="btn-fill" disabled={editing} onClick={() => handleEdit(editId)} type="submit" variant="success">Save</Button>
        </Modal.Footer>
      </StyledModal>
      <StyledModal
        show={modalShow}
        onHide={handleModalClose}
        backdrop="static"
        keyboard={false}
      >
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={adding}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Modal.Header closeButton>
          <Modal.Title>Add Consultant</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label>Name</Form.Label>
          <Form.Control isInvalid={name === ""} value={name} onChange={(e) => setName(e.target.value)} required type="text" placeholder="Enter name" />
          <Form.Label>Chinese Name</Form.Label>
          <Form.Control isInvalid={nameCN === ""} value={nameCN} onChange={(e) => setNameCN(e.target.value)} required type="text" placeholder="Enter Chinese name" />
          <Form.Label>Email address</Form.Label>
          <Form.Control value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter email" />
          <Form.Label>Phone</Form.Label>
          <Form.Control isInvalid={phone === ""} value={phone} onChange={(e) => setPhone(e.target.value)} required type="phone" placeholder="Enter phone number" />
          <div className="title">
          Time slots
          </div>
          {timeslots.map((ts) => (
            <div key={ts.id}>
              <Form.Label>Duration</Form.Label>
              <Form.Control required as="select" value={ts.duration} onChange={(e) => updateTimeslots(ts.id, 'duration', e.target.value)}>
                <option value={10}>10 minutes</option>
                <option value={15}>15 minutes</option>
                <option value={20}>20 minutes</option>
                <option value={30}>30 minutes</option>
                <option value={60}>1 hour</option>
              </Form.Control>
              <Form.Label>Day</Form.Label>
              <Form.Control required as="select" value={ts.day} onChange={(e) => updateTimeslots(ts.id, 'day', e.target.value)}>
                <option value={Day.WD}>Weekdays</option>
                <option value={Day.ALL}>All week</option>
                <option value={Day.MON}>Monday</option>
                <option value={Day.TUE}>Tuesday</option>
                <option value={Day.WED}>Wednesday</option>
                <option value={Day.THU}>Thursday</option>
                <option value={Day.FRI}>Friday</option>
                <option value={Day.SAT}>Saturday</option>
                <option value={Day.SUN}>Sunday</option>
              </Form.Control>
              <Form.Label>Start time</Form.Label>
              <Form.Control required as="select" value={ts.start} onChange={(e) => updateTimeslots(ts.id, 'start', e.target.value)}>
                {range(7, 19).map((h) => (
                  <>
                    <option value={`${padStart(h, 2, '0')}:00`}>{`${padStart(h, 2, '0')}:00`}</option>
                    <option value={`${padStart(h, 2, '0')}:15`}>{`${padStart(h, 2, '0')}:15`}</option>
                    <option value={`${padStart(h, 2, '0')}:30`}>{`${padStart(h, 2, '0')}:30`}</option>
                    <option value={`${padStart(h, 2, '0')}:45`}>{`${padStart(h, 2, '0')}:45`}</option>
                  </>
                ))}
              </Form.Control>
              <Form.Label>End time</Form.Label>
              <Form.Control required as="select" value={ts.end} onChange={(e) => updateTimeslots(ts.id, 'end', e.target.value)}>
                {range(7, 19).map((h) => (
                  <>
                    <option value={`${padStart(h, 2, '0')}:00`}>{`${padStart(h, 2, '0')}:00`}</option>
                    <option value={`${padStart(h, 2, '0')}:15`}>{`${padStart(h, 2, '0')}:15`}</option>
                    <option value={`${padStart(h, 2, '0')}:30`}>{`${padStart(h, 2, '0')}:30`}</option>
                    <option value={`${padStart(h, 2, '0')}:45`}>{`${padStart(h, 2, '0')}:45`}</option>
                  </>
                ))}
              </Form.Control>
              <StyledDeleteTimeSlotBtn variant="danger" className="btn-fill" onClick={() => removeTimeslots(ts.id)}>
                <FontAwesomeIcon color="white" icon={faMinusCircle} />
                &nbsp; Delete slot
              </StyledDeleteTimeSlotBtn>
              <hr />
            </div>
          ))}
          <StyledAddTimeSlotBtn disabled={timeslots.length === 7} variant="info" className="btn-fill" onClick={() => addTimeslots()}>
            <FontAwesomeIcon color="white" icon={faPlusCircle} />
            &nbsp; Add new slot
          </StyledAddTimeSlotBtn>
        </Modal.Body>
        <Modal.Footer>
          <Button style={{margin: '30px 0'}}  variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button className="btn-fill" disabled={adding} onClick={handleAdd} type="submit" variant="success">Save</Button>
        </Modal.Footer>
      </StyledModal>
      <Container fluid>
        <Card>
          <Card.Header>
            <Card.Title as="h4">Edit Consultant Info</Card.Title>
          </Card.Header>
          <Card.Body>
            <TableContainer sx={{ margin: '20px 0'}} component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Enabled</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Chinese Name</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Phone</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {consultants.map((consul) => (
                    <TableRow
                      key={consul.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {consul.enabled ? "Yes" : "No"}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {consul.name}
                      </TableCell>
                      <TableCell>{consul.nameCN}</TableCell>
                      <TableCell>{consul.email}</TableCell>
                      <TableCell>{consul.phone}</TableCell>
                      <TableCell>
                        <Button
                          variant="info"
                          onClick={() => {
                            const temp = consultants.find((c) => c.id === consul.id);
                            setEditModalShow(true);
                            setEditId(temp?.id);
                            seteditName(temp?.name)
                            seteditNameCN(temp?.nameCN)
                            seteditEmail(temp?.email)
                            seteditPhone(temp?.phone)
                            seteditTimeslots(temp?.timeslots)
                            setEditEnabled(temp?.enabled)
                          }}
                        >
                          Edit
                        </Button>
                      </TableCell>
                      <TableCell><Button className="btn-fill" variant="danger" onClick={() => handleDelete(consul.id)}>Delete</Button></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Button
              className="btn-fill pull-right"
              variant="info"
              onClick={() => handleModalShow()}
            >
              <FontAwesomeIcon color="white" icon={faPlusCircle} />
              &nbsp; Add Consultant
            </Button>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default ConsultantView;
