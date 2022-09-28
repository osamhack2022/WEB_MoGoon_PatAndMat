import React, { useState } from 'react';
import HeaderItem from "./HeaderItem";
import Button from '@mui/material/Button';

let Header = (props) => {
    return (
        <div className='headerWapper'>
            <nav>
                <ul>
                    <div className="logo"></div>
                    <HeaderItem title="특기소개" />
                    <HeaderItem title="군지원" />
                    <HeaderItem title="커뮤니티" />
                    <HeaderItem title="마이페이지" />
                    <Button variant="contained" className='btnLogin'>로그인</Button>
                    <Button variant="outlined" className='btnJoin'>회원가입</Button>
                </ul>
            </nav>
        </div>
    );
};

export default Header;