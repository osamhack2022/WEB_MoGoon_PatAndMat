import React, { useState } from 'react';
import { useParams } from "react-router-dom";

import '../../css/SpDetail.css';

let SpDetail = () => {
    const name = useParams().SpName;
    console.log(name);
    let [title, SetTitle] = useState(["특기 학교", "주요 업무", "지원자격", "배점 기준"]);

    return (
        <div className='SpDetail-content'>
            <div className='section-header'>
                <div className='header-img' />
                <div className='header-content'>
                    <div className='header-content-name'>정보체계관리</div>
                    <span className='header-content-miltray_kind'>
                        대한민국 육군 / 해군 / 공군
                    </span>
                    <span className='header-content-kind'>전자계산</span>
                    <div className='desc'>
                        특기학교 : 정보통신학교<br />
                        과정 : 3주과정<br />
                        분반 : A반 (하드웨어) / B반 (소프트웨어)<br />
                        <br />
                        관련 전공 : 컴퓨터공학, 전자공학, 전기공학, 소프트웨어학 등<br />
                        <br />
                        주요 업무 : 전산장비 관리, 서버 관제, 행정, 헬프데스크
                    </div>
                </div>
            </div>
            <div className='section-body'>
                <BodyTitle title={title[0]}>
                    <div>
                        <p>
                            정보체계관리는 기본군사훈련이 종료되면 정보통신학교에서 3주간 특기 교육을 받는다.<br />
                            <br />
                            특기학교에서 A반 B반을 지원하면 기훈단 상대 등수를 기준으로 A반 B반을 결정한다. 자대 TO 또한 각 반마다 다르게 나온다.<br />
                            <br />
                            A반에서는 하드웨어 업무 관련으로 랜케이블 따기, 고스트 이미지 백업 복구 사용법을 배운다.<br />
                            <br />
                            B반에서는 소프트웨어 업무 관련으로 유닉스, HTML 등을 배운다.
                        </p>
                    </div>
                </BodyTitle>
                <BodyTitle title={title[1]}>
                    <div>
                        <p>
                            정보체계관리 특기의 업무는 자대에 따라 다르고 자대에 가서도 천차만별이다.<br />
                            정보체계관리단 같은 부대의 경우 프로그램 개발을 할 수도 있고, 전화를 받는 업무나 단순 행정업무, 서버를 관제하는 크루 근무를 하기도 한다.<br />
                            크루 근무를 하게 되면 위로휴가를 받을 수 있다.<br />
                            <br />
                            특기학교에서 A반을 골랐다면 높은 확률로 해당 부대의 전산 장비를 관리하고 사용자를 지원하는 일을 하게 된다.<br />
                            <br />
                            하지만 정보체계관리 특기의 업무 스펙트럼이 너무 넓기에 A반 B반에 상관없이 자대 상황에 따라 반대쪽의 일을 하기도 한다.<br />
                        </p>
                    </div>
                </BodyTitle>
                <BodyTitle title={title[2]}>
                    <div>
                        <p>
                            연령 : ('22년 기준) 1994.1.1. ~ 2004.12.31. 출생자<br />
                            학력 : 제한 없음<br />
                            신체 : 병역판정(신체)검사 결과 신체등급 1급∼4급 현역병 입영대상인 사람<br />
                            기타 : 색약 가능<br />
                            지원요건 : 자격/면허 소지자(접수마감일까지 취득한 자) 또는 관련 직종 전공자<br />
                            <br />
                            지원 제한<br />
                            징역 또는 금고의 형(집행유예 포함)을 선고받은 사람<br />
                            사 또는 재판 중에 있는 사람으로서 최종선발자 발표일 7일 전까지 기소유예·혐의없음 등의 수사종결처분·결정 또는 재판이 확정되지 아니한 사람<br />
                            처분미상으로 통보된 사람으로서 최종선발자 발표일 7일 전까지 처분 결과가 판명되지 아니한 사람<br />
                            지원서 제출 시 학력, 자격/면허 등을 허위로 입력하거나 제출서류가 허위 또는 위조로 확인된사람
                        </p>
                    </div>
                </BodyTitle>
                <BodyTitle title={title[3]}>
                    <div>
                        <p>
                            연령 : ('22년 기준) 1994.1.1. ~ 2004.12.31. 출생자<br/>
                            학력 : 제한 없음<br/>
                            신체 : 병역판정(신체)검사 결과 신체등급 1급∼4급 현역병 입영대상인 사람<br/>
                            기타 : 색약 가능<br/>
                            지원요건 : 자격/면허 소지자(접수마감일까지 취득한 자) 또는 관련 직종 전공자<br/>
                            <br/>
                            지원 제한<br/>
                            징역 또는 금고의 형(집행유예 포함)을 선고받은 사람<br/>
                            사 또는 재판 중에 있는 사람으로서 최종선발자 발표일 7일 전까지 기소유예·혐의없음 등의 수사종결처분·결정 또는 재판이 확정되지 아니한 사람<br/>
                            처분미상으로 통보된 사람으로서 최종선발자 발표일 7일 전까지 처분 결과가 판명되지 아니한 사람<br/>
                            지원서 제출 시 학력, 자격/면허 등을 허위로 입력하거나 제출서류가 허위 또는 위조로 확인된사람
                        </p>
                    </div>
                </BodyTitle>
            </div>
        </div>
    );
};

let BodyTitle = (props) => {

    return (
        <article style={{ marginBottom: "30px" }}>
            <span className='body-title'>{props.title}</span>
            {props.children}
            {/* <hr/> */}
        </article>
    );
};

export default React.memo(SpDetail);