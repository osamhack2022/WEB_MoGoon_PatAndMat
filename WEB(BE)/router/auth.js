import express from 'express';
import { ctrl_auth } from '../controller/ctrl.auth.js';
import { auth } from '../firebase/auth.js';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword  } from 'firebase/auth';

export const router_auth = express.Router();

router_auth.post('/register', ctrl_auth.register);

router_auth.post('/login', ctrl_auth.login);