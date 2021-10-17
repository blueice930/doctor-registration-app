import {firestore} from 'firebase-admin';
import {CallableContext} from 'firebase-functions/v1/https';
import {v4 as uuidv4} from 'uuid';
import initFirebase from '../../helpers/initFirebase';
import {functions, https} from '../../helpers/initFirebaseFunctions';
import {FunctionResponse} from '../../helpers/types';
import {Reservation} from './types';

// Create
const createReservationFn = async (data: any, context: CallableContext) => {
  const resUid = uuidv4();
  const consultantId = data?.consultantId;
  const patientName = data?.patientName;
  const patientNameCN = data?.patientNameCN;
  const patientMemberId = data?.patientMemberId || '';
  const isFirstVisit = data?.isFirstVisit || true;
  const patientPhone = data?.patientPhone;
  const date = data?.date;
  const startTime = data?.startTime;
  const endTime = data?.endTime;
  const duration = data?.duration;
  const createdAt = firestore.Timestamp.now().toMillis();

  const reservation: Reservation = {
    resUid,
    consultantId,
    patientName,
    patientNameCN,
    patientMemberId,
    isFirstVisit,
    patientPhone,
    date,
    startTime,
    endTime,
    duration,
    createdAt,
    updatedAt: createdAt,
  };

  const db = firestore();
  const reservationRef = db.collection('reservations').doc(resUid);
  await reservationRef.set(reservation);

  const response: FunctionResponse = {
    success: true,
    data: null,
  };
  return response;
};

// Update
const updateReservationFn = async (data: any, context: CallableContext) => {
  if (!context.auth) {
    // Throwing an HttpsError cause authentication failed.
    throw new https.HttpsError('unauthenticated',
        'You are currently unauthenticated', 'Action failed');
  }

  const resUid = data?.resUid;
  const consultantId = data?.consultantId;
  const patientName = data?.name;
  const patientNameCN = data?.nameCN;
  const patientMemberId = data?.memberId || '';
  const isFirstVisit = data?.isFirstVisit || true;
  const patientPhone = data?.phone;
  const date = data?.date;
  const time = data?.time;
  const updatedAt = firestore.Timestamp.now().toMillis();

  const db = firestore();
  const reservationRef = db.collection('reservations').doc(resUid);
  await reservationRef.update({
    consultantId,
    patientName,
    patientNameCN,
    patientMemberId,
    isFirstVisit,
    patientPhone,
    date,
    time,
    updatedAt,
  });

  const response: FunctionResponse = {
    success: true,
    data: null,
  };
  return response;
};

const deleteReservationFn = async (data: any, context: CallableContext) => {
  if (!context.auth) {
    // Throwing an HttpsError cause authentication failed.
    throw new https.HttpsError('unauthenticated',
        'You are currently unauthenticated', 'Action failed');
  }
  const resUid = data?.resUid;

  const db = firestore();
  const reservationRef = db.collection('reservations').doc(resUid);

  await reservationRef.delete();

  const response: FunctionResponse = {
    success: true,
    data: null,
  };
  return response;
};

const getReservationsFn = async (data: any, context: CallableContext) => {
  if (!context.auth) {
    // Throwing an HttpsError cause authentication failed.
    throw new https.HttpsError('unauthenticated',
        'You are currently unauthenticated', 'Action failed');
  }
  const cursor = data?.cursorId;
  const reservations: Reservation[] = [];
  const db = firestore();
  const reservationRef = db.collection('reservations');

  try {
    const cursorRef = cursor ?
    (await reservationRef.where('uid', '==', cursor).get()).docs[0] :
    0;

    const reservationSnapshot = await reservationRef
        .orderBy('createdAt', 'asc')
        .startAfter(cursorRef)
        .limit(100)
        .get();
    reservationSnapshot.forEach((reserData) => {
      const data = reserData.data();
      const reservation = {
        resUid: data?.resUid,
        consultantId: data?.consultantId,
        patientName: data?.patientName,
        patientNameCN: data?.patientNameCN,
        patientMemberId: data?.patientMemberId,
        isFirstVisit: data?.isFirstVisit,
        patientPhone: data?.patientPhone,
        date: data?.date,
        startTime: data?.startTime,
        endTime: data?.endTime,
        duration: data?.duration,
        createdAt: data?.createdAt,
        updatedAt: data?.updatedAt,
      };
      reservations.push(reservation);
    });
  } catch (e) {
    if (e instanceof Error) {
      throw new https.HttpsError('unknown',
          'Error getting documents', e?.message);
    }
  }
  const response: FunctionResponse = {
    success: true,
    data: reservations,
  };
  return response;
};

const getTimeslotsFn = async (data: any, context: CallableContext) => {
  const timeslots: string[] = [];
  const response: FunctionResponse = {
    success: true,
    data: timeslots,
  };
  return response;
};


initFirebase();

const createReservation = functions.onCall(createReservationFn);
const getReservations = functions.onCall(getReservationsFn);
const updateReservation = functions.onCall(updateReservationFn);
const deleteReservation = functions.onCall(deleteReservationFn);
const getTimeslots = functions.onCall(getTimeslotsFn);

export {
  createReservation,
  getReservations,
  updateReservation,
  deleteReservation,
  getTimeslots,
};
