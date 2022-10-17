'use strict';
import { Result, cookieOption } from './ctrl.common.js';
import { adminAuth } from '../firebase/admin.js';
import { db } from '../firebase/db.js';
import { collection, getDocs, doc, updateDoc, query, where, getDoc, addDoc, DocumentReference, increment } from 'firebase/firestore/lite';

const user_info = async (req, res) => {
    const result = new Result();
    const [ auth_type, id_token ] = req.headers.authorization.split(' ');
    if (!!id_token) {
        const decodedToken = await adminAuth.verifyIdToken(id_token);
        const email = decodedToken.email;
        const user_doc = await getDoc(doc(db, "user", email));
        if (user_doc.exists()) {
            result.data = user_doc.data();
        }
        else {
            result.success = false;
            result.err_code = '-1';
            result.err_msg = 'no user data, check user email';
        }
    }
    else {
        result.success = false;
        result.err_code = '-1';
        result.err_msg = 'no id_token, check id_token in cookie';
    }
    return res.json(result);
    //return res.json(req);
};

export const ctrl_user = {
    get: {
        user_info,
    },
};