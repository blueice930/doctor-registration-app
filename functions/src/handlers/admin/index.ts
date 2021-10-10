import {CallableContext} from 'firebase-functions/v1/https';
import initFirebase from '../../helpers/initFirebase';
import {functions} from '../../helpers/initFirebaseFunctions';

const getReservationsFn = async (data: any, context: CallableContext) => {
  return {
    reservations: [1, 2, 3],
  };
};

initFirebase();

const getReservations = functions.onCall(getReservationsFn);

export {getReservations};
