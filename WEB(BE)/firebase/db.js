import { firebaseApp } from './app.js';
import { getFirestore } from 'firebase/firestore/lite';

export const db = getFirestore(firebaseApp);