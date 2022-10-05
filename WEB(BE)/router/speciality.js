import express from 'express';
import { db } from '../firebase/db.js';
import { collection, getDocs, doc, setDoc, query, where, getDoc } from 'firebase/firestore/lite';

export const router_speciality = express.Router();

router_speciality.get('/list', async (req, res) => {
    const result = {
        success: false,
        data: null,
        err_code: null,
        err_msg: null
    };

    try {
        const speciality_collection = collection(db, 'speciality');
        const snapshot = await getDocs(speciality_collection);
        const doc_list = snapshot.docs.map(doc => doc.data());

        result.success = true;
        result.data = doc_list;
    } catch (error) {
        result.success = false;
        result.err_code = error.code;
        result.err_msg = error.message;
    }

    return res.json(result);
});

router_speciality.get('/list/:speciality_name', async (req, res) => {

    const result = {
        success: false,
        data: null,
        err_code: null,
        err_msg: null
    };

    try {
        const speciality_name = req.params.speciality_name;
        const speciality_collection = collection(db, 'speciality');
        const q = query(speciality_collection, where("speciality_name", "==", speciality_name));
        const snapshot = await getDocs(q);
        const doc_list = snapshot.docs.map(doc => doc.data());
        
        const speciality_doc = doc(db, 'speciality_desc', speciality_name);
        const doc_snap = await getDoc(speciality_doc);

        if (doc_list.length == 0) {
            result.success = false;
            result.err_code = "-1";
            result.err_msg = "no speciality, check speciality name";
        }
        else {
            const document = doc_list[0];
            if (doc_snap.exists()) {
                Object.assign(document, doc_snap.data());
                result.success = true;
                result.data = document;
            }
            else {
                result.success = false;
                result.err_code = "-1";
                result.err_msg = "no speciality_desc, check speciality name";
            }
        }
   
    } catch (error) {
        result.success = false;
        result.err_code = error.code;
        result.err_msg = error.message;
        console.log(error);
    }

    return res.json(result);
});