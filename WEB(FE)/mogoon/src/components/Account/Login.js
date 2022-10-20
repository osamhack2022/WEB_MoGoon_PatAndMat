// import React, { useState } from 'react';
import React, { useEffect, useState, useCallback } from "react";
import { json, Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import Alert from '@mui/material/Alert';
// redux
import { useDispatch } from "react-redux";
import { clearUser, loginUser } from "../../reducer/userSlice.js";
import { useSelector } from "react-redux";

import "../../css/Login.css"

const Login = () => {
    let user = useSelector((state) => {return state.user});
    const dispatch = useDispatch();

    const [values, setValues] = useState({
        email: "",
        password: "",
    })

    const [load, setLoad] = useState(true);

    const handleChange = e => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        })
    }

    const handelSubmit = (e) => {
        e.preventDefault();
        if (values.email == "" || values.password == "") {
            alert("아이디 또는 비밀번호를 입력해주세요.");
            return null;
        }

        getUser(values.email, values.password);
    }

    const reSet = () => {
        setValues({ email: "", password: "" });
    }

    async function getUser(email, pw) {
        setLoad(false);

        await axios.post('http://localhost:5000/api/auth/login',
            {
                email: email,
                password: pw
            }
        )
            .then(function (response) {
                console.log(response);
                setLoad(true);

                switch (response.data.error_code) {
                    case "auth/invalid-email":
                        alert("아이디는 이메일 형식입니다.");
                        reSet();
                        return;
                    case "auth/user-not-found":
                        alert("존재하지 않는 이메일입니다.");
                        reSet();
                        return;
                    case "auth/wrong-password":
                        alert("패스워드가 일치하지 않습니다.");
                        reSet();
                        return;
                    default:
                }
                //data가 유일키
                dispatch(loginUser(values));
                localStorage.setItem("userInfo",JSON.stringify(values));
                localStorage.setItem("IdToken",response.data.data);
                alert("로그인 성공!");
                reSet();

                window.location = '/';
            })
            .catch(function (error) {
                console.log(error);
                alert("로그인 실패!");
            });
    }

    return (
        <div className="login-wrap">
            <div className="login-img">
                <Link to="/">
                    <div style={{ width: "100%", height: "100%" }}></div>
                </Link>
            </div>

            <div className="login-content">
                <form onSubmit={handelSubmit} className="login-form">
                    <div className="login-form-logo"></div>

                    <span style={{ marginTop: "10px" }}>이메일</span>
                    <TextField name="email" onChange={handleChange} value={values.email} id="outlined-basic" label="ID" variant="outlined" sx={{ width: "100%" }} />

                    <span>비밀번호</span>
                    <TextField name="password" onChange={handleChange} value={values.password} sx={{ width: "100%" }}
                        id="outlined-password-input"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                    />

                    <span style={{ margin: "0", fontWeight: "400", fontSize: "14px", color: "gray", cursor: "pointer", width: "80px" }}>
                        ID/PW 찾기
                    </span>
                    {load ? <button className="btnlogin" type="submit">로그인</button> : <button className="btnlogin" type="submit" disabled style={{ backgroundColor: "gray" }}>로딩중..</button>}
                </form>
                <div className="join" style={{ letterSpacing: "0.1px" }}>
                    아직 <strong>"모군"</strong>의 회원이 아니신가요? <strong><span style={{ cursor: "pointer", textDecoration: "underline", color: "#183C8C" }}>
                        <Link to="/Account/Join">회원가입</Link>
                    </span></strong> 하시고 더나은 서비스를 즐겨보세요.
                </div>
            </div>
        </div>
    );
};

export default React.memo(Login);