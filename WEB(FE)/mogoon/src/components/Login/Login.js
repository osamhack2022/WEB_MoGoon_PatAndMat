import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import { makeStyles } from "@material-ui/styles";
import { fontSize } from "@mui/system";

const Login = (props) => {
    const onClickLogin = () => {
        console.log("clicked");
        axios.post("http://localhost:5000/api/auth/login", {
            "email": "kckc0608@naver.com",
            "password": "123412"
        }, {
            headers: {
                'Content-Type' : 'application/json',
            } 
        })
        .then(res => console.log(res))
        .catch(err => console.log(err));
    };

    return (
        <>
            <form method="POST" onSubmit={async () => {
                
            }}>
                <div>
                    ID
                </div>
                <div>
                    <input type={'text'} name="id"></input>
                </div>
                <div>
                    PW
                </div>
                <div>
                    <input type={'password'} name="pw"></input>
                </div>
                <div>
                    <button type={'button'} onClick={onClickLogin}>Login</button> 
                </div>
            </form>
        </>
    );
};

export default React.memo(Login);