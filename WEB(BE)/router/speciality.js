import express from 'express';
import { db } from '../firebase/db.js';
import { collection, getDocs, doc, setDoc,addDoc } from 'firebase/firestore/lite';

export const router_speciality = express.Router();

router_speciality.get('/list', async (req, res) => {
    const test_col = collection(db, 'speciality');
    const snapshot = await getDocs(test_col);
    const doc_list = snapshot.docs.map(doc => doc.data());
    
    return res.json(doc_list);
});

router_speciality.get('/list')