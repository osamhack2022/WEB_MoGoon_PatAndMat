import React, { useState } from 'react';
import HeaderItem from "./HeaderItem";

let Header =(props)=>{
    return(
        <div className='headerWapper'>
            <HeaderItem title="특기소개"/>
            <HeaderItem title="군지원"/>
            <HeaderItem title="커뮤니티"/>
            <HeaderItem title="마이페이지"/>

            {/* <HeaderItem color="#5A6652" title="육군"/>
            <HeaderItem color="#000080" title="해군"/>
            <HeaderItem color="#a6a6a6" title="공군"/>
            <HeaderItem color="red" title="해병대"/> */}
        </div>
    );
};

export default Header;