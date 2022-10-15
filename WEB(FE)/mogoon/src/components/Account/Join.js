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

    const [load,setLoad] = useState(true);

    const reSet = () =>{
        setValues({email:"",passwordCheck:"",password:""});
    }

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
        setLoad(false);

        await axios.post('http://localhost:5000/api/auth/register',
            {
                email: email,
                password: pw
            }
        )
            .then(function (response) {
                setLoad(true);
                console.log(response);

                switch (response.data.error_code) {
                    case "auth/invalid-email":
                        alert("아이디는 이메일 형식입니다.");
                        reSet();
                        return;
                    case "auth/weak-password":
                        alert("비밀번호는 최소 6자리입니다.");
                        reSet();
                        return;
                    case "auth/email-already-in-use":
                        alert("이미 존재하는 아이디입니다.");
                        reSet();
                        return;
                    default:
                }

                console.log(JSON.stringify(values, null, 2));
                alert("회원가입 성공!\n확인을 누르면 로그인 페이지로 이동합니다.");
                reSet();
                window.location = '/Account/Login';
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
                    <TextField onChange={handleChange} value={values.email} name="email" id="outlined-basic" label="ID" variant="outlined" sx={{ width: "100%" }} />
                    <span>비밀번호</span>
                    <TextField onChange={handleChange} value={values.password} name="password" sx={{ width: "100%" }}
                        id="outlined-password-input"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                    />
                    <span>비밀번호 확인</span>
                    <TextField onChange={handleChange} value={values.passwordCheck} name="passwordCheck" sx={{ width: "100%" }}
                        id="outlined-password-input"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                    />
                    {load?<button type="submit" className="btnjoin">회원가입</button>:<button type="submit" className="btnjoin" disabled style={{backgroundColor:"gray"}}>로딩중..</button>}
                    
                </form>
            </div>
        </div>
    );
};

export default React.memo(Join);