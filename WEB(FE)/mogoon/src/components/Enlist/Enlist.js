import React, { useLayoutEffect, useEffect, useState, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SpDetail from "../Specialty/SpDetail";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import "../../css/Enlist.css"

// test
import "../../css/SpDetail.css"

let Enlist = (props) => {
    const slideRef = useRef();
    const [slideindex, setSlideindex] = useState(1);
    // contnet1
    const [bannerstyle, setbannerstyle] = useState(null);
    const bannerRef = useRef([]);
    const spRef = useRef();
    // contnet2
    const [cont2item, setcont2item] = useState([]);
    const sp2Ref = useRef();
    const articleScrollRef = useRef();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [handelTargetText, sethandelTargetText] = useState(null);
    const [handelTargetindex, sethandelTargetindex] = useState(null);
    // content3
    const [cont3CertList, setcont3CertList] = useState([]);
    const [cont3Major, setcont3Major] = useState(null);
    const [cont3Attendance, setcont3Attendance] = useState(null);
    const [cont3Extra, setcont3Extra] = useState([]);
    const sp3Ref = useRef();
    // content4

    const handelpre = () => {
        let t1 = slideindex - 1
        setSlideindex(t1);
        slideRef.current.style.transform = `translateX(-${slideRef.current.offsetWidth / 4 * (t1 - 1)}px)`;
    }

    const handelnext = () => {
        if (slideindex == 2 && cont2item.length == 0) {
            sp2Ref.current.innerText = "특기를 선택해주세요.";
            return null;
        }

        if (slideindex == 3 && (cont3CertList.length == 0 || cont3Major == null || cont3Attendance == null)) {
            sp3Ref.current.innerText = "항목을 선택해주세요.";
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
                <div key={index}>
                    <div className={slideindex === (index + 1) ? "steps-index-active" : "steps-index"}>{index + 1}</div>
                    <span style={{ marginRight: "20px" }}>{item}</span>
                    <hr className={`steps-hr${index}`} />
                </div>
            ))
        );
    }

    let stBanners = ["육군", "해군", "공군", "해병대"];
    useEffect(() => {
        for (let i = 0; i < 4; i++) {
            bannerRef.current[i].addEventListener("click", () => {
                for (let j = 0; j < 4; j++) {
                    if (i == j) {
                        setbannerstyle(stBanners[j]);
                        setSlideindex(2);
                        slideRef.current.style.transform = `translateX(-${slideRef.current.offsetWidth / 4 * slideindex}px)`;
                    }
                }
            });
        }

    }, [bannerstyle, slideindex]);

    const handelBanner = (e) => {
        console.log(e.target.attributes.name.value);
        setbannerstyle(e.target.attributes.name.value);
    }

    const Content1 = () => {
        return (
            <>
                <div className='content1-wrap'>
                    <div>
                        <div ref={elem => (bannerRef.current[0] = elem)} className="content1-article">
                            <div className='content1-banner' name="육군"></div>
                        </div>
                        <div ref={elem => (bannerRef.current[1] = elem)} className="content1-article">
                            <div className='content1-banner' name="해군"></div>
                        </div>
                        <div ref={elem => (bannerRef.current[2] = elem)} className="content1-article">
                            <div className='content1-banner' name="공군"></div>
                        </div>
                        <div ref={elem => (bannerRef.current[3] = elem)} className="content1-article">
                            <div className='content1-banner' name="해병대"></div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    useEffect(() => {
        if (handelTargetText == null || handelTargetindex == null) {
            return;
        }

    }, [handelTargetText, handelTargetindex]);

    const handelModal = (e) => {
        sethandelTargetindex(e.target.id);
        sethandelTargetText(e.target.innerText);

        if (cont2item.find(item => item.spindex == e.target.id) != undefined) {
            let spalready = cont2item.filter(data => data.spindex != e.target.id);
            setcont2item(spalready);
            return;
        }

        if (cont2item.length == 3) {
            alert("특기는 최대 3개까지 선택가능합니다.");
            return;
        }

        handleOpen();
    }

    //특기 선택하면 스크롤 초기화되는거 수정해야함

    const handelcontItem = (e) => {
        let spdata = [...cont2item];
        spdata.push({ spname: handelTargetText, spindex: handelTargetindex });
        setcont2item(spdata);

        sethandelTargetindex(null);
        sethandelTargetText(null);
        handleClose();
    }

    const Content2 = () => {
        const sp = ["CBT병", "추기병", "전기병", "보수병", "전산병", "정보보호병", "조리", "수송", "전탐", "CBT병", "추기병", "전기병", "보수병", "전산병", "정보보호병", "조리", "수송", "전탐", "CBT병", "추기병", "전기병", "보수병", "전산병", "정보보호병", "조리", "수송", "전탐", "CBT병", "추기병", "전기병", "보수병", "전산병", "정보보호병", "조리", "수송", "전탐", "CBT병", "추기병", "전기병", "보수병", "전산병", "정보보호병", "조리", "수송", "전탐", "CBT병", "추기병", "전기병", "보수병", "전산병", "정보보호병", "조리", "수송", "전탐"];

        const style = {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: "50%",
            height: "60%",
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
            overflow: "auto"
        };

        return (
            <div className='content2-wrap'>
                <div className='content2-article' ref={articleScrollRef}>
                    {sp.map((item, index) => (
                        <div className='content2-item'
                            style={{
                                color: cont2item.find(item => item.spindex == index) != undefined ? 'white' : 'black',
                                backgroundColor: cont2item.find(item => item.spindex == index) != undefined ? '#183C8C' : 'white'
                            }}
                            key={index} id={index} onClick={handelModal}>{item}</div>
                    ))}
                </div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                >
                    <Box sx={style}>
                        <div style={{ width: "100%", display: "flex", justifyContent: "right" }}>
                            <div id="modal-modal-title" className='model-support' onClick={handelcontItem}>지원하기</div>
                        </div>
                        <SpDetail name="군지원" />
                    </Box>
                </Modal>
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
                    {props.options.map((option, index) => (
                        <option
                            key={option.value}
                            value={option.name}
                        >
                            {index == 0 ? option.name : `${option.name} - ${option.score}점`}
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
                    {props.options.map((option, index) => (
                        <option
                            key={option.value}
                            value={option.name}
                        >
                            {index == 0 ? option.name : `${option.name} - ${option.score}점`}
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
                    {props.options.map((option, index) => (
                        <option
                            key={option.value}
                            value={option.name}
                        >
                            {index == 0 ? option.name : `${option.name} - ${option.score}점`}
                        </option>
                    ))}
                </select>
            )
        }

        useEffect(() => {
        }, [cont3Extra]);

        const Extrapoints = [
            { name: "관련분야 직업경력자 1년~2년 미만", score: 4 },
            { name: "관련분야 직업경력자 6개월~1년 미만", score: 3 },
            { name: "관련분야 직업경력자 6개월 미만", score: 2 },
            { name: "독립유공자 (손)자녀", score: 4 },
            { name: "질병치유 자원병역이행자", score: 4 },
            { name: "국외이주자 중 현역복무지원자", score: 4 },
            { name: "다자녀(3명 이상) 가정자녀 가산점", score: 4 },
            { name: "다자녀(2명 이상) 가정자녀 가산점", score: 2 },
            { name: "민기초생활보장법 제7조제1항제1호에 따른 생계급여 수급권자", score: 4 },
            { name: "헌혈 8회 이상", score: 8 },
            { name: "헌혈 7회 이상", score: 7 },
            { name: "헌혈 6회 이상", score: 6 },
            { name: "헌혈 5회 이상", score: 5 },
            { name: "헌혈 4회 이상", score: 4 },
            { name: "헌혈 3회 이상", score: 3 },
            { name: "헌혈 2회 이상", score: 2 },
            { name: "헌혈 1회 이상", score: 1 },
            { name: "봉사 64시간 이상", score: 8 },
            { name: "봉사 56~63시간", score: 7 },
            { name: "봉사 48~55시간", score: 6 },
            { name: "봉사 40~47시간", score: 5 },
            { name: "봉사 32~39시간", score: 4 },
            { name: "봉사 24~31시간", score: 3 },
            { name: "봉사 16~23시간", score: 2 },
            { name: "봉사 8~15시간", score: 1 }
            //군종별로 더 있음
        ]

        Extrapoints.unshift({ name: "가산점을 선택해주세요.", scroe: 0 });

        const handelExtrapoint = (e) => {
            if (e.target.value == "가산점을 선택해주세요.") {
                return null;
            }

            if (cont3Extra.find(item => item.name == e.target.value) != undefined) {
                alert("이미 선택한 가산점 입니다.");
                return;
            }

            let extraLists = [...cont3Extra];
            extraLists.push({ name: e.target.value, score: Extrapoints.find(cert => cert.name == e.target.value).score });
            setcont3Extra(extraLists);
        }

        const handelExtradelete = (e) => {
            if (cont3Extra.find(item => item.name == e.target.attributes.name.value) != undefined) {
                let extraDeleteItems = cont3Extra.filter(item => item.name != e.target.attributes.name.value);
                setcont3Extra(extraDeleteItems);
            }
        }

        const Extrapoint = (props) => {

            return (
                <select className='content3-Extrapoint' onChange={handelExtrapoint} style={{ marginBottom: "10px" }}>
                    {props.options.map((option, index) => (
                        <option
                            key={option.value}
                            value={option.name}
                        >
                            {index == 0 ? option.name : `${option.name} - ${option.score}점`}
                        </option>
                    ))}
                </select>
            )
        }

        const table_cell = {
            fontSize: "1.1em",
            fontWeight: "900",
            backgroundColor: "rgb(240, 240, 240)",
        }

        const table_cell_point = {
            fontSize: "1em",
        }

        return (
            <div className='content3-wrap'>
                {/* <img src='img/etc/배점표.png' className='pointTable' /> */}
                <div className='table-wrap'>
                    <div className='table'>
                        <div style={{fontSize:"16px",fontWeight:500}}>일반기술병</div>
                        <TableContainer sx={{ width: "100%", height: "100%", backgroundColor: "white", borderRadius: "10px", border: "1px solid gray" ,boxShadow: "0px 1px 3px gray"}}>
                            <Table>
                                <TableRow sx={{ height: 80 }}>
                                    <TableCell sx={table_cell} align='center' rowSpan={2}>구분</TableCell>
                                    <TableCell sx={table_cell} align='center' colSpan={3}>📝서류전형</TableCell>
                                    <TableCell sx={table_cell} align='center' rowSpan={2}>👨‍🏫면접</TableCell>
                                    <TableCell sx={table_cell} align='center' rowSpan={2}>계</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={table_cell} align='center'>💳자격/면허</TableCell>
                                    <TableCell sx={table_cell} align='center'>🎒출결</TableCell>
                                    <TableCell sx={table_cell} align='center'>👍가산점</TableCell>
                                </TableRow>
                                <TableBody>
                                    <TableRow>
                                        <TableCell sx={{ height: 30 }} align='center'>배점</TableCell>
                                        <TableCell sx={table_cell_point} align='center'>70</TableCell>
                                        <TableCell sx={table_cell_point} align='center'>20</TableCell>
                                        <TableCell sx={table_cell_point} align='center'>15</TableCell>
                                        <TableCell sx={table_cell_point} align='center'>110</TableCell>
                                        <TableCell sx={table_cell_point} align='center'>215</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                    <div className='table'>
                    <div style={{fontSize:"16px",fontWeight:500}}>전문기술병</div>
                        <TableContainer sx={{ width: "100%", height: "100%", backgroundColor: "white", borderRadius: "10px", border: "1px solid gray",boxShadow: "0px 1px 3px gray" }}>
                            <Table>
                                <TableRow sx={{ height: 80 }}>
                                    <TableCell sx={table_cell} align='center' rowSpan={2}>구분</TableCell>
                                    <TableCell sx={table_cell} align='center' colSpan={4}>📝서류전형</TableCell>
                                    <TableCell sx={table_cell} align='center' rowSpan={2}>👨‍🏫면접</TableCell>
                                    <TableCell sx={table_cell} align='center' rowSpan={2}>계</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={table_cell} align='center'>💳자격/면허</TableCell>
                                    <TableCell sx={table_cell} align='center'>💳전공</TableCell>
                                    <TableCell sx={table_cell} align='center'>🎒출결</TableCell>
                                    <TableCell sx={table_cell} align='center'>👍가산점</TableCell>
                                </TableRow>
                                <TableBody>
                                    <TableRow>
                                        <TableCell sx={{ height: 30 }} align='center'>배점</TableCell>
                                        <TableCell sx={table_cell_point} align='center'>50</TableCell>
                                        <TableCell sx={table_cell_point} align='center'>40</TableCell>
                                        <TableCell sx={table_cell_point} align='center'>10</TableCell>
                                        <TableCell sx={table_cell_point} align='center'>15</TableCell>
                                        <TableCell sx={table_cell_point} align='center'>100</TableCell>
                                        <TableCell sx={table_cell_point} align='center'>215</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>

                </div>

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
                            {cont3CertList.map((data, index) => {
                                return (
                                    <div key={index} className='content3-certList'>
                                        {data.name}
                                        <span className='certdelete' name={data.name} onClick={handeldelete}>X</span>
                                    </div>
                                )
                            })}
                        </div>

                        {/* 가지고 있는 자격증이 여러개면? */}
                        <div className='total'>{cont3CertList.length == 0 ? "" : Math.max.apply(Math, cont3CertList.map(value => { return value.score; }))} : 점</div>
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
                        <Extrapoint options={Extrapoints}></Extrapoint>
                        {cont3Extra.map((data, index) => {
                            return (
                                <div key={index} className='content3-extralist'>
                                    {data.name}
                                    <span className='certdelete' name={data.name} onClick={handelExtradelete}>X</span>
                                </div>
                            )
                        })}
                        {/* score의 총합으로 계산하기 */}
                        <div className='total'>{cont3Extra.length == 0 ? "" : cont3Extra.reduce((accumulator, current) => accumulator + current.score, 0)} : 점</div>
                    </div>

                </div>
            </div>
        )
    }

    const Content4 = () => {

        return (
            <div className='content4-wrap'>
                <div className='content4-article'>
                    {cont2item.map((data, index) => {
                        return (
                            <div>{data.spname}</div>
                        )
                    })
                    }
                    {bannerstyle}
                </div>
            </div>
        )
    }

    return (
        <div className='Enlist-wrap'>
            <button className={slideindex === 1 ? "btnblock" : "btnpre"} onClick={handelpre}>이전</button>
            {/* <button className={(slideindex === 1 || slideindex === 4) ? "btnblock" : "btnnext"} onClick={handelnext}>다음</button> */}
            <button className={(slideindex === 4) ? "btnblock" : "btnnext"} onClick={handelnext}>다음</button>
            <div className='stepper-wrap'>
                <StepItem />
            </div>
            <div className='stepper-content' ref={slideRef}>
                <div className='stepper-content-inner'>
                    <Content1 />
                    {/* <span className='content1-selector'>
                        <span className='selector-box' style={{ fontSize: "20px", fontWeight: 500 }}>
                            {bannerstyle}
                        </span>
                        <span ref={spRef}>
                            {bannerstyle == null ? "" : "을(를) 선택하셨습니다."}
                        </span>
                    </span> */}
                </div>
                <div className='stepper-content-inner'>
                    <Content2 />
                    <span className='content2-selector'>
                        <span style={{ fontSize: "20px", fontWeight: 500 }}>
                            {/* {cont2item.length == 1 ? cont2item.spname : cont2item.join(",")} */}
                            {cont2item.map((data, index) => {
                                return (
                                    <span key={index}>{cont2item.length == index + 1 ? data.spname : data.spname + ","}</span>
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
                    <span className='content3-selector' ref={sp3Ref}></span>
                </div>
                <div className='stepper-content-inner'>
                    <Content4 />
                </div>
            </div>
        </div>
    );
};


export default Enlist;