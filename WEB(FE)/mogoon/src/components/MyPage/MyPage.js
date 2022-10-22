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

// components
import SpecialtyItem from "../Specialty/SpecialtyItem.js";
import MyEnInfoItem from "./MyEnInfoItem.js";
import MyQuestionItem from "./MyQuestionItem.js";

// css
import "../../css/MyPage/MyPage.css"

const MyPage = () => {
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const token = localStorage.getItem('IdToken');

    if (!token) {
        return (
            <div className="info-area">앗, 여긴 로그인이 필요해요!</div>
        );
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                await axios.get('http://localhost:5000/api/user/info', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                }).then((response) => {
                    return response.data;
                }).then((data) => {
                    setLoading(false);
                    if (data.success)
                        setItem(data.data);
                    else
                        setError(data.err_msg);
                });    
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    },[]);

    if (loading)
        return <div className="info-area">now Loading..</div>

    if (!item) {
        return <div>데이터가 없어요! 개발자에게 문의해주세요😨</div>
    }

    console.log(item);
    return (
        <div className="my-page-content">
            <h2>안녕하세요, {item.name}님!😎</h2>
            <h3>내가 찜해둔 특기</h3>
            <div>
                {item.favorite_speciality.map((data) => {
                    console.log(item.favorite_speciality);
                    return <SpecialtyItem key={data.speciality_name} code={data.speciality_code} name={data.speciality_name} class={data.class}
                    desc={data.desc} military_kind={data.military_kind} tags={data.tags}
                    imageSrc={data.imageSrc} kind={data.kind} like={data.like} />
                })}
            </div>
            <h3>내 지원 정보</h3>
            <div className="my-en-info-container">
                <MyEnInfoItem title="자격/면허"/>
                <MyEnInfoItem title="전공"/>
                <MyEnInfoItem title="결석 일수"/>
                <MyEnInfoItem title="가산점"/>
            </div>
            <h3>내 질문</h3>
            <div>
                <MyQuestionItem />
                <MyQuestionItem />
                <MyQuestionItem />
            </div>
        </div>

    );
};

export default React.memo(MyPage);