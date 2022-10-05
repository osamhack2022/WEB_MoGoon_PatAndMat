// import React, { useState } from 'react';
import React, { useEffect, useState, useCallback } from "react";
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import axios from 'axios';

import "../../css/Join.css"

const Join = () => {
    const [values,setValues] = useState({
        email : "",
        passwordCheck:"",
        password:""
    })

    const handleChange = e => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        })
    }
    
    const handelSubmit = (e) => {
        e.preventDefault();
        if(values.email=="" || values.password=="" || values.passwordCheck=="" ){
            alert("아이디 또는 비밀번호를 입력해주세요.");
            return null;
        }

        if(values.password != values.passwordCheck){
            alert("비밀번호가 일치하지 않습니다.");
            return null;
        }

        addUser(values.email, values.password);
    }

    async function addUser(email, pw) {
        await axios.post('http://localhost:5000/api/auth/register',
            {
                email: email,
                password: pw
            }
        )
            .then(function (response) {
                console.log(JSON.stringify(values, null, 2));
                alert("회원가입 성공!");
            })
            .catch(function (error) {
                console.log(error);
                alert("회원가입 실패!.");
            });
    }

    return (
        <div className="join-wrap">
            <div className="join-img">
                <Link to="/">
                    <div style={{ width: "100%", height: "100%" }}></div>
                </Link>
            </div>

            <div className="join-content">
                <form onSubmit={handelSubmit} className="join-form">
                    <div className="join-form-logo"></div>
                    <span>이메일</span>
                    <TextField onChange={handleChange} name="email" id="outlined-basic" label="ID" variant="outlined" sx={{ width: "100%" }} />
                    <span>비밀번호</span>
                    <TextField onChange={handleChange} name="passwordCheck" sx={{ width: "100%" }}
                        id="outlined-password-input"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                    />
                    <span>비밀번호 확인</span>
                    <TextField onChange={handleChange} name="password" sx={{ width: "100%" }}
                        id="outlined-password-input"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                    />
                    <button type="submit" className="btnjoin">회원가입</button>
                </form>
            </div>
        </div>
    );
};

export default React.memo(Join);