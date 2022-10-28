import React, { useState } from 'react';
import { useLocation } from "react-router-dom";
import HeaderItem from "./HeaderItem";
import Button from '@mui/material/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';

// redux
import { useDispatch } from "react-redux";
import { clearUser, loginUser } from "../../reducer/userSlice.js";
import { useSelector } from "react-redux";

let Header = (props) => {
    let user = useSelector((state) => {return state.user});
    const dispatch = useDispatch();

    const locationNow = useLocation();
    //주소 Account로 바꾸기
    if (locationNow.pathname === "/Account/Login" || locationNow.pathname === "/Account/Join") return null;

    const handelLogout = () =>{
        let alertLogout = window.confirm("모군에서 로그아웃 하시겠습니까?");

        if (alertLogout) {
            dispatch(clearUser());
            localStorage.removeItem("userInfo");
            localStorage.removeItem("IdToken");
            localStorage.removeItem("dibsList");
            window.location.reload();
        }
    }

    return (
        <div className='headerWapper'>
            <nav className='header'>
                <ul>
                    <Link to="/">
                        <div className='logo'></div>
                    </Link>
                    <Link to="/Specialty">
                        <HeaderItem title="특기소개" />
                    </Link>
                    <Link to="/Enlist">
                        <HeaderItem title="군지원" />
                    </Link>
                    <Link to="/MyPage">
                        <HeaderItem title="마이페이지" />
                    </Link>
                </ul>
                <div>
                    <Button variant="contained" className='btnLogin' style={{ margin: "5px",backgroundColor:"#183C8C"}}>
                        {user.email==""?<Link to="/Account/Login">로그인</Link>:<span onClick={handelLogout}>로그아웃</span>}
                    </Button>

                    {user.email==""?<Button variant="outlined" className='btnJoin' style={{ margin: "5px",color:"#183C8C",borderColor:"#183C8C"}}>
                        <Link to="/Account/Join">
                            회원가입
                        </Link>
                    </Button>:""}

                    {/* <AccountCircleIcon className='account' fontSize='large' /> */}
                </div>
            </nav>
        </div>
    );
};

export default Header;