import express from 'express';
import { auth } from '../firebase/auth.js';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword  } from 'firebase/auth';

export const router_auth = express.Router();

router_auth.post('/register', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const result = {
        success: false,
        user: null,
        error_code: null,
        error_msg: null
    };

    try {
        console.log(email);
        console.log(password);
        const credential = await createUserWithEmailAndPassword(auth, email, password);
        result.success = true;
        result.user = credential;
    } catch (error) {
        result.error_code = error.code;
        result.error_msg = error.message;
    }

    return res.json(result);
});

router_auth.post('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password; 

    const result = {
        success: false,
        user: null,
        error_code: null,
        error_msg: null
    };

    try {
        console.log(req.body);
        console.log(email);
        console.log(password);
        const credential = await signInWithEmailAndPassword(auth, email, password)
        result.success = true;
        result.user = credential.user;
    } catch (error) {
        result.error_code = error.code;
        result.error_msg = error.message;   
    }

    return res.json(result);
});