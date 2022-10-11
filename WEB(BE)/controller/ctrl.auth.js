'use strict';
import { Result, cookieOption } from './ctrl.common.js';
import { auth } from '../firebase/auth.js';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

const register = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const result = new Result();

    try {
        console.log(email); // TODO
        console.log(password); // TODO
        const credential = await createUserWithEmailAndPassword(auth, email, password);
        result.success = true;
        result.data = credential;
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
        console.log(email); // TODO
        console.log(password); // TODO
        const credential = await signInWithEmailAndPassword(auth, email, password);
        
        result.success = true;
        result.data = await credential.user.getIdToken();
        res.cookie('refresh_token', credential.user.refreshToken, cookieOption);
        res.cookie('id_token', await credential.user.getIdToken(), cookieOption);
        
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