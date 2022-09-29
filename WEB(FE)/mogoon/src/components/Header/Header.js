import React, { useState } from 'react';
import HeaderItem from "./HeaderItem";
import Button from '@mui/material/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

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
                </ul>
                <div>
                    <Button variant="contained" className='btnLogin' style={{margin:"10px"}}>로그인</Button>
                    <Button variant="outlined" className='btnJoin' style={{margin:"10px"}}>회원가입</Button>
                    <AccountCircleIcon className='account' fontSize='large'/>
                </div>
            </nav>
        </div>
    );
};

export default Header;