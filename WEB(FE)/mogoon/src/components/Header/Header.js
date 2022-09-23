import React, { useState } from 'react';
import HeaderItem from "./HeaderItem";

let Header =(props)=>{
    return(
        <div className='headerWapper'>
            <HeaderItem title="특기소개"/>
            <HeaderItem title="군지원"/>
            <HeaderItem title="커뮤니티"/>
            <HeaderItem title="마이페이지"/>
        </div>
    );
};

export default Header;