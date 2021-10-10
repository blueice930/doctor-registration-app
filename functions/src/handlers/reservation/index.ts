import {CallableContext} from 'firebase-functions/v1/https';
import initFirebase from '../../helpers/initFirebase';
import {functions} from '../../helpers/initFirebaseFunctions';

const makeReservationFn = async (data: any, context: CallableContext) => {
  return {
    success: true,
  };
};

initFirebase();

const makeReservation = functions.onCall(makeReservationFn);

export {makeReservation};
