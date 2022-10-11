import { firebaseApp } from './app.js';
import { getAuth } from 'firebase/auth';

export const auth = getAuth(firebaseApp);