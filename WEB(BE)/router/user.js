import express from 'express';
import { db } from '../db/db.js';
import { collection, getDocs, doc, setDoc } from 'firebase/firestore/lite';

export const router_user = express.Router();
router_user.get('/', (req, res) => {
    return;
});