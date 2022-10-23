// import React, { useState } from 'react';
import React, { useEffect, useState, useCallback } from "react";
import axios from 'axios';

// components
import SpecialtyItem from "../Specialty/SpecialtyItem.js";
import MyEnInfoItem from "./MyEnInfoItem.js";
import MyQuestionItem from "./MyQuestionItem.js";

// css
import "../../css/MyPage/MyPage.css"

const MyPage = () => {
    const [myPageData, setMyPageData] = useState(null);
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
                }).then((result) => {
                    setLoading(false);
                    if (result.success)
                        setMyPageData(result.data);
                    else
                        setError(result.err_msg);
                });    
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    },[]);

    if (loading)
        return <div className="info-area">now Loading..</div>

    if (!myPageData) {
        return <div>데이터를 받지 못했어요! 개발자에게 문의해주세요😨</div>
    }

    console.log(myPageData);

    const info_div_style = {
        marginLeft: "16px",
    };

    return (
        <div className="my-page-content">
            <h2>안녕하세요, {myPageData.name}님!😎</h2>
            <h3>내가 찜해둔 특기</h3>
            <div>
                {myPageData.favorite_speciality.length === 0 
                ? <div style={info_div_style}>찜한 특기가 없어요! 특기 소개 페이지에서 관심있는 특기를 찜해보세요.</div> 
                : myPageData.favorite_speciality.map((data) => {
                    return <SpecialtyItem key={data.speciality_name} code={data.speciality_code} name={data.speciality_name} class={data.class}
                    desc={data.desc} military_kind={data.military_kind} tags={data.tags}
                    imageSrc={data.imageSrc} kind={data.kind} like={data.like} />
                })}
            </div>
            <h3>내 지원 정보</h3>
            <div className="my-en-info-container">
                <MyEnInfoItem title="자격/면허" en-info-type="certificate" selectionObj={myPageData.certificate}/>
                <MyEnInfoItem title="전공" en-info-type="school" selectionObj={myPageData.school}/>
                <MyEnInfoItem title="결석 일수" en-info-type="absent_days" selectionObj={myPageData.absent_days}/>
                <MyEnInfoItem title="가산점" en-info-type="extra_point" selectionObj={myPageData.extra_point}/>
            </div>
            <h3>내 질문</h3>
            <div>
                <MyQuestionItem /> {/* 일단 커뮤 페이지가 없으니까 클릭하면 특기 상세 페이지의 질문 보기 페이지로 이동시키기 */}
                <MyQuestionItem />
                <MyQuestionItem />
            </div>
        </div>

    );
};

export default React.memo(MyPage);