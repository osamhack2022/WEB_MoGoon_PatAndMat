import React, { useState, useRef } from 'react';

import "../../css/Enlist.css"

let Enlist = (props) => {
    const slideRef = useRef();
    const [slideindex, setSlideindex] = useState(1);

    const handelpre =()=>{
        console.log(slideRef.current.offsetWidth);
        setSlideindex(slideindex-1);
        slideRef.current.style.transform = `translateX(+${slideRef.current.offsetWidth * slideindex}px)`;
    }

    const handelnext =()=>{
        setSlideindex(slideindex+1);
        console.log(slideRef.current.offsetWidth * slideindex);
        slideRef.current.style.transform = `translateX(-${slideRef.current.offsetWidth * slideindex}px)`;
    }

    return (
        <div className='Enlist-wrap'>
            <button className='btnpre' onClick={handelpre}>이전</button>
            <button className='btnnext' onClick={handelnext}>다음</button>
            <div className='stepper-wrap'>
                <StepItem />
            </div>
            <div className='stepper-content' name={slideindex} ref={slideRef}>
                <div className='stepper-content-inner'>

                </div>
                <div className='stepper-content-inner'>

                </div>
                <div className='stepper-content-inner'>

                </div>
                <div className='stepper-content-inner'>

                </div>
            </div>
        </div>
    );
};

let stSteps = ["군종을 선택해주세요.", "특기를 선택해주세요.", "개인정보를 입력해주세요.", "서류 점수 확인"];

let StepItem = () => {

    return (
        stSteps.map((item, index) => (
            <div>
                <div className='steps-index'>{index + 1}</div>
                <span style={{ marginRight: "20px" }}>{item}</span>
                <hr className={`steps-hr${index}`} />
            </div>
        ))
    );
}


export default Enlist;