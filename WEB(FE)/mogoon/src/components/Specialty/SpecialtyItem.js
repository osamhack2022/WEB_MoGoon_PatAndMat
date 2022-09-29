import React, { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

let SpecialtyItem = (props) => {
    return (
        <div className='specialtyitem'>
            <div className='spimg' style={{ content: `URL(${props.imageSrc})` }} />
            <div className='spcontent'>
                <div className='sptype'>
                    {/* 군종이 여러 종류일때 생각해야함 */}
                    <SpTypeItem type={props.military_kind} />
                    <div>{props.class}</div>
                </div>
                <div className='spname'>{props.name}</div>
                <p className='spexplan'>{props.desc}</p>
                <div className='sptag'>
                    <SpTagItem tag={props.tags[0]} />
                    <SpTagItem tag={props.tags[1]} />
                    <SpTagItem tag={props.tags[2]} />
                    {/* <img src="img/etc/saveOff.svg"/> */}

                    <Checkbox sx={{marginRight:"0",marginLeft:"auto",padding:"0"}} icon={<BookmarkBorderIcon />} checkedIcon={<BookmarkIcon />}/>
                </div>
            </div>
        </div>
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
        type.map((data,index) => (
            <div style={{ color: typeColor[index] }}>{data}</div>
        ))

    );
};

let SpTagItem = (props) => {
    return (

        //type 기본값을 이용해서 tag별로 css 적용
        <div>#{props.tag}</div>
    );
};

export default SpecialtyItem;