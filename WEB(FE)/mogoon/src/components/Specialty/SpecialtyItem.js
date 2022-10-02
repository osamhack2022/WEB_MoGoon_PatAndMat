import React, { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

let SpecialtyItem = (props) => {
    // 나중에 체크 유뮤 받아오기
    let [chkBool, setChkBool] = useState(false);

    let chkClick = (e) => {
        if (chkBool == false) {
            setChkBool(true);
        } else {
            setChkBool(false);
        }

        e.preventDefault();
    }

    return (
        <Link to={`/Specialty/SpDetail/${props.name}`}>
            <div className='specialtyitem'>
                <div className='spimg' style={{ content: `URL(${props.imageSrc})` }} />
                <div className='spcontent'>
                    <div className='sptype'>
                        <SpTypeItem type={props.military_kind} />
                        <div>{props.class}</div>
                    </div>
                    <div className='spname'>{props.name}</div>
                    <p className='spexplan'>{props.desc=="" ? "" : `"${props.desc}"`}</p>
                    <div className='sptag'>
                        {
                            props.tags.map(tag => (
                                <SpTagItem tag={tag} />
                            ))
                        }
                        <Checkbox sx={{ marginRight: "0", marginLeft: "auto", padding: "0" }} checked={chkBool} onClick={chkClick} icon={<BookmarkBorderIcon />} checkedIcon={<BookmarkIcon sx={{ color: "#ffd731" }} />} />
                    </div>
                </div>
            </div>
        </Link>
    );
};

let SpTypeItem = (props) => {
    const type = props.type;

    let typeColor = [];
    for (let i = 0; i < type.length; i++) {
        if (type[i] == "육군") {
            typeColor[i] = "green";
        } else if (type[i] == "해군") {
            typeColor[i] = "#000080";
        } else if (type[i] == "공군") {
            typeColor[i] = "#5d5d5d";
        } else {
            typeColor[i] = "red";
        }
    }

    return (
        type.map((data, index) => (
            <div key={index} style={{ color: typeColor[index] }}>{data}</div>
        ))

    );
};

let SpTagItem = (props) => {
    return (
        //type 기본값을 이용해서 tag별로 css 적용
        <div>#{props.tag}</div>
    );
};

const onSearchChange = (e) => {
    console.log(e);
};

export default React.memo(SpecialtyItem);