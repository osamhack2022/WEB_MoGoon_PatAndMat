import { firebaseApp } from './app.js';
import { getAuth, setPersistence } from 'firebase/auth';

export const auth = getAuth(firebaseApp);