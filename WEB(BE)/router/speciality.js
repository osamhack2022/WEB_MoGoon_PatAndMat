import express from 'express';
import { ctrl_speciality } from '../controller/ctrl.speciality.js';
import { ctrl_speciality_question } from '../controller/ctrl.speciality.qna.js';

import { fileURLToPath } from 'url';
import path from "path";

export const router_speciality = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// API
router_speciality.get('/list', ctrl_speciality.get.speciality_list);
router_speciality.get('/list/:speciality_name/:military_kind', ctrl_speciality.get.speciality_desc);
router_speciality.get('/:speciality_name/:military_kind/opinions', ctrl_speciality.get.speciality_opinions);
router_speciality.get('/:speciality_name/:military_kind/questions', ctrl_speciality_question.get.speciality_questions);
router_speciality.get('/:speciality_name/:military_kind/answers/:question_code', ctrl_speciality_question.get.speciality_answers);
router_speciality.post('/:speciality_name/:military_kind/like/:is_increase', ctrl_speciality.post.speciality_like_increase);
router_speciality.post('/:speciality_name/:military_kind/opinion', ctrl_speciality.post.speciality_opinion);
router_speciality.post('/:speciality_name/:military_kind/question', ctrl_speciality_question.post.speciality_question);
router_speciality.post('/:speciality_name/:military_kind/answer/:question_code', ctrl_speciality_question.post.speciality_answer);

// manage page
router_speciality.get('/add', (req, res) => {
    res.sendFile(path.join(__dirname,'../view/add_speciality.html'));
});
router_speciality.get('/add-desc', (req, res) => {
    res.sendFile(path.join(__dirname,'../view/add_speciality_desc.html'));
});

router_speciality.post('/add', ctrl_speciality.add);
router_speciality.post('/add-desc', ctrl_speciality.add_desc);