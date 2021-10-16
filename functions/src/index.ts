import initFirebase from './helpers/initFirebase';
import * as reservationHandler from './handlers/reservation';
import * as consultantHandler from './handlers/consultant';

initFirebase();

export const consultant = consultantHandler;
export const reservation = reservationHandler;
