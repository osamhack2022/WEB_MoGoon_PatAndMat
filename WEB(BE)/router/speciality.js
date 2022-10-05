import express from 'express';
import { ctrl_speciality } from '../controller/ctrl.speciality.js';

export const router_speciality = express.Router();

router_speciality.get('/list', ctrl_speciality.get.speciality_list);
router_speciality.get('/list/:speciality_name', ctrl_speciality.get.speciality_desc);