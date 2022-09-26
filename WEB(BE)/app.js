import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, setDoc } from 'firebase/firestore/lite';
import express from 'express';

const app = express();
const port = 5000;

const firebaseConfig = {
    apiKey: "AIzaSyCCH8iBQRrh9RIk3BSSdmr9akG6znyrb8k",
    authDomain: "osam--mogoon.firebaseapp.com",
    projectId: "osam--mogoon",
    storageBucket: "osam--mogoon.appspot.com",
    messagingSenderId: "39262750716",
    appId: "1:39262750716:web:2ba69ad64a14b138f39479",
    measurementId: "G-79CB1TP6W3"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

app.get('/', async (req, res) => {
    return res.send('hi');
});

app.get('/speciality/list', async (req, res) => {
    const test_col = collection(db, 'speciality');
    const snapshot = await getDocs(test_col);
    const doc_list = snapshot.docs.map(doc => doc.data());
    
    await setDoc(doc(db, 'speciality', `test${doc_list.length}`), doc_list[0]);
    return res.json(doc_list);
});

app.listen(port, () => {
    console.log(`server is listening at ${port}`);
});