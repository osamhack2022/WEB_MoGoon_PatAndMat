import React, { useLayoutEffect, useEffect, useState, useRef } from 'react';
import ClearIcon from '@mui/icons-material/Clear';

import "../../css/Enlist.css"
import { positions } from '@mui/system';

let Enlist = (props) => {
    const slideRef = useRef();
    const [slideindex, setSlideindex] = useState(1);
    // contnet1
    const [bannerstyle, setbannerstyle] = useState(null);
    const spRef = useRef();
    // contnet2
    const [cont2item, setcont2item] = useState([]);
    const sp2Ref = useRef();
    const articleScrollRef = useRef();
    // content3
    const [cont3CertList, setcont3CertList] = useState([]);
    const [cont3Major, setcont3Major] = useState(null);
    const [cont3Attendance, setcont3Attendance] = useState(null);

    useEffect(() => {
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

        if (slideindex == 2 && cont2item.length == 0) {
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

    useEffect(() => {
    }, [cont3CertList]);

    const Content3 = () => {
        const nomalTitles = ["자격/면허", "출결", "가산점"];
        const spTitles = ["자격/면허", "전공", "출결", "가산점"];

        const certOption = [
            { name: "정보처리기사", score: 70 },
            { name: "정보처리산업기사", score: 68 },
            { name: "정보처리기능사", score: 66 },
            { name: "전기기사", score: 70 },
            { name: "전기산업기사", score: 68 },
            { name: "전기기능사", score: 66 },
            { name: "제품디자인기사", score: 70 },
            { name: "제품디자인산업기사", score: 68 },
            { name: "제품디자인기능사", score: 66 },
        ];

        certOption.unshift({ name: "자격증을 선택해주세요", scroe: 0 });

        const handelSelect = (e) => {
            if (e.target.value === "자격증을 선택해주세요") {
                return null;
            }

            if (cont3CertList.find(item => item.name == e.target.value) != undefined) {
                alert("이미 선택한 자격증 입니다.");
                return;
            }

            let certLists = [...cont3CertList];
            certLists.push({ name: e.target.value, score: certOption.find(cert => cert.name == e.target.value).score });
            setcont3CertList(certLists);
        }

        const handeldelete = (e) => {
            if (cont3CertList.find(item => item.name == e.target.attributes.name.value) != undefined) {
                let cearDeleteItems = cont3CertList.filter(item => item.name != e.target.attributes.name.value);
                setcont3CertList(cearDeleteItems);
            }
        }

        const Certificate = (props) => {

            return (
                <select className='content3-Certificate' onChange={handelSelect}>
                    {props.options.map((option) => (
                        <option
                            key={option.value}
                            value={option.name}
                        >
                            {option.name}
                        </option>
                    ))}
                </select>
            )
        }

        useEffect(() => {
        }, [cont3Major]);

        const MajorOption = [
            { name: "대학교 4년(수료)", score: 40 },
            { name: "대학교 4년(재학)", score: 38 },
            { name: "대학교 3년(수료)", score: 36 },
            { name: "대학교 3년(재학)", score: 34 },
            { name: "대학교 2년(수료)", score: 32 },
            { name: "대학교 2년(재학)", score: 30 },
            { name: "대학교 1년(수료)", score: 28 },
            { name: "대학교 1년(재학)", score: 26 },
            { name: "전문대 3년제 3학년(수료)", score: 40 },
            { name: "전문대 3년제 3학년(재학)", score: 38 },
            { name: "전문대 3년제 2학년(수료)", score: 36 },
            { name: "전문대 3년제 2학년(재학)", score: 34 },
            { name: "전문대 3년제 1학년(수료)", score: 32 },
            { name: "전문대 3년제 1학년(재학)", score: 28 },
            { name: "전문대 2년제 2학년(재학)", score: 36 },
            { name: "전문대 2년제 2학년(수료)", score: 34 },
            { name: "전문대 2년제 1학년(재학)", score: 32 },
            { name: "전문대 2년제 1학년(수료)", score: 28 },
            { name: "고등학교 졸업", score: 34 },
            { name: "직업전문학교/인력개발원 2년(수료)", score: 32 },
            { name: "직업전문학교/인력개발원 1년(수료) ~ 2년", score: 30 },
            { name: "직업전문학교/인력개발원 6개월 ~ 1년", score: 26 },
            { name: "비전공/고등학교 미만", score: 20 },
        ];

        MajorOption.unshift({ name: "전공을 선택해주세요.", scroe: 0 });

        const handelMajor = (e) => {
            setcont3Major({ name: e.target.value, score: MajorOption.find(major => major.name == e.target.value).score });
        }

        const Major = (props) => {
            return (
                <select className='content3-Major' onChange={handelMajor}>
                    {props.options.map((option) => (
                        <option
                            key={option.value}
                            value={option.name}
                        >
                            {option.name}
                        </option>
                    ))}
                </select>
            )
        }

        useEffect(() => {
        }, [cont3Attendance]);

        const AttendanceOptions = [
            { name: "0일", score: 10 },
            { name: "1~2일", score: 9 },
            { name: "3~4일", score: 8 },
            { name: "5~6일", score: 7 },
            { name: "7일 이상   ", score: 6 },
        ];

        AttendanceOptions.unshift({ name: "출결을 선택해주세요.", scroe: 0 });

        const handelAttendance = (e) => {
            if (e.target.value == "출결을 선택해주세요.") {
                return null;
            }

            setcont3Attendance({ name: e.target.value, score: AttendanceOptions.find(data => data.name == e.target.value).score });
        }

        const Attendance = (props) => {

            return (
                <select className='content3-Attendance' onChange={handelAttendance}>
                    {props.options.map((option) => (
                        <option
                            key={option.value}
                            value={option.name}
                        >
                            {option.name}
                        </option>
                    ))}
                </select>
            )
        }

        return (
            <div className='content3-wrap'>
                <img src='img/etc/배점표.png' className='pointTable' />

                <div className='content3-article'>
                    {/* {spTitles.map(data=>{
                        return(
                            <div className='content3-title'>
                                <div style={{fontSize:"18px",fontWeight:"500"}}>{data}</div>
                                
                            </div>
                        )
                    })} */}
                    <div className='content3-title'>
                        <div style={{ fontSize: "18px", fontWeight: "500" }}>{spTitles[0]}</div>

                        <Certificate options={certOption}></Certificate>
                        <div className='content3-certLists'>
                            {cont3CertList.map(data => {
                                return (
                                    <div className='content3-certList'>
                                        {data.name}
                                        <span className='certdelete' name={data.name} onClick={handeldelete}>X</span>
                                    </div>
                                )
                            })}
                        </div>

                        {/* 가지고 있는 자격증이 여러개면? */}
                        <div className='total'>{cont3CertList.length == 0 ? "" : cont3CertList[0].score} : 점</div>
                    </div>

                    <div className='content3-title'>
                        <div style={{ fontSize: "18px", fontWeight: "500" }}>{spTitles[1]}</div>
                        <Major options={MajorOption}></Major>
                        <div className='Majorselect' style={{ textAlign: "center", marginTop: '20px' }}>
                            {cont3Major == null ? "" : cont3Major.name}
                        </div>
                        <div className='total'>{cont3Major == null ? "" : cont3Major.score} : 점</div>
                    </div>

                    <div className='content3-title'>
                        <div style={{ fontSize: "18px", fontWeight: "500", display: "inline-block", marginRight: "5px" }}>{spTitles[2]}</div>
                        <span style={{ color: "gray", fontSize: "12px" }}>※고교 3년간 누계 적용</span>
                        <Attendance options={AttendanceOptions}></Attendance>
                        <div style={{ textAlign: "center", marginTop: '20px' }}>
                            {cont3Attendance == null ? "" : cont3Attendance.name}
                        </div>

                        <div className='total'>{cont3Attendance == null ? "" : cont3Attendance.score} : 점</div>
                    </div>

                    <div className='content3-title'>
                        <div style={{ fontSize: "18px", fontWeight: "500" }}>{spTitles[3]}</div>
                        <div className='total'>?? : 점</div>
                    </div>

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
                    <Content3 />
                </div>
                <div className='stepper-content-inner'>
                    안녕하세요3
                </div>
            </div>
        </div>
    );
};


export default Enlist;