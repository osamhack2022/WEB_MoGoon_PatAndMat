import React, { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import Badge from '@mui/material/Badge';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// css
import "../../css/MyPage/MyQuestionItem.css";

let MyQuestionItem = (props) => {

    return (
        <div className='my-question-item-container'>
            question1
        </div>
    );
};

export default React.memo(MyQuestionItem);