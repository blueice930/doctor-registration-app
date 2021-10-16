import {firestore} from 'firebase-admin';
import {CallableContext} from 'firebase-functions/v1/https';
import shortid from 'shortid';
import initFirebase from '../../helpers/initFirebase';
import {functions, https} from '../../helpers/initFirebaseFunctions';
import {FunctionResponse} from '../../helpers/types';
import {Consultant} from './types';

const getConsultantsFn = async (data: any, context: CallableContext) => {
  if (!context.auth) {
    // Throwing an HttpsError cause authentication failed.
    throw new https.HttpsError('unauthenticated',
        'You are currently unauthenticated', 'Action failed');
  }

  const consultants: Consultant[] = [];
  const db = firestore();
  const consultantRef = db.collection('consultants');

  try {
    const consultantSnapshot = await consultantRef
        .orderBy('id', 'asc')
        .get();
    consultantSnapshot.forEach((consulData) => {
      const data = consulData.data();
      const consultant = {
        id: data?.id,
        name: data?.name,
        nameCN: data?.nameCN,
        email: data?.email,
        phone: data?.phone,
        timeslots: data?.timeslots,
      };
      consultants.push(consultant);
    });
  } catch (e) {
    if (e instanceof Error) {
      throw new https.HttpsError('unknown',
          'Error getting documents', e?.message);
    }
  }

  const response: FunctionResponse = {
    success: true,
    data: consultants,
  };
  return response;
};

const updateConsultantFn = async (data: any, context: CallableContext) => {
  if (!context.auth) {
    // Throwing an HttpsError cause authentication failed.
    throw new https.HttpsError('unauthenticated',
        'You are currently unauthenticated', 'Action failed');
  }

  const id = data?.id;
  const name = data?.name;
  const nameCN = data?.nameCN;
  const email = data?.email;
  const phone = data?.phone;
  const timeslots = data?.timeslots;

  const db = firestore();
  const consultantRef = db.collection('consultants').doc(id);
  await consultantRef.update({
    name,
    nameCN,
    email,
    phone,
    timeslots,
  });

  const response: FunctionResponse = {
    success: true,
    data: null,
  };
  return response;
};

const deleteConsultantFn = async (data: any, context: CallableContext) => {
  if (!context.auth) {
    // Throwing an HttpsError cause authentication failed.
    throw new https.HttpsError('unauthenticated',
        'You are currently unauthenticated', 'Action failed');
  }

  const id = data?.id;
  const db = firestore();
  const consultantRef = db.collection('consultants').doc(id);
  await consultantRef.delete();

  const response: FunctionResponse = {
    success: true,
    data: null,
  };
  return response;
};

const createConsultantFn = async (data: any, context: CallableContext) => {
  if (!context.auth) {
    // Throwing an HttpsError cause authentication failed.
    throw new https.HttpsError('unauthenticated',
        'You are currently unauthenticated', 'Action failed');
  }

  const id = shortid.generate();
  const name = data?.name;
  const nameCN = data?.nameCN;
  const email = data?.email;
  const phone = data?.phone;
  const timeslots = data?.timeslots;

  const consultant: Consultant = {
    id,
    name,
    nameCN,
    email,
    phone,
    timeslots,
  };

  const db = firestore();
  const consultantRef = db.collection('consultants').doc(id);
  await consultantRef.set(consultant);

  const response: FunctionResponse = {
    success: true,
    data: null,
  };
  return response;
};

initFirebase();

const getConsultants = functions.onCall(getConsultantsFn);
const createConsultant = functions.onCall(createConsultantFn);
const deleteConsultant = functions.onCall(deleteConsultantFn);
const updateConsultant = functions.onCall(updateConsultantFn);

export {
  getConsultants,
  createConsultant,
  deleteConsultant,
  updateConsultant,
};
