const express = require('express');
const app = express();
const port = 3000;

app.get('/speciality/list', (req, res) => {
    res.json([
        {
            military_kind: '공군',
            class: '일반',
            kind: '화생방',
            speciality_name: '화생방',
            speciality_code: '16',
            tags: ['교대근무', '휴가많음', '실내근무'],
            like: 3654,
        },
        {
            military_kind: '공군',
            class: '일반',
            kind: '화생방',
            speciality_name: '화생방',
            speciality_code: '16',
            tags: ['교대근무', '휴가많음', '실내근무'],
            like: 3654,
        },
        {
            military_kind: '공군',
            class: '일반',
            kind: '화생방',
            speciality_name: '화생방',
            speciality_code: '16',
            tags: ['교대근무', '휴가많음', '실내근무'],
            like: 3654,
        },
        {
            military_kind: '공군',
            class: '일반',
            kind: '화생방',
            speciality_name: '화생방',
            speciality_code: '16',
            tags: ['교대근무', '휴가많음', '실내근무'],
            like: 3654,
        },
        {
            military_kind: '공군',
            class: '일반',
            kind: '화생방',
            speciality_name: '화생방',
            speciality_code: '16',
            tags: ['교대근무', '휴가많음', '실내근무'],
            like: 3654,
        },
    ]);
});

app.listen(port, () => {
    console.log('server is listening at ${port}');
});