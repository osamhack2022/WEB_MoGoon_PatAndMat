import React, { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import Badge from '@mui/material/Badge';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// css
import "../../css/MyPage/Common.css"
import "../../css/MyPage/MyQuestionItem.css";

let MyQuestionItem = (props) => {

    return (
        <div className='my-question-item-container shadow-box'>
            <div>
                <h4>전산특기에 지원하고 싶은데 교대근무를 뛸까봐 걱정이 됩니다ㅠㅠ</h4>
                전산특기에 지원하려는데 제가 밤을 못새서 걱정입니다.
            </div>
            <div className='my-question-item-answer-count'>
                <strong>답변 {props.answer_count}</strong>
            </div>
        </div>
    );
};

export default React.memo(MyQuestionItem);