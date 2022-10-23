'use strict';
import { Result } from './ctrl.common.js';
import { db } from '../firebase/db.js';
import { collection, getDocs, doc, updateDoc, query, where, getDoc, addDoc, DocumentReference, increment, arrayUnion, arrayRemove, serverTimestamp } from 'firebase/firestore/lite';
import { adminAuth } from '../firebase/admin.js';

const speciality_list = async (req, res) => {
    const result = new Result();
    const refresh_token = req.cookies.refresh_token;
    
    let auth_type = undefined;
    let id_token = undefined;

    if (!!req.headers.authorization) {
        [ auth_type, id_token ] = req.headers.authorization.split(' ');
    }

    try {
        let user_data = undefined;

        if (!!id_token) {
            const decodedToken = await adminAuth.verifyIdToken(id_token);
            const email = decodedToken.email;
            const user_doc = await getDoc(doc(db, "user", email));
            if (user_doc.exists()) {
                user_data = user_doc.data();
            }
        }

        const snapshot = await getDocs(collection(db, 'speciality'));
        const doc_list = snapshot.docs.map((doc) => {
            const doc_data = doc.data();
            doc_data.is_favorite = user_data !== undefined && user_data.favorite_speciality.includes(doc.id);
            return doc_data;
        });

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
        const q = query(collection(db, 'speciality'), 
                        where("speciality_name", "==", speciality_name),
                        where("military_kind", "==", military_kind));
        const snapshot = await getDocs(q);
        const doc_list = snapshot.docs.map(doc => doc.data());

        if (doc_list.length == 0) {
            result.success = false;
            result.err_code = "-1";
            result.err_msg = "no speciality, check speciality name";
        }
        else {
            let document = doc_list[0];

            const q = query(collection(db, 'speciality_desc'), 
                            where("speciality_name", "==", speciality_name),
                            where("military_kind", "==", military_kind));

            const snapshot = await getDocs(q);
            const docs = snapshot.docs.map(doc => doc.data());
            const desc_data = docs[0];
            
            for (let i = 0; i < desc_data.contents.length; i++) {
                const now_content = desc_data.contents[i];
                for (let j = 0; j < now_content.content.length; j ++) {
                    const now_data = now_content.content[j];
                    if (now_data instanceof DocumentReference) {
                        const snapshot = await getDoc(now_data);
                        const data = await snapshot.data();
                        desc_data.contents[i].content[j] = data;
                    }
                }
            }

            if (docs.length == 1) {
                Object.assign(document, desc_data);
                result.success = true;
                result.data = document;
            }
            else {
                result.success = false;
                result.err_code = "-1";
                result.err_msg = "no speciality_desc, check speciality name or military_kind";
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

const speciality_like = async (req, res) => {
    const result = new Result();
    try {
        const speciality_name = req.params.speciality_name;
        const military_kind = req.params.military_kind;
        const is_increase = req.params.is_increase;

        if (!req.headers.authorization) {
            result.success = false;
            result.err_code = 'user/no-authorization-header';
            result.err_msg = 'check authorization header';

            return res.json(result);
        }

        const [ auth_type, id_token ] = req.headers.authorization.split(' ');
        if (!id_token) {
            result.success = false;
            result.err_code = 'user/no-token';
            result.err_msg = 'no id_token, check id_token in authorization header';

            return res.json(result);
        }

        const decodedToken = await adminAuth.verifyIdToken(id_token);
        const email = decodedToken.email;
        const user_doc = await getDoc(doc(db, "user", email));
        if (!user_doc.exists()) {
            result.success = false;
            result.err_code = 'user/no-email';
            result.err_msg = '토큰 내 유저 이메일이 디비에 존재하지 않습니다.';
            return res.json(result);
        }

        const q = query(collection(db, 'speciality'), 
                            where("speciality_name", "==", speciality_name),
                            where("military_kind", "==", military_kind));
        const snapshot = await getDocs(q);
        
        if (snapshot.empty) {
            result.success = false;
            result.err_code = "specialtiy/not-found"
            result.err_msg = "해당하는 특기가 없습니다. 특기 이름과 군종을 확인하세요.";
            return res.json(result);
        }
        
        const docs = snapshot.docs.map(doc => [doc.ref, doc.id]);
        const [speciality_doc, speciality_id] = docs[0];
        if (is_increase === 'increase') {
            updateDoc(speciality_doc, {like: increment(1)});
            updateDoc(user_doc.ref, {
                favorite_speciality: arrayUnion(speciality_id)
            });
            result.success = true;
        }
        else if (is_increase === 'decrease') {
            updateDoc(speciality_doc, {like: increment(-1)});
            updateDoc(user_doc.ref, {
                favorite_speciality: arrayRemove(speciality_id)
            });
            result.success = true;
        }
        else {
            result.success = false;
            result.err_msg = "API가 잘못되었습니다. like/increase like/decrease 이외의 값이 들어왔습니다.";
        }
    } catch (error) {
        result.success = false;
        result.err_code = error.code;
        result.err_msg = error.message;
    }

    res.json(result);
};

const speciality_opinions = async (req, res) => {
    const result = new Result();

    try {
        const speciality_name = req.params.speciality_name;
        const military_kind = req.params.military_kind;

        // 군종-특기 의 모든 의견 가져오기
        const q = query(collection(db, 'speciality_opinion'), 
                        where("speciality_name", "==", speciality_name),
                        where("military_kind", "==", military_kind));
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
            result.success = false;
            result.err_code = "speciality/opinion/no-speciality";
            result.err_msg = "의견 데이터베이스에 해당하는 특기가 존재하지 않습니다. 군종과 특기이름을 확인하세요.";
        }
        else {
            const doc_list = snapshot.docs.map(doc => doc.id);
            const opinion_doc = doc_list[0];
            // 모든 의견 다 불러오기
            const snapshot2 = await getDocs(query(collection(db, `speciality_opinion/${opinion_doc.toString()}/opinions`)));
            if (snapshot2.empty) {
                result.success = false;
                result.err_code = "-1";
                result.err_msg = "no speciality opinions, check speciality name";
            }
            else {
                const opinion_list = snapshot2.docs.map(doc => doc.data());
                console.log(opinion_list);            
                result.success = true;
                result.data = opinion_list;
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

const speciality_opinion = async (req, res) => {
    const result = new Result();

    try {
        const speciality_name = req.params.speciality_name;
        const military_kind = req.params.military_kind;

        const q = query(collection(db, 'speciality_opinion'), 
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
            const opinion_doc = doc_list[0];
            const body = req.body;
            console.log(req.body);
            body.like = 0;
            body.dislike = 0;
            body.created_time = serverTimestamp();
            const docRef = await addDoc(collection(db, `speciality_opinion/${opinion_doc.toString()}/opinions`), body);
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

const add = async (req, res) => { // TODO : remove function later
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

const add_desc = async (req, res) => { // TODO : remove function later
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
        speciality_opinions,
    },
    post: {
        speciality_like,
        speciality_opinion,
    },
    add, // TODO : remove
    add_desc, // TODO : remove
};