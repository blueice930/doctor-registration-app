import React, { useState } from "react";
import {
  Backdrop, CircularProgress, Table, TableRow, TableCell, TableHead,
  TableBody, TableContainer, Paper, Switch, InputLabel, Select, MenuItem, OutlinedInput, Checkbox, ListItemText
} from '@mui/material'
import {
  Badge, Button,  Card,  Form,  Navbar,  Nav,  Container,  Row,  Col, Modal,
} from "react-bootstrap";
import styled from 'styled-components';

import { useReservation } from "src/contexts/ReservationContext";
import { deleteReservation, updateReservation } from "src/firebase";
import { CSVLink } from 'react-csv';

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

const StyledCsvBtn = styled(CSVLink)`
  background-color: #87CB16;
  padding: 8px 16px;
  border-radius: .25rem;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.5;
  color: white;
  transition: opacity .2s;

  :hover {
    color: white;
    opacity: .8;
  }
  :visited {
    color: white;
  }
  :focus {
    color: white;
  }
`

function TableList() {
  const {reservations, reload} = useReservation();
  const [deleting, setDeleting] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [editId, setEditId] = useState('');
  const [consultantId, setconsultantId] = useState('');
  const [patientName, setpatientName] = useState('');
  const [patientNameCN, setpatientNameCN] = useState('');
  const [editphone, seteditPhone] = useState('');
  const [date, setdate] = useState('');
  const [startTime, setstartTime] = useState('');
  const [duration, setduration] = useState('');
  const [memberId, setmemberId] = useState('');
  const [consultationNumber, setConsultationNumber] = useState('');

  const resetEditFields = () => {
    setEditId('');
    setconsultantId('');
    setpatientName('');
    setpatientNameCN('');
    seteditPhone('');
    setdate('');
    setstartTime('');
    setduration(15);
    setmemberId('');
    setConsultationNumber('');
    setUpdating(false);
    setEditModalShow(false);
  }

  const handleEdit = async (resUid) => {
    try {
      setUpdating(true);
      const res = await updateReservation({
        resUid,
        consultantId,
        patientName,
        patientNameCN,
        patientPhone: editphone,
        date,
        startTime,
        duration,
        consultationNumber,
        patientMemberId: memberId,
      });
      await reload();
      resetEditFields()
    } catch(e) {
      console.error(e)
    }
  };

  const handleDelete = async (resUid) => {
    setDeleting(true);
    const res = await deleteReservation({resUid});
    await reload();
    setDeleting(false);
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
          open={updating}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Modal.Header closeButton>
          <Modal.Title>Edit Reservation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label>Name</Form.Label>
          <Form.Control isInvalid={patientName === ""} value={patientName} onChange={(e) => setpatientName(e.target.value)} required type="text" placeholder="Enter name" />
          <Form.Label>Chinese Name</Form.Label>
          <Form.Control isInvalid={patientNameCN === ""} value={patientNameCN} onChange={(e) => setpatientNameCN(e.target.value)} required type="text" placeholder="Enter Chinese name" />
          <Form.Label>Phone</Form.Label>
          <Form.Control isInvalid={editphone === ""} value={editphone} onChange={(e) => seteditPhone(e.target.value)} required type="phone" placeholder="Enter phone number" />
          <Form.Label>Consultant ID</Form.Label>
          <Form.Control isInvalid={consultantId === ""} value={consultantId} onChange={(e) => setconsultantId(e.target.value)} required type="text" placeholder="Enter Consultant ID" />
          <Form.Label>Date</Form.Label>
          <Form.Control isInvalid={Date === ""} value={date} onChange={(e) => setdate(e.target.value)} required type="text" placeholder="Enter Date" />
          <Form.Label>Time</Form.Label>
          <Form.Control isInvalid={startTime === ""} value={startTime} onChange={(e) => setstartTime(e.target.value)} required type="text" placeholder="Enter Start Time" />
          <Form.Label>Duration</Form.Label>
          <Form.Control value={duration} onChange={(e) => setduration(e.target.value)} required type="number" placeholder="Enter Duration" />
          <Form.Label>Health Consultation Number</Form.Label>
          <Form.Control value={consultationNumber} onChange={(e) => setConsultationNumber(e.target.value)} required type="text" placeholder="Health consultation number" />
          <Form.Label>Member ID</Form.Label>
          <Form.Control value={memberId} onChange={(e) => setmemberId(e.target.value)} required type="text" placeholder="Enter Member ID" />
        </Modal.Body>
        <Modal.Footer>
          <Button style={{margin: '30px 0'}}  variant="secondary" onClick={() => setEditModalShow(false)}>
            Close
          </Button>
          <Button className="btn-fill" disabled={updating} onClick={() => handleEdit(editId)} type="submit" variant="success">Save</Button>
        </Modal.Footer>
      </StyledModal>
      <Container fluid>
        <Card>
          <Card.Header>
            <Card.Title as="h4">Reservation Table</Card.Title>
          </Card.Header>
          <Card.Body>
            <TableContainer sx={{ margin: '20px 0'}} component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Chinese Name</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Consultant ID</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Phone</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Time</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Consultation Number</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {reservations.map((reser) => (
                    <TableRow
                      key={reser.patientName}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {reser.patientName}
                      </TableCell>
                      <TableCell>{reser.patientNameCN}</TableCell>
                      <TableCell>{reser.consultantId}</TableCell>
                      <TableCell>{reser.patientPhone}</TableCell>
                      <TableCell>{reser.date}</TableCell>
                      <TableCell>{reser.startTime}</TableCell>
                      <TableCell sx={{ textAlign: 'right' }}>{reser.consultationNumber}</TableCell>
                      <TableCell>
                        <Button
                          variant="info"
                          onClick={() => {
                            const temp = reservations.find((r) => r.resUid === reser.resUid);
                            setEditModalShow(true);
                            setEditId(temp?.resUid);
                            setpatientName(temp?.patientName)
                            setpatientNameCN(temp?.patientNameCN)
                            setconsultantId(temp?.consultantId)
                            seteditPhone(temp?.patientPhone)
                            setdate(temp?.date)
                            setstartTime(temp?.startTime)
                            setduration(temp?.duration)
                            setConsultationNumber(temp?.consultationNumber)
                            setmemberId(temp?.patientMemberId)
                          }}
                        >
                          Edit
                        </Button>
                      </TableCell>
                      <TableCell><Button className="btn-fill" variant="success" onClick={() => handleDelete(reser.resUid)}>Delete</Button></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card.Body>
        </Card>
        <StyledCsvBtn
          filename={"export.csv"}
          data={reservations}
        >
          Export as csv
        </StyledCsvBtn>
      </Container>
    </>
  );
}

export default TableList;
