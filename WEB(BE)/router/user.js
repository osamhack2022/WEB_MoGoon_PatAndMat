import express from 'express';
import { db } from '../firebase/db.js';
import { collection, getDocs, doc, setDoc } from 'firebase/firestore/lite';
import { ctrl_user } from '../controller/ctrl.user.js';

export const router_user = express.Router();
router_user.get('/info', ctrl_user.get.user_info);