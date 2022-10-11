import React, { useLayoutEffect, useEffect, useState, useRef } from 'react';

import "../../css/Enlist.css"

let Enlist = (props) => {
    const slideRef = useRef();
    const [slideindex, setSlideindex] = useState(1);
    const [bannerstyle, setbannerstyle] = useState(null);
    const spRef = useRef();
    const [cont2item, setcont2item] = useState([]);
    const sp2Ref = useRef();
    const articleScrollRef = useRef();

    // slideindex useeffect 쓸것 
    useEffect(() => {
        console.log(slideindex);
    }, [slideindex]);

    const handelpre = () => {
        let t1 = slideindex - 1
        setSlideindex(t1);
        slideRef.current.style.transform = `translateX(-${slideRef.current.offsetWidth / 4 * (t1 - 1)}px)`;
    }

    const handelnext = () => {
        if (bannerstyle == null || slideindex == null) {
            spRef.current.innerText = "군종을 선택해주세요.";
            return null;
        }

        if (slideindex == 2 && cont2item.length==0) {
            sp2Ref.current.innerText = "특기를 선택해주세요.";
            return null;
        }

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

    useEffect(() => {
    }, [bannerstyle]);

    const handelbtn = (e) => {
        setbannerstyle(e.target.innerText);
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

    //특기 선택하면 스크롤 초기화되는거 수정해야함
    const handelcontItem = (e) => {
        if (cont2item.find(item => item.spindex == e.target.id) != undefined) {
            let spalready = cont2item.filter(data => data.spindex != e.target.id);
            setcont2item(spalready);
            return;
        }

        if (cont2item.length == 3) {
            alert("특기는 최대 3개까지 선택가능합니다.");
            return null;
        }

        let spdata = [...cont2item];
        spdata.push({ spname: e.target.innerText, spindex: e.target.id });
        setcont2item(spdata);
    }

    const Content2 = () => {
        const sp = ["CBT병", "추기병", "전기병", "보수병", "전산병", "정보보호병", "조리", "수송", "전탐", "CBT병", "추기병", "전기병", "보수병", "전산병", "정보보호병", "조리", "수송", "전탐", "CBT병", "추기병", "전기병", "보수병", "전산병", "정보보호병", "조리", "수송", "전탐", "CBT병", "추기병", "전기병", "보수병", "전산병", "정보보호병", "조리", "수송", "전탐", "CBT병", "추기병", "전기병", "보수병", "전산병", "정보보호병", "조리", "수송", "전탐", "CBT병", "추기병", "전기병", "보수병", "전산병", "정보보호병", "조리", "수송", "전탐"];

        return (
            <div className='content2-wrap'>
                <div className='content2-article' ref={articleScrollRef}>
                    {sp.map((item, index) => (
                        <div className='content2-item'
                            style={{
                                color: cont2item.find(item => item.spindex == index) != undefined ? 'white' : 'black',
                                backgroundColor: cont2item.find(item => item.spindex == index) != undefined ? '#183C8C' : 'white'
                            }}
                            key={index} id={index} onClick={handelcontItem}>{item}</div>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className='Enlist-wrap'>
            <button className={slideindex === 1 ? "btnblock" : "btnpre"} onClick={handelpre}>이전</button>
            {/* <button className={slideindex === 4 ? "btnblock" : "btnnext"} disabled={bannerstyle==null ? true:false} onClick={handelnext}>다음</button> */}
            <button className={slideindex === 4 ? "btnblock" : "btnnext"} onClick={handelnext}>다음</button>
            <div className='stepper-wrap'>
                <StepItem />
            </div>
            <div className='stepper-content' ref={slideRef}>
                <div className='stepper-content-inner'>
                    <Content1 />
                    <span className='content1-selector'>
                        <span className='selector-box' style={{ fontSize: "20px", fontWeight: 500 }}>
                            {bannerstyle}
                        </span>
                        <span ref={spRef}>
                            {bannerstyle == null ? "" : "을(를) 선택하셨습니다."}
                        </span>
                    </span>
                </div>
                <div className='stepper-content-inner'>
                    <Content2 />
                    <span className='content2-selector'>
                        <span style={{ fontSize: "20px", fontWeight: 500 }}>
                            {/* {cont2item.length == 1 ? cont2item.spname : cont2item.join(",")} */}
                            {cont2item.map((data, index) => {
                                return (
                                    <span>{cont2item.length == index + 1 ? data.spname : data.spname + ","}</span>
                                )
                            })
                            }
                        </span>
                        <span ref={sp2Ref}>
                            {cont2item.length == 0 ? "" : "을(를) 선택하셨습니다."}
                        </span>
                    </span>
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