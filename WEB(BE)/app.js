import express from 'express';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";

import { router_speciality } from './router/speciality.js';
import { router_auth } from './router/auth.js';
import { router_user } from './router/user.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 5000;

app.use(bodyParser.urlencoded( { extended: true } ));
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: ['http://127.0.0.1:5000', 'http://127.0.0.1:3000', 'http://localhost:3000'], // TODO : remove test ip address later
    credentials: true,
}));

// API 라우팅
app.use('/api/speciality', router_speciality);
app.use('/api/auth', router_auth);
app.use('/api/user', router_user);

// 프론트 연동
app.use(express.static(path.join(__dirname,"../WEB(FE)/mogoon/build")));
app.get('*', (req, res) => {
    return res.sendFile(path.join(__dirname,"../WEB(FE)/mogoon/build/index.html"));
});

app.listen(port, () => {
    console.log(`server is listening at ${port}`);
});