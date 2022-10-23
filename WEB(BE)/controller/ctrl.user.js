'use strict';
import { Result, cookieOption } from './ctrl.common.js';
import { adminAuth } from '../firebase/admin.js';
import { db } from '../firebase/db.js';
import { collection, getDocs, doc, updateDoc, query, where, getDoc, addDoc, DocumentReference, increment } from 'firebase/firestore/lite';

const user_info = async (req, res) => {
    const result = new Result();
    try {
        const [ auth_type, id_token ] = req.headers.authorization.split(' ');
        if (!!id_token) {
            const decodedToken = await adminAuth.verifyIdToken(id_token);
            const email = decodedToken.email;
            const user_doc = await getDoc(doc(db, "user", email));
            if (user_doc.exists()) {
                const data = user_doc.data();
                const favorite_list = data.favorite_speciality;
                const snapshot = await getDocs(collection(db, 'speciality'));
                const list = snapshot.docs.filter((doc) => {
                    return favorite_list.includes(doc.id); 
                }).map((doc) => doc.data());
                
                data.favorite_speciality = list;
                result.success = true;
                result.data = data;
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
    } catch (error) {
        result.success = false;
        result.err_code = error.code;
        result.err_msg = error.message;
    }

    return res.json(result);
};

const update_user_en_info = async (req, res) => {
    const result = new Result();
    const info_type = req.params.info_type;

    try {
        if (!req.headers.authorization) {
            console.log(req.headers.authorization);
            result.success = false;
            result.err_code = 'user/en-info/no-token';
            result.err_msg = 'no id_token, check id_token in authorization header';
            return res.json(result);
        }
    
        const [token_type, ID_TOKEN] = req.headers.authorization.split(' ');
        const decodedToken = await adminAuth.verifyIdToken(ID_TOKEN);

        const email = decodedToken.email;
        const user_doc = await getDoc(doc(db, "user", email));

        if (user_doc.exists()) {
            const user_ref = user_doc.ref;
            const update_data = {};
            update_data[info_type] = req.body;
            console.log(update_data);
            await updateDoc(user_ref, update_data);

            result.success = true;
        }
        else {
            result.success = false;
            result.err_code = '-1';
            result.err_msg = 'no user data, check user email';
        }

    } catch (error) {
        result.success = false;
        result.err_code = error.code;
        result.err_msg = error.message;
    }

    return res.json(result);
};

export const ctrl_user = {
    get: {
        user_info,
    },
    put: {
        update_user_en_info,
    }
};