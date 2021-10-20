import React, { useState } from "react";

// react-bootstrap components
import {
  Badge, Button,  Card,  Form,  Navbar,  Nav,  Container,  Row,  Col, Modal,
} from "react-bootstrap";
import {
  Backdrop, CircularProgress, Table, TableRow, TableCell, TableHead,
  TableBody, TableContainer, Paper, Switch, InputLabel, Select, MenuItem, OutlinedInput, Checkbox, ListItemText
} from "@mui/material";

import styled from 'styled-components';
import {range, padStart, isEmpty} from 'lodash';
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

export const getDayText = (day) => {
  switch (day) {
    case 0:
      return 'Sun'
    case 1:
      return 'Mon'
    case 2:
      return 'Tue'
    case 3:
      return 'Wed'
    case 4:
      return 'Thu'
    case 5:
      return 'Fri'
    case 6:
      return 'Sat'
    default:
      return '';
  }
}

const renderTimeOptions = () => {
  const res = [];
  range(7, 19).map((h) => {
      res.push(<MenuItem value={`${padStart(h, 2, '0')}:00`}>{`${padStart(h, 2, '0')}:00`}</MenuItem>)
      res.push(<MenuItem value={`${padStart(h, 2, '0')}:30`}>{`${padStart(h, 2, '0')}:30`}</MenuItem>)
  })
  return res;
}

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
  const [timeslots, setTimeslots] = useState({day: [1,2,3,4,5], duration: 15, start: '08:00', end: '18:00'});
  const [edittimeslots, seteditTimeslots] = useState({day: [1,2,3,4,5], duration: 15, start: '08:00', end: '18:00'});
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
    setTimeslots({day: [1,2,3,4,5], duration: 15, start: '08:00', end: '18:00'});
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
    seteditTimeslots({day: [1,2,3,4,5], duration: 15, start: '08:00', end: '18:00'});
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

  const updateTimeslots = (field, value) => {
    if (!isEmpty(timeslots)) {
      const temp = {...timeslots};
      temp[field] = value
      setTimeslots(temp);
    }
  }

  const updateEditTimeslots = (field, value) => {
    if (!isEmpty(edittimeslots)) {
      const temp = {...edittimeslots};
      temp[field] = value
      seteditTimeslots(temp);
    }
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
          <div>
            <div>
              <InputLabel id="edit-duration-select-required-label">Duration *</InputLabel>
              <Select
                labelId="eidtduration-select-required-label"
                id="duration-select-required"
                value={edittimeslots?.duration || 15}
                label="Duration *"
                onChange={(e) => updateEditTimeslots('duration', e.target.value)}
                sx={{width: '100%'}}
                displayEmpty
              >
                <MenuItem value={10}>10 minutes</MenuItem>
                <MenuItem value={15}>15 minutes</MenuItem>
                <MenuItem value={20}>20 minutes</MenuItem>
                <MenuItem value={30}>30 minutes</MenuItem>
                <MenuItem value={60}>1 hour</MenuItem>
              </Select>
            </div>
            <div>
              <InputLabel id="edit-day-multiple-checkbox-label">Day</InputLabel>
              <Select
                labelId="edit-day-multiple-checkbox-label"
                id="edit-day-multiple-checkbox"
                multiple
                value={edittimeslots?.day || [1,2,3,4,5]}
                onChange={(e) => updateEditTimeslots('day', e.target.value)}
                input={<OutlinedInput label="Tag" />}
                renderValue={(selected) => selected?.sort()?.map((d) => getDayText(d))?.join(', ')}
                sx={{width: '100%'}}
              >
                {[0,1,2,3,4,5,6].map((day) => (
                  <MenuItem key={day} value={day}>
                    <Checkbox checked={edittimeslots?.day?.indexOf(day) > -1} />
                    <ListItemText primary={getDayText(day)} />
                  </MenuItem>
                ))}
              </Select>
            </div>
            <div>
              <InputLabel id="edit-start-select-required-label">Start Time*</InputLabel>
              <Select
                labelId="edit-start-select-required-label"
                id="edit-start-select-required"
                value={edittimeslots?.start || '08:00'}
                label="Start Time*"
                onChange={(e) => updateEditTimeslots('start', e.target.value)}
                sx={{width: '100%'}}
              >
                {renderTimeOptions()}
              </Select>
            </div>
            <div>
              <InputLabel id="edit-end-select-required-label">End Time*</InputLabel>
              <Select
                labelId="edit-end-select-required-label"
                id="edit-end-select-required"
                value={edittimeslots?.end || '18:00'}
                label="End Time*"
                onChange={(e) => updateEditTimeslots('end', e.target.value)}
                sx={{width: '100%'}}
              >
                {renderTimeOptions()}
              </Select>
            </div>
          </div>
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
          <div>
            <div>
              <InputLabel id="duration-select-required-label">Duration *</InputLabel>
              <Select
                labelId="duration-select-required-label"
                id="duration-select-required"
                value={timeslots?.duration || 15}
                label="Duration *"
                onChange={(e) => updateTimeslots('duration', e.target.value)}
                sx={{width: '100%'}}
              >
                <MenuItem value={10}>10 minutes</MenuItem>
                <MenuItem value={15}>15 minutes</MenuItem>
                <MenuItem value={20}>20 minutes</MenuItem>
                <MenuItem value={30}>30 minutes</MenuItem>
                <MenuItem value={60}>1 hour</MenuItem>
              </Select>
            </div>
            <div>
              <InputLabel id="day-multiple-checkbox-label">Day</InputLabel>
              <Select
                labelId="day-multiple-checkbox-label"
                id="day-multiple-checkbox"
                multiple
                value={timeslots?.day || [1,2,3,4,5]}
                onChange={(e) => updateTimeslots('day', e.target.value)}
                input={<OutlinedInput label="Tag" />}
                renderValue={(selected) => selected?.sort()?.map((d) => getDayText(d))?.join(', ')}
                sx={{width: '100%'}}
              >
                {[0,1,2,3,4,5,6].map((day) => (
                  <MenuItem key={day} value={day}>
                    <Checkbox checked={timeslots?.day?.indexOf(day) > -1} />
                    <ListItemText primary={getDayText(day)} />
                  </MenuItem>
                ))}
              </Select>
            </div>
            <div>
              <InputLabel id="start-select-required-label">Start Time*</InputLabel>
              <Select
                labelId="start-select-required-label"
                id="start-select-required"
                value={timeslots?.start || '08:00'}
                label="Start Time*"
                onChange={(e) => updateTimeslots('start', e.target.value)}
                sx={{width: '100%'}}
              >
                {renderTimeOptions()}
              </Select>
            </div>
            <div>
              <InputLabel id="end-select-required-label">End Time*</InputLabel>
              <Select
                labelId="end-select-required-label"
                id="end-select-required"
                value={timeslots?.end || '18:00'}
                label="End Time*"
                onChange={(e) => updateTimeslots('end', e.target.value)}
                sx={{width: '100%'}}
              >
                {renderTimeOptions()}
              </Select>
            </div>
          </div>
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
