import { initializeApp } from 'firebase/app';
import { getFunctions, httpsCallable, connectFunctionsEmulator } from 'firebase/functions';
import { connectAuthEmulator, getAuth } from 'firebase/auth';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  projectId: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  storageBucket: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  messagingSenderId: process.env.REACT_APP_FIREBASE_APP_ID,
  appId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(config);

const functions = getFunctions(app, 'asia-southeast1');
export const auth = getAuth(app);

// local test purpose
connectFunctionsEmulator(functions, 'localhost', 5001);
connectAuthEmulator(auth, 'http://localhost:9099');
///

const makeReservation = httpsCallable(functions, 'reservation-makeReservation');

export {
  makeReservation,
};

export default app;
