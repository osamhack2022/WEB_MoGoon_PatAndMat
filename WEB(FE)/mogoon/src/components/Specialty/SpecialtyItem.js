import React, { useState } from 'react';

let SpecialtyItem = (props) => {
    return (
        <div className='specialtyitem'>
            <div className='spimg' style={{content:`URL(${props.imageSrc})`}}/>
            <div className='spcontent'>
                <div className='sptype'>
                    {/* 군종이 여러 종류일때 생각해야함 */}
                    <SpTypeItem type={props.military_kind} />
                    <div>{props.class}</div>
                </div>
                <div className='spname'>{props.name}</div>
                <p className='spexplan'>{props.desc}</p>
                <div className='sptag'>
                    <SpTagItem tag={props.tags[0]}/>
                    <SpTagItem tag={props.tags[1]}/>
                    <SpTagItem tag={props.tags[2]}/>
                    <img src="img/etc/saveOff.svg"/>
                </div>
            </div>
        </div>
    );
};

let SpTypeItem = (props) => {
    let color="";
    if(props.type=="육군"){
        color = "green";
    }else if(props.type=="해군"){
        color="#000080";
    }else if(props.type=="공군"){
        color="#5d5d5d";
    }else{
        color="red";
    }

    return (
        <div style={{color:color}}>{props.type}</div>
    );
};

let SpTagItem = (props) => {
    return (

        //type 기본값을 이용해서 tag별로 css 적용
        <div>#{props.tag}</div>
    );
};

export default SpecialtyItem;