import React, { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import Badge from '@mui/material/Badge';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// css
import "../../css/MyPage/MyEnInfoItem.css";

let MyEnInfoItem = (props) => {

    return (
        <div className='en-info-container'>
            <div className='en-info-header'>
                <h4>{props.title}</h4>
                <div className='en-info-edit'>수정</div>
            </div>
            <div className='en-info-content'>
                computer-engineering
            </div>
        </div>
    );
};

let SpTypeItem = (props) => {
    const type = props.type;

    let typeColor = "";
    if (type == "육군") {
        typeColor = "green";
    } else if (type == "해군") {
        typeColor = "#000080";
    } else if (type == "공군") {
        typeColor = "#5d5d5d";
    } else {
        typeColor = "red";
    }

    return (
        <div style={{ color: typeColor }}>{type}</div>
    );
};

let SpTagItem = (props) => {
    return (
        //type 기본값을 이용해서 tag별로 css 적용
        <div>#{props.tag}</div>
    );
};

export default React.memo(MyEnInfoItem);