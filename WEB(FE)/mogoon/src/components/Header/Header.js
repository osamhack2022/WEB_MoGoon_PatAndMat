import React, { useState } from 'react';
import { useLocation } from "react-router-dom";
import HeaderItem from "./HeaderItem";
import Button from '@mui/material/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';

let Header = (props) => {
    const locationNow = useLocation();
    //주소 Account로 바꾸기
    if (locationNow.pathname === "/Account/Login" || locationNow.pathname === "/Account/Join") return null;

    return (
        <div className='headerWapper'>
            <nav>
                <ul>
                    <Link to="/">
                        <div className='logo'></div>
                    </Link>
                    <Link to="/Specialty">
                        <HeaderItem title="특기소개" />
                    </Link>
                    <HeaderItem title="군지원" />
                    <HeaderItem title="커뮤니티" />
                    <HeaderItem title="마이페이지" />
                </ul>
                <div>
                    <Button variant="contained" className='btnLogin' style={{ margin: "5px" }}>
                        <Link to="/Account/Login">
                            로그인
                        </Link>
                    </Button>
                    <Button variant="outlined" className='btnJoin' style={{ margin: "5px" }}>
                        <Link to="/Account/Join">
                            회원가입
                        </Link>
                    </Button>
                    <AccountCircleIcon className='account' fontSize='large' />
                </div>
            </nav>
        </div>
    );
};

export default Header;