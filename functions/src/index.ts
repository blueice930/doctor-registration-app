import initFirebase from './helpers/initFirebase';
import * as reservationHandler from './handlers/reservation';
import * as adminHandler from './handlers/admin';

initFirebase();

export const admin = adminHandler;
export const reservation = reservationHandler;
