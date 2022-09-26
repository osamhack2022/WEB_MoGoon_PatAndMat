import { collection, getDocs, doc, setDoc } from 'firebase/firestore/lite';
import express from 'express';
import { db } from './db.js';

const app = express();
const port = 5000;

app.get('/', async (req, res) => {
    return res.send('hi');
});

app.get('/speciality/list', async (req, res) => {
    const test_col = collection(db, 'speciality');
    const snapshot = await getDocs(test_col);
    const doc_list = snapshot.docs.map(doc => doc.data());
    
    //await setDoc(doc(db, 'speciality', `test${doc_list.length}`), doc_list[0]);
    return res.json(doc_list);
});

app.listen(port, () => {
    console.log(`server is listening at ${port}`);
});