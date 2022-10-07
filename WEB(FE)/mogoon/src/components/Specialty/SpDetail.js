import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';

import '../../css/SpDetail.css';
import '../../css/SpDetailTap.css';

let SpDetail = () => {
    //name을 기준으로 DB에서 값 가져오기
    const name = useParams().SpName;
    const [SpDetailData, setSpDetailData] = useState();

    const [title, SetTitle] = useState(["특기 학교", "주요 업무", "지원자격", "배점 기준"]);
    const titleKind = ["육군", "해군", "공군", "해병대"];
    
    const [activeIndex, setActiveIndex] = useState(0);
    const tabClickHandler = (index) => {
        setActiveIndex(index)
    }
    
    const [activeIndexKind, setActiveIndexKind] = useState(0);
    const tabClickHandlerKind = (index) => {
        setActiveIndexKind(index)
    }

    async function getData() {
        await axios.get(`http://localhost:5000/api/speciality/${name}`)
            .then((response) => {
                console.log(response);
                console.log(response.data.data);
                setSpDetailData(response.data.data);
            });
    }

    useEffect(() => {
        getData();
    }, []);

    if (SpDetailData==null) {
        return (
            <div>해당하는 특기가 존재하지 않습니다.</div>
        );
    }

    //군종 탭
    const tabContArr_kind = [
        {
            tabTitle: (
                <div className={activeIndexKind === 0 ? "is-activekind" : ""} onClick={() => { tabClickHandlerKind(0) }}>육군</div>
            ),
            tabCont: (
                <>
                    <BodyTitle title={`${title[2]}(${titleKind[0]})`}>
                        <div>
                            <p>
                                {SpDetailData.speciality_eligibility.army}
                            </p>
                        </div>
                    </BodyTitle>
                    <BodyTitle title={`${title[3]}(${titleKind[0]})`}>
                        <div>
                            <p>
                                {SpDetailData.score.army}
                            </p>
                        </div>
                    </BodyTitle>
                </>
            )
        },
        {
            tabTitle: (
                <div className={activeIndexKind === 1 ? "is-activekind" : ""} onClick={() => { tabClickHandlerKind(1) }}>해군</div>
            ),
            tabCont: (
                <>
                    <BodyTitle title={`${title[2]}(${titleKind[1]})`}>
                        <div>
                            <p>
                            {SpDetailData.speciality_eligibility.navy}
                            </p>
                        </div>
                    </BodyTitle>
                    <BodyTitle title={`${title[3]}(${titleKind[1]})`}>
                        <div>
                            <p>
                                {SpDetailData.score.navy}
                            </p>
                        </div>
                    </BodyTitle>
                </>
            )
        },
        {
            tabTitle: (
                <div className={activeIndexKind === 2 ? "is-activekind" : ""} onClick={() => { tabClickHandlerKind(2) }}>공군</div>
            ),
            tabCont: (
                <>
                    <BodyTitle title={`${title[2]}(${titleKind[2]})`}>
                        <div>
                            <p>
                            {SpDetailData.speciality_eligibility.airforce}
                            </p>
                        </div>
                    </BodyTitle>
                    <BodyTitle title={`${title[3]}(${titleKind[2]})`}>
                        <div>
                            <p>
                                {SpDetailData.score.airforce}
                            </p>
                        </div>
                    </BodyTitle>
                </>
            )
        },
        {
            tabTitle: (
                <div className={activeIndexKind === 3 ? "is-activekind" : ""} onClick={() => { tabClickHandlerKind(3) }}>해병대</div>
            ),
            tabCont: (
                <>
                    <BodyTitle title={`${title[2]}(${titleKind[3]})`}>
                        <div>
                            <p>
                            {SpDetailData.speciality_eligibility.marine}
                            </p>
                        </div>
                    </BodyTitle>
                    <BodyTitle title={`${title[3]}(${titleKind[3]})`}>
                        <div>
                            <p>
                                {SpDetailData.score.marine}
                            </p>
                        </div>
                    </BodyTitle>
                </>
            )
        }
    ];

    //특기 탭
    const tabContArr = [
        {
            tabTitle: (
                <div className={activeIndex === 0 ? "is-active" : ""} onClick={() => { tabClickHandler(0) }}>특기 소개</div>
            ),
            tabCont: (
                <>
                    <BodyTitle title={title[0]}>
                        <div>
                            <p>
                                {SpDetailData.speciality_education}
                            </p>
                        </div>
                    </BodyTitle>
                    <BodyTitle title={title[1]}>
                        <div>
                            <p>
                                {SpDetailData.speciality_work}
                            </p>
                        </div>
                    </BodyTitle>

                    <div className='tab'>
                        <div className="tabbox_kind">
                            {tabContArr_kind.map((section, index) => {
                                return section.tabTitle
                            })}
                        </div>

                        <div>
                            {tabContArr_kind[activeIndexKind].tabCont}
                        </div>
                    </div>
                </>
            )
        },
        {
            tabTitle: (
                <div className={activeIndex === 1 ? "is-active" : ""} onClick={() => { tabClickHandler(1) }}>의견 및 기타</div>
            ),
            tabCont: (
                <>
                    <div> 의견 및 기타 내용 </div>
                </>
            )
        },
        {
            tabTitle: (
                <div className={activeIndex === 2 ? "is-active" : ""} onClick={() => { tabClickHandler(2) }}>QnA (20)</div>
            ),
            tabCont: (
                <>
                    <div> QnA내용 </div>
                </>
            )
        }
    ];

    return (
        <div className='SpDetail-content'>
            <div className='section-header'>
                <div className='header-img' />
                <div className='header-content'>
                    <div className='header-content-name' style={{ display: "inline-block" }}>{name}</div>
                    <span className='header-content-miltray_kind' style={{color:"gray"}}>
                        ({SpDetailData.speciality_code[SpDetailData.military_kind[0]]})
                    </span>
                    <div className='header-content-kind'>
                        {SpDetailData.military_kind[0]} > {SpDetailData.class} > {SpDetailData.kind} > {SpDetailData.speciality_name}
                    </div>
                    <div className='desc'>
                        {SpDetailData.speciality_summary}
                    </div>
                </div>
            </div>

            <div className='section-body'>
                {/* 특기탭 */}
                <div className='tab'>
                    <div className="tabbox">
                        {tabContArr.map((section, index) => {
                            return section.tabTitle
                        })}
                    </div>

                    <div>
                        {tabContArr[activeIndex].tabCont}
                    </div>
                </div>

                {/* 군종탭 */}
                {/* <div className='tab'>
                    <div className="tabbox_kind">
                        {tabContArr_kind.map((section, index) => {
                            return section.tabTitle
                        })}
                    </div>

                    <div>
                        {tabContArr_kind[activeIndexKind].tabCont}
                    </div>
                </div> */}

            </div>
        </div>
    );
};

let BodyTitle = (props) => {
    return (
        <article className='body-artical' style={{ marginBottom: "30px" }}>
            <span className='body-title'>{props.title}</span>
            {props.children}
            {/* <hr/> */}
        </article>
    );
};

export default React.memo(SpDetail);