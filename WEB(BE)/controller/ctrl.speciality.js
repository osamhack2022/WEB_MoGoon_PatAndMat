'use strict';
import { Result } from './ctrl.common.js';
import { db } from '../firebase/db.js';
import { collection, getDocs, doc, setDoc, query, where, getDoc } from 'firebase/firestore/lite';

const speciality_list = async (req, res) => {
    const result = new Result();

    try {
        const snapshot = await getDocs(collection(db, 'speciality'));
        const doc_list = snapshot.docs.map(doc => doc.data());

        result.success = true;
        result.data = doc_list;
    } catch (error) {
        result.success = false;
        result.err_code = error.code;
        result.err_msg = error.message;
    }

    return res.json(result);
}

const speciality_desc = async (req, res) => {
    const result = new Result();

    try {
        const speciality_name = req.params.speciality_name;
        const q = query(collection(db, 'speciality'), where("speciality_name", "==", speciality_name));
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
}

const add = async (req, res) => {
    const result = new Result();

    console.log(req.body);
    try {
        const docRef = await setDoc(doc(db, 'speciality', req.body['spc_name']), req.body);
        result.success = true;
    } catch (error) {
        result.error = error;
    }

    res.json(result);
}

export const ctrl_speciality = {
    get: {
        speciality_list,
        speciality_desc,
    },
    add,
};