import express from 'express';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import path from "path";
import cors from "cors";

import { router_speciality } from './router/speciality.js';
import { router_auth } from './router/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 5000;

app.use(bodyParser.urlencoded());
app.use(express.json());
app.use(cors());

// API 라우팅
app.use('/api/speciality', router_speciality);
app.use('/api/auth', router_auth);

// 프론트 연동
app.use(express.static(path.join(__dirname,"../WEB(FE)/mogoon/build")));
app.get('*', (req, res) => {
    return res.sendFile(path.join(__dirname,"../WEB(FE)/mogoon/build/index.html"));
});

app.listen(port, () => {
    console.log(`server is listening at ${port}`);
});