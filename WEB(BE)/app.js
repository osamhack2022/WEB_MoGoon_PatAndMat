const express = require('express');
const app = express();
const port = 5000;

app.get('/speciality/list', (req, res) => {
    const test_data = [
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
    ];
    
    console.log('server sent ${test_data}');
    res.json(test_data);
});

app.listen(port, () => {
    console.log('server is listening at ${port}');
});