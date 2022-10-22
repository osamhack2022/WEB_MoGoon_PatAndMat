'use strict';
import { Result, cookieOption } from './ctrl.common.js';
import { auth } from '../firebase/auth.js';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from "firebase/firestore/lite";
import { db } from '../firebase/db.js';

const register = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const result = new Result();

    try {
        const credential = await createUserWithEmailAndPassword(auth, email, password);
        result.success = true;
        await setDoc(doc(db, "user", email), {
            school: {
                work_school: "",
                type: "",
                is_register: "",
                grade: "",
                is_major: ""
            },
            extra_point: {
                blood_donation: 0,
                volunteer: 0,
                korean_cert: "",
                history_cert: "",
                other: {
                    "국가유공자_독립운동가": false,
                    "국외이주자": false,
                    "경제적약자": false
                },
                child_count: ""
            },
            certificate: {
                "national": "",
                "general": "",
                "drive_license": "",
                "work_learn": ""
            },
            name: "user",
            nickname: "nick",
            favorite_speciality: [],
            absent_days: "0일"
        });
    } catch (error) {
        result.error_code = error.code;
        result.error_msg = error.message;
    }

    return res.json(result);
};

const login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    
    console.log(req.cookies); // TODO : remove later

    const result = new Result();

    try {
        const credential = await signInWithEmailAndPassword(auth, email, password);
        
        result.success = true;
        result.data = await credential.user.getIdToken();
        res.cookie('refresh_token', credential.user.refreshToken, cookieOption);
        
    } catch (error) {
        result.error_code = error.code;
        result.error_msg = error.message;   
    }

    return res.json(result);
};

export const ctrl_auth = {
    register,
    login,
};