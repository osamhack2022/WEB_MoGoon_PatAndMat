import React, { useState } from 'react';

let SpecialtyItem = (props) => {
    return (
        <div className='specialtyitem'>
            <div className='spimg' />
            <div className='spcontent'>
                <div className='sptype'>
                    <SpTypeItem type="육군" />
                    <SpTypeItem type="해군" />
                    <SpTypeItem type="공군" />
                    <SpTypeItem type="해병대" />
                    {/* 일반인지 전문특기병인지 */}
                    <div>일반</div>
                </div>
                <div className='spname'>{props.name}</div>
                <p className='spexplan'>Lorem ipsum dolor, sit amet consectetur</p>
                <div className='sptag'>
                    <SpTagItem tag="휴가많음"/>
                    <SpTagItem tag="실내근무"/>
                    <SpTagItem tag="교대근무"/>
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
        color="silver";
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