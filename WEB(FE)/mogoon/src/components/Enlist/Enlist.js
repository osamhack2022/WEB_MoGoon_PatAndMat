import React, { useState, useRef } from 'react';

import "../../css/Enlist.css"

let Enlist = (props) => {
    const slideRef = useRef();
    const [slideindex, setSlideindex] = useState(1);
    const [btnstyle, setbtnstyle] = useState();

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

    return (
        <div className='Enlist-wrap'>
            <button className={slideindex === 1 ? "btnblock" : "btnpre"} onClick={handelpre}>이전</button>
            <button className={slideindex === 4 ? "btnblock" : "btnnext"} onClick={handelnext}>다음</button>
            <div className='stepper-wrap'>
                <StepItem />
            </div>
            <div className='stepper-content' ref={slideRef}>
                <div className='stepper-content-inner'>
                    <Content1/>
                </div>
                <div className='stepper-content-inner'>
                    {/* <Content1/> */}
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

const Content1 = () => {

    return(
        <div className='content1-wrap'>
            <div>   

            </div>
        </div>
    );
}


export default Enlist;