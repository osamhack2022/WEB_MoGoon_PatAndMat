import React, { useState } from 'react';
import HeaderItem from "./HeaderItem";
import Button from '@mui/material/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';

let Header = (props) => {
    return (
        <div className='headerWapper'>
            <nav>
                <ul>
                    <Link to="/">
                        <div className="logo"></div>
                    </Link>
                    <Link to="/Specialty/">
                        <HeaderItem title="특기소개" />
                    </Link>
                    <HeaderItem title="군지원" />
                    <HeaderItem title="커뮤니티" />
                    <HeaderItem title="마이페이지" />
                </ul>
                <div>
                    <Button variant="contained" className='btnLogin' style={{ margin: "5px" }}>
                        <Link to="/Login/">
                            로그인
                        </Link>
                    </Button>
                    <Button variant="outlined" className='btnJoin' style={{ margin: "5px" }}>회원가입</Button>
                    <AccountCircleIcon className='account' fontSize='large' />
                </div>
            </nav>
        </div>
    );
};

export default Header;