import { initializeApp } from 'firebase/app';
import { getFunctions, httpsCallable, connectFunctionsEmulator } from 'firebase/functions';
import { connectAuthEmulator, getAuth } from 'firebase/auth';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(config);

const functions = getFunctions(app, 'asia-southeast1');
export const auth = getAuth(app);

// local test purpose
if (window.location.hostname === 'localhost') {
  connectFunctionsEmulator(functions, 'localhost', 5001);
  connectAuthEmulator(auth, 'http://localhost:9099');
}

const createReservation = httpsCallable(functions, 'reservation-createReservation');
const updateReservation = httpsCallable(functions, 'reservation-updateReservation');
const deleteReservation = httpsCallable(functions, 'reservation-deleteReservation');
const getReservations = httpsCallable(functions, 'reservation-getReservations');
const getTimeslots = httpsCallable(functions, 'reservation-getTimeslots');

const createConsultant = httpsCallable(functions, 'consultant-createConsultant');
const getConsultants = httpsCallable(functions, 'consultant-getConsultants');
const updateConsultant = httpsCallable(functions, 'consultant-updateConsultant');
const deleteConsultant = httpsCallable(functions, 'consultant-deleteConsultant');

export {
  createReservation,
  updateReservation,
  deleteReservation,
  getReservations,
  getTimeslots,
  createConsultant,
  getConsultants,
  updateConsultant,
  deleteConsultant,
};

export default app;
