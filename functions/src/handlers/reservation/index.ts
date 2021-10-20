import {firestore} from 'firebase-admin';
import {CallableContext} from 'firebase-functions/v1/https';
import {padStart, parseInt} from 'lodash';
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
  const duration = data?.duration;
  const consultationNumber = data?.consultationNumber;
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
    duration,
    consultationNumber,
    createdAt,
    updatedAt: createdAt,
  };

  const db = firestore();

  const otherReservationRef = db.collection('reservations');
  const otherReservationSnapshot = await otherReservationRef
      .where('date', '==', date).get();

  const occupiedSlots: string[] = [];
  otherReservationSnapshot.forEach((reser) => {
    occupiedSlots.push(reser.data().startTime);
  });

  if (occupiedSlots?.includes(startTime)) {
    throw new https.HttpsError('cancelled',
        'already-taken',
        'Action failed');
  }


  // App not open ////////
  const configSnapshot = await db.collection('configs').doc('basic').get();
  const configs = configSnapshot.data();
  const days = configs?.days || [];
  const appStartTime = configs?.startTime || '';
  const endTime = configs?.endTime || '';
  const [startHStr, startMStr] = appStartTime?.split(':');
  const startH = parseInt(startHStr);
  const startM = parseInt(startMStr);
  const [endHStr, endMStr] = endTime?.split(':');
  const endH = parseInt(endHStr);
  const endM = parseInt(endMStr);
  const isAppOn = configs?.isAppOn;
  const now = firestore.Timestamp.now().toDate();
  const nowDay = now.getDay();
  // GMT +8 Singapore time
  const nowH = now.getHours() + 8;
  const nowMin = now.getMinutes() + 8;
  const isBetween = () => {
    if (startH === endH && endH === nowH) {
      return startM <= nowMin && nowMin <= endM;
    }
    if (nowH === startH) return nowMin >= startM;
    if (nowH === endH) return nowMin <= endM;
    return startH <= nowH && nowH <= endH;
  };

  if (!(isAppOn && days.includes(nowDay) && isBetween())) {
    throw new https.HttpsError('cancelled',
        'app-not-available',
        'Action failed');
  }
  // end /////////

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
  const patientName = data?.patientName;
  const patientNameCN = data?.patientNameCN;
  const patientMemberId = data?.patientMemberId || '';
  const patientPhone = data?.patientPhone;
  const consultationNumber = data?.consultationNumber;
  const duration = data?.duration;
  const date = data?.date;
  const startTime = data?.startTime;
  const updatedAt = firestore.Timestamp.now().toMillis();
  // const isFirstVisit = data?.isFirstVisit;

  const db = firestore();
  const reservationRef = db.collection('reservations').doc(resUid);
  await reservationRef.update({
    consultantId,
    patientName,
    patientNameCN,
    patientMemberId,
    patientPhone,
    duration,
    consultationNumber,
    date,
    startTime,
    updatedAt,
    // isFirstVisit,
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
    firestore.Timestamp.now().toMillis();

    const reservationSnapshot = await reservationRef
        .orderBy('createdAt', 'desc')
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
        duration: data?.duration,
        consultationNumber: data?.consultationNumber,
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
  const date = data?.date;
  const consultantId = data?.consultantId;

  if (!(date&&consultantId)) {
    return {
      success: false,
      data: null,
    };
  }
  const db = firestore();
  const consultantSnapshot = await db.collection('consultants')
      .doc(consultantId).get();

  const reservationRef = db.collection('reservations');
  const reservationSnapshot = await reservationRef
      .where('date', '==', date).get();

  const availableSlots: string[] = [];
  const occupiedSlots: string[] = [];
  reservationSnapshot.forEach((reser) => {
    occupiedSlots.push(reser.data().startTime);
  });

  const timeslots = consultantSnapshot.data()?.timeslots;

  const start = timeslots?.start;
  const end = timeslots?.end;
  const duration = timeslots?.duration;

  const [startHStr, startMStr] = start?.split(':');
  let startH = parseInt(startHStr);
  let startM = parseInt(startMStr);
  const [endHStr, endMStr] = end?.split(':');
  const endH = parseInt(endHStr);
  const endM = parseInt(endMStr);
  while (endH > startH || (endH == startH && endM > startM)) {
    if (startM >= 60) {
      startH += 1;
      startM -=60;
    }
    // eslint-disable-next-line max-len
    availableSlots.push(`${padStart(startH.toString(), 2, '0')}:${padStart(startM.toString(), 2, '0')}`);
    startM += duration;
  }

  const result = availableSlots.filter((ts) => !occupiedSlots.includes(ts));
  const response: FunctionResponse = {
    success: true,
    data: result,
  };
  return response;
};

const setConfigsFn = async (data: any, context: CallableContext) => {
  if (!context.auth) {
    // Throwing an HttpsError cause authentication failed.
    throw new https.HttpsError('unauthenticated',
        'You are currently unauthenticated', 'Action failed');
  }
  const days = data?.days || [0, 1, 2, 3, 4, 5, 6];
  const startTime = data?.startTime || '09:00';
  const endTime = data?.endTime || '18:00';
  const isAppOn = data?.isAppOn;

  const db = firestore();
  const configRef = db.collection('configs').doc('basic');

  await configRef.set({
    days,
    startTime,
    endTime,
    isAppOn,
  }, {merge: true});

  const response: FunctionResponse = {
    success: true,
    data: null,
  };
  return response;
};

const getConfigsFn = async (data: any, context: CallableContext) => {
  const db = firestore();
  const configSnapshot = await db.collection('configs').doc('basic').get();

  const response: FunctionResponse = {
    success: true,
    data: configSnapshot.data(),
  };
  return response;
};

const getAppAvailabilityFn = async (data: any, context: CallableContext) => {
  const db = firestore();
  const configSnapshot = await db.collection('configs').doc('basic').get();

  const configs = configSnapshot.data();
  const days = configs?.days || [];
  const startTime = configs?.startTime || '';
  const endTime = configs?.endTime || '';
  const [startHStr, startMStr] = startTime?.split(':');
  const startH = parseInt(startHStr);
  const startM = parseInt(startMStr);
  const [endHStr, endMStr] = endTime?.split(':');
  const endH = parseInt(endHStr);
  const endM = parseInt(endMStr);
  const isAppOn = configs?.isAppOn;

  if (!isAppOn) {
    return false;
  }

  const now = firestore.Timestamp.now().toDate();
  const nowDay = now.getDay();
  // GMT +8 Singapore time
  const nowH = now.getHours() + 8;
  const nowMin = now.getMinutes() + 8;

  const isBetween = () => {
    if (startH === endH && endH === nowH) {
      return startM <= nowMin && nowMin <= endM;
    }
    if (nowH === startH) return nowMin >= startM;
    if (nowH === endH) return nowMin <= endM;
    return startH <= nowH && nowH <= endH;
  };

  if (days.includes(nowDay) && isBetween() ) {
    return true;
  }
  return false;
};

initFirebase();

const createReservation = functions.onCall(createReservationFn);
const getReservations = functions.onCall(getReservationsFn);
const updateReservation = functions.onCall(updateReservationFn);
const deleteReservation = functions.onCall(deleteReservationFn);
const getTimeslots = functions.onCall(getTimeslotsFn);
const setConfigs = functions.onCall(setConfigsFn);
const getConfigs = functions.onCall(getConfigsFn);
const getAppAvailability = functions.onCall(getAppAvailabilityFn);

export {
  createReservation,
  getReservations,
  updateReservation,
  deleteReservation,
  getTimeslots,
  setConfigs,
  getConfigs,
  getAppAvailability,
};
