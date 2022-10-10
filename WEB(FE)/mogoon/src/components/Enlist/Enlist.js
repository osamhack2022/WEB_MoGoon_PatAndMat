import React, { useState, useRef } from 'react';

import "../../css/Enlist.css"

let Enlist = (props) => {
    const slideRef = useRef();
    const [slideindex, setSlideindex] = useState(1);
    const [bannerstyle, setbannerstyle] = useState(null);

    const handelpre = () => {
        let t1 = slideindex - 1
        setSlideindex(t1);
        slideRef.current.style.transform = `translateX(-${slideRef.current.offsetWidth / 4 * (t1 - 1)}px)`;
    }

    const handelnext = () => {
        let t2 = slideindex + 1;
        setSlideindex(t2);
        slideRef.current.style.transform = `translateX(-${slideRef.current.offsetWidth / 4 * slideindex}px)`;
    }

    let stSteps = ["군종을 선택해주세요.", "특기를 선택해주세요.", "개인정보를 입력해주세요.", "서류 점수 확인"];

    let StepItem = () => {
        return (
            stSteps.map((item, index) => (
                <div>
                    <div className={slideindex === (index + 1) ? "steps-index-active" : "steps-index"}>{index + 1}</div>
                    <span style={{ marginRight: "20px" }}>{item}</span>
                    <hr className={`steps-hr${index}`} />
                </div>
            ))
        );
    }

    const handelbtn = (e) => {
        setbannerstyle(e.target.innerText);
        console.log(bannerstyle);
    }

    const Content1 = () => {
        return (
            <>
                <div className='content1-wrap'>
                    <div>
                        <div className="content1-article" >
                            <div className={bannerstyle == "육군" ? "content1-banner banner-active" : 'content1-banner'} ></div>
                            <div className='banner-btn' onClick={handelbtn}>육군</div>
                        </div>
                        <div className="content1-article" >
                            <div className={bannerstyle == "해군" ? "content1-banner banner-active" : 'content1-banner'}></div>
                            <div className='banner-btn' onClick={handelbtn}>해군</div>
                        </div>
                        <div className="content1-article" >
                            <div className={bannerstyle == "공군" ? "content1-banner banner-active" : 'content1-banner'}></div>
                            <div className='banner-btn' onClick={handelbtn}>공군</div>
                        </div>
                        <div className="content1-article" >
                            <div className={bannerstyle == "해병대" ? "content1-banner banner-active" : 'content1-banner'}></div>
                            <div className='banner-btn' onClick={handelbtn}>해병대</div>
                        </div>
                    </div>
                </div>
                
            </>
        );
    }

    return (
        <div className='Enlist-wrap'>
            <button className={slideindex === 1 ? "btnblock" : "btnpre"}  onClick={handelpre}>이전</button>
            <button className={slideindex === 4 ? "btnblock" : "btnnext"} disabled={bannerstyle==null ? true:false} onClick={handelnext}>다음</button>
            <div className='stepper-wrap'>
                <StepItem />
            </div>
            <div className='stepper-content' ref={slideRef}>
                <div className='stepper-content-inner'>
                    <Content1 />
                    <span className='content1-selector'>
                        <span className='selector-box' style={{fontSize:"20px",fontWeight:500}}>
                            {bannerstyle}
                        </span>
                        <span>
                            {bannerstyle==null ? "":"을(를) 선택하셨습니다."}
                        </span>
                    </span>
                </div>
                <div className='stepper-content-inner'>
                    안녕하세요1
                </div>
                <div className='stepper-content-inner'>
                    안녕하세요2
                </div>
                <div className='stepper-content-inner'>
                    안녕하세요3
                </div>
            </div>
        </div>
    );
};


export default Enlist;