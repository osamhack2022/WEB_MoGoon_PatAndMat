// import React, { useState } from 'react';
import React, { useEffect, useState, useCallback } from "react";
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import axios from 'axios';

import "../../css/Login.css"

const Login = () => {
    return (
        <div className="login-wrap">
            <div className="login-img">
                <Link to="/">
                    <div style={{ width: "100%", height: "100%" }}></div>
                </Link>
            </div>

            <div className="login-content">
                <div className="login-form">
                    <div className="login-form-logo"></div>
                    <span>아이디</span>
                    <TextField id="outlined-basic" label="ID" variant="outlined" sx={{ width: "100%" }} />
                    <span>비밀번호</span>
                    <TextField sx={{ width: "100%" }}
                        id="outlined-password-input"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                    />
                    <span style={{margin: "0", fontWeight: "400", fontSize: "14px", color: "gray", cursor: "pointer",width:"80px" }}>
                        ID/PW 찾기
                    </span>
                    <button className="btnlogin">로그인</button>
                </div>
                <div className="join" style={{letterSpacing:"0.1px"}}>
                    아직 <strong>"모군"</strong>의 회원이 아니신가요? <strong><span style={{cursor:"pointer",textDecoration:"underline", color:"#183C8C"}}>회원가입</span></strong> 하시고 더나은 서비스를 즐겨보세요.
                </div>
            </div>
        </div>
    );
};

export default React.memo(Login);