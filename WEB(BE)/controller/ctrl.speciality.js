'use strict';
import { Result } from './ctrl.common.js';
import { db } from '../firebase/db.js';
import { collection, getDocs, doc, setDoc, query, where, getDoc, addDoc } from 'firebase/firestore/lite';

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
        const military_kind = req.params.military_kind;
        const q = query(collection(db, 'speciality'), where("speciality_name", "==", speciality_name));
        const snapshot = await getDocs(q);
        const doc_list = snapshot.docs.map(doc => doc.data());

        if (doc_list.length == 0) {
            result.success = false;
            result.err_code = "-1";
            result.err_msg = "no speciality, check speciality name";
        }
        else {
            let document = undefined;
            doc_list.forEach(doc => {
                if (doc.military_kind == military_kind)
                    document = doc;
            });

            if (document === undefined) {
                result.success = false;
                result.err_code = "-1";
                result.err_msg = "found speciality but not for that military_kind, check military_kind";
            }
            else {
                const q = query(collection(db, 'speciality_desc'), 
                                where("speciality_name", "==", speciality_name),
                                where("military_kind", "==", military_kind));
                const snapshot = await getDocs(q);
                const docs = snapshot.docs.map(doc => doc.data());
                console.log(docs);

                if (docs.length == 1) {
                    Object.assign(document, docs[0]);
                    result.success = true;
                    result.data = document;
                }
                else {
                    result.success = false;
                    result.err_code = "-1";
                    result.err_msg = "no speciality_desc, check speciality name or military_kind";
                }
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
        const docRef = await addDoc(collection(db, 'speciality'), req.body);
        result.success = true;
    } catch (error) {
        result.error = error;
    }

    res.json(result);
}

const add_desc = async (req, res) => {
    const result = new Result();

    console.log(req.body);
    try {
        const docRef = await addDoc(collection(db, 'speciality_desc'), req.body);
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
    add_desc,
};