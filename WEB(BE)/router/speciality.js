import express from 'express';
import { db } from '../db/db.js';
import { collection, getDocs, doc, setDoc } from 'firebase/firestore/lite';

export const router_speciality = express.Router();

router_speciality.get('/list', async (req, res) => {
    const test_col = collection(db, 'speciality');
    const snapshot = await getDocs(test_col);
    const doc_list = snapshot.docs.map(doc => doc.data());
    
    //await setDoc(doc(db, 'speciality', `test${doc_list.length}`), doc_list[0]);
    return res.json(doc_list);
});

router_speciality.get('/list')