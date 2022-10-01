import express from 'express';
import { db } from '../firebase/db.js';
import { collection, getDocs, doc, setDoc, query, where } from 'firebase/firestore/lite';

export const router_speciality = express.Router();

router_speciality.get('/list', async (req, res) => {
    const speciality_collection = collection(db, 'speciality');
    const snapshot = await getDocs(speciality_collection);
    const doc_list = snapshot.docs.map(doc => doc.data());
    
    //await setDoc(doc(db, 'speciality', `test${doc_list.length}`), doc_list[0]);
    return res.json(doc_list);
});

router_speciality.get('/list/:speciality_name', async (req, res) => {
    const speciality_name = req.params.speciality_name;
    const speciality_collection = collection(db, 'speciality');
    const q = query(speciality_collection, where("speciality_name", "==", speciality_name));
    const snapshot = await getDocs(q);
    const doc_list = snapshot.docs.map(doc => doc.data());

    if (doc_list.length == 0) {
    }

    return res.json(doc_list);
});