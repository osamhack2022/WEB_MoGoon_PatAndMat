import express from 'express';
import { ctrl_speciality } from '../controller/ctrl.speciality.js';

import { fileURLToPath } from 'url';
import path from "path";

export const router_speciality = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// API
router_speciality.get('/list', ctrl_speciality.get.speciality_list);
router_speciality.get('/list/:speciality_name/:military_kind', ctrl_speciality.get.speciality_desc);
router_speciality.get('/:speciality_name/:military_kind/opinions', ctrl_speciality.get.speciality_opinions);
router_speciality.post('/:speciality_name/:military_kind/like/:is_increase', ctrl_speciality.post.speciality_like_increase);
router_speciality.post('/:speciality_name/:military_kind/opinion', ctrl_speciality.post.speciality_opinion);

// manage page
router_speciality.get('/add', (req, res) => {
    res.sendFile(path.join(__dirname,'../view/add_speciality.html'));
});
router_speciality.get('/add-desc', (req, res) => {
    res.sendFile(path.join(__dirname,'../view/add_speciality_desc.html'));
});

router_speciality.post('/add', ctrl_speciality.add);
router_speciality.post('/add-desc', ctrl_speciality.add_desc);