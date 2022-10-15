'use strict';
import { Result } from './ctrl.common.js';
import { db } from '../firebase/db.js';
import { collection, getDocs, query, where, addDoc } from 'firebase/firestore/lite';

const speciality_questions = async (req, res) => {
    const result = new Result();

    try {
        const speciality_name = req.params.speciality_name;
        const military_kind = req.params.military_kind;

        const q = query(collection(db, 'speciality_qna'), 
                        where("speciality_name", "==", speciality_name),
                        where("military_kind", "==", military_kind));
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
            result.success = false;
            result.err_code = "-1";
            result.err_msg = "no speciality, check speciality name";
        }
        else {
            const doc_list = snapshot.docs.map(doc => doc.id);
            const questions_doc = doc_list[0];
            const snapshot2 = await getDocs(query(collection(db, `speciality_qna/${questions_doc}/questions`)));
            if (snapshot2.empty) {
                result.success = false;
                result.data = {};
                result.err_code = "-1";
                result.err_msg = "no question";
            }
            else {
                const question_list = snapshot2.docs.map((doc) =>{
                    const data = doc.data()
                    data.question_id = doc.id;
                    return data;
                });
                result.success = true;
                result.data = question_list;
            }
        }
    } catch (error) {
        result.success = false;
        result.err_code = error.code;
        result.err_msg = error.message;
        console.log(error);
    }

    return res.json(result);
};

const speciality_answers = async (req, res) => {
    const result = new Result();

    try {
        const speciality_name = req.params.speciality_name;
        const military_kind = req.params.military_kind;
        const question_code = req.params.question_code;

        const q = query(collection(db, 'speciality_qna'), 
                        where("speciality_name", "==", speciality_name),
                        where("military_kind", "==", military_kind));
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
            result.success = false;
            result.err_code = "-1";
            result.err_msg = "no speciality, check speciality name";
        }
        else {
            const doc_list = snapshot.docs.map(doc => doc.id);
            const questions_doc = doc_list[0];
            const snapshot2 = await getDocs(query(collection(db, `speciality_qna/${questions_doc}/questions/${question_code}/answers`)));
            if (snapshot2.empty) {
                result.success = false;
                result.data = {};
                result.err_code = "-1";
                result.err_msg = "no question";
            }
            else {
                const question_list = snapshot2.docs.map(doc => doc.data());
                result.success = true;
                result.data = question_list;
            }
        }
    } catch (error) {
        result.success = false;
        result.err_code = error.code;
        result.err_msg = error.message;
        console.log(error);
    }

    return res.json(result);
};

const speciality_question = async (req, res) => {
    const result = new Result();

    try {
        const speciality_name = req.params.speciality_name;
        const military_kind = req.params.military_kind;

        const q = query(collection(db, 'speciality_qna'), 
                        where("speciality_name", "==", speciality_name),
                        where("military_kind", "==", military_kind));
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
            result.success = false;
            result.err_code = "-1";
            result.err_msg = "no speciality, check speciality name";
        }
        else {
            const doc_list = snapshot.docs.map(doc => doc.id);
            const questions_doc = doc_list[0];
            const docRef = await addDoc(collection(db, `speciality_qna/${questions_doc}/questions`), req.body);
            result.success = true;
        }
    } catch (error) {
        result.success = false;
        result.err_code = error.code;
        result.err_msg = error.message;
        console.log(error);
    }

    return res.json(result);
};

const speciality_answer = async (req, res) => {
    const result = new Result();

    try {
        const speciality_name = req.params.speciality_name;
        const military_kind = req.params.military_kind;
        const question_code = req.params.question_code;

        const q = query(collection(db, 'speciality_qna'), 
                        where("speciality_name", "==", speciality_name),
                        where("military_kind", "==", military_kind));
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
            result.success = false;
            result.err_code = "-1";
            result.err_msg = "no speciality, check speciality name";
        }
        else {
            const doc_list = snapshot.docs.map(doc => doc.id);
            const questions_doc = doc_list[0];
            const docRef = await addDoc(collection(db, `speciality_qna/${questions_doc}/questions/${question_code}/answers`), req.body);
            result.success = true;
            
        }
    } catch (error) {
        result.success = false;
        result.err_code = error.code;
        result.err_msg = error.message;
        console.log(error);
    }

    return res.json(result);
};

export const ctrl_speciality_question = {
    get: {
        speciality_questions,
        speciality_answers,
    },
    post: {
        speciality_question,
        speciality_answer,
    },
};