import express from 'express';
import { ctrl_speciality } from '../controller/ctrl.speciality.js';

import { fileURLToPath } from 'url';
import path from "path";

export const router_speciality = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router_speciality.get('/list', ctrl_speciality.get.speciality_list);
router_speciality.get('/list/:speciality_name', ctrl_speciality.get.speciality_desc);

router_speciality.get('/add', (req, res) => {
    res.sendFile(path.join(__dirname,'../view/add_speciality.html'));
});