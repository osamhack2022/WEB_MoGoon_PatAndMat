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
import axios from 'axios';

import "../../css/Enlist.css"

// test
import "../../css/SpDetail.css"
import { fontWeight } from '@mui/system';
import { useInsertionEffect } from 'react';

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
  const [cont2SpKind,setcont2SpKind] = useState();
  // content3
  const [openModal, setOpenModal] = React.useState(false);
  const [modalKind, setmodalKind] = useState();
  const handleModalOpen = (e) => {
    setmodalKind(e.target.attributes.name.value);
    setOpenModal(true);
  }
  const handleModalClose = () => setOpenModal(false);
  const [cont3CertList, setcont3CertList] = useState([]);
  const [cont3Major, setcont3Major] = useState(null);
  const [cont3Attendance, setcont3Attendance] = useState(null);
  const [cont3Extra, setcont3Extra] = useState([]);
  const sp3Ref = useRef();
  const [cont3User,setcont3User] = useState();
  // content4
  const [cont4TotalPoint, setcont4TotalPoint] = useState([]);

  useEffect(()=>{
    if(cont3User!=undefined){
      let test = [];
      test[0] =  cont3User.certificate;
      test[1] =  cont3User.school;
      test[2] =  cont3User.absent_days;
      test[3] =  cont3User.extra_point;

      for (let i = 0; i < 4; i++) {
        Object.keys(test[i]).forEach(key=>{
          if(test[i][key]!=null && test[i][key]!=""){
            switch (i) {
              case 0:
                console.log("정상적인 데이터 있다요",test[i][key]);
//여기서부터
                break;
              case 1:
                console.log("정상적인 데이터 있다요",test[i][key]);
                break;
              case 2:
                console.log("정상적인 데이터 있다요",test[i][key]);
                break;
              case 3:
                console.log("정상적인 데이터 있다요",test[i][key]);
                break;
              default:
                break;
            }
          }
        })
      }
    }
  },[cont3User]);

  async function getUser(){
    await axios.get('http://localhost:5000/api/user/info', {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("IdToken")}`,
        },
    })
    .then((response) => {
        setcont3User(response.data.data);
        console.log(response);
    })
    .catch((error) => {
        console.log(error);
    })
}

  const handelpre = () => {
    let t1 = slideindex - 1
    setSlideindex(t1);
    slideRef.current.style.transform = `translateX(-${slideRef.current.offsetWidth / 4 * (t1 - 1)}px)`;
  }

  useEffect(()=>{
    if(cont2item.length==0){
      setcont2SpKind(undefined);
    }
  },[cont2item]);

  const handelnext = () => {
    if (slideindex == 2 && cont2item.length == 0) {
      sp2Ref.current.innerText = "특기를 선택해주세요.";
      return null;
    }

    if(cont2SpKind=="일반"){
      if (slideindex == 3 && (cont3CertList.length == 0 || cont3Attendance == null)) {
        sp3Ref.current.innerText = "항목을 선택해주세요.";
        return null;
      }
    }else{
      if (slideindex == 3 && (cont3CertList.length == 0 || cont3Major == null || cont3Major.name=="" || cont3Attendance == null)) {
        sp3Ref.current.innerText = "항목을 선택해주세요.";
        return null;
      }
    }

    if(slideindex==2){
      getUser();

      // let setUserData = confirm("저장되어있는 개인정보를 불러올까요?");
    }

    if(cont2SpKind=="일반"){
      setcont3Major({name:'',score:0});
    }

    if(cont3CertList.length!=0 || cont3Attendance!=null || cont3Extra.length!=0){
      setcont4TotalPoint(Math.max.apply(Math,cont3CertList.map((value) => {return value.score}))+cont3Major.score+cont3Attendance.score + cont3Extra.reduce((accumulator, current) => accumulator + current.score,0));
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
            setcont2item([]);
            slideRef.current.style.transform = `translateX(-${slideRef.current.offsetWidth / 4 * slideindex}px)`;
          }
        }
      });
    }

  }, [bannerstyle, slideindex]);

  const handelBanner = (e) => {
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

  useEffect(()=>{

  },[cont2SpKind]);

  const handelModal = (e) => {
    sethandelTargetindex(e.target.id);
    sethandelTargetText(e.target.attributes.name.value);

    if (e.target.className == "content2-item") {
      //특기 있는거 지우는코드
      if (cont2item.find(item => item.spindex == e.target.id) != undefined) {
        let spalready = cont2item.filter(data => data.spindex != e.target.id);
        setcont2item(spalready);
        return;
      }

      if (cont2item.length == 3) {
        alert("특기는 최대 3개까지 선택가능합니다.");
        return;
      }

      //특기 추가 코드
      if(cont2SpKind==undefined){
        setcont2SpKind(e.target.children[0].innerText);
      }else{
        if(cont2SpKind!=e.target.children[0].innerText){
          alert("같은 계열의 특기만 선택하실 수 있습니다.");
          return;
        }
      }
      let spdata = [...cont2item];
      spdata.push({ spname: e.target.attributes.name.value, spindex: e.target.id });
      setcont2item(spdata);
    }
  }

  const handelDetail = (e) => {
    sethandelTargetindex(e.target.id);
    sethandelTargetText(e.target.name);

    handleOpen();
    return;
  }

  //특기 선택하면 스크롤 초기화되는거 수정해야함

  const handelcontItem = (e) => {
    if (cont2item.find(item => item.spindex == handelTargetindex) != undefined) {
      alert("이미 추가한 특기입니다");
      return;
    }

    if (cont2item.length == 3) {
      alert("특기는 최대 3개까지 선택가능합니다.");
      return;
    }

    if(cont2SpKind==undefined){
      setcont2SpKind(handelTargetindex%2==0?"일반":"전문");
    }else{
      if(cont2SpKind!=(handelTargetindex%2==0?"일반":"전문")){
        alert("같은 계열의 특기만 선택하실 수 있습니다.");
        return;
      }
    }

    let spdata = [...cont2item];
    spdata.push({ spname: handelTargetText, spindex: handelTargetindex });
    setcont2item(spdata);

    sethandelTargetindex(null);
    sethandelTargetText(null);
    handleClose();
  }

  const Content2 = () => {
    const sp = ["CBT병", "추기병", "전기병", "보수병", "전산병", "정보보호병", "조리", "수송", "전탐","정보체계관리병"
  ,"조타병","SSU","UDT","화생방병","어학병","군악병","콘텐츠 제작병","군견관리병","의장병","정훈병","비파괴검사병","카투사","야전공병","보급병","CBT병", "추기병", "전기병", "보수병", "전산병", "정보보호병", "조리", "수송", "전탐","정보체계관리병"
  ,"조타병","SSU","UDT","화생방병","어학병","군악병","콘텐츠 제작병","군견관리병","의장병","정훈병","비파괴검사병","카투사","야전공병","보급병"];

    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: "50%",
      height: "60%",
      bgcolor: 'background.paper',
      border: '1px solid #000',
      boxShadow: 24,
      p: 2,
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
              key={index} name={item} id={index} onClick={handelModal}>
              <span>{index%2==0?"일반":"전문"}</span>
              {item}
              <span id={index} name={item} onClick={handelDetail}>🔍</span>
            </div>
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
      { name: "국가기술자격증 - 기사 이상", score: cont2SpKind=="일반"? 70:50 },
      { name: "국가기술자격증 - 산업기사", score: cont2SpKind=="일반"? 68:45 },
      { name: "국가기술자격증 - 기능사", score: cont2SpKind=="일반"? 66:40 },
      { name: "민간자격증 - 공인", score: cont2SpKind=="일반"? 64:30 },
      { name: "민간자격증 - 비공인", score: cont2SpKind=="일반"? 62:26 },
      { name: "일학습 병행자격증 - L6/L5", score: cont2SpKind=="일반"? 70:50 },
      { name: "일학습 병행자격증 - L4/L3", score: cont2SpKind=="일반"? 68:45 },
      { name: "일학습 병행자격증 - L2", score: cont2SpKind=="일반"? 66:40 },
      { name: "미소지", score: cont2SpKind=="일반"? 68:20 },
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
              {/* {index == 0 ? option.name : `${option.name} - ${option.score}점`} */}
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
          {props.options.map((option, index) => (
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
      { name: "0일", score: cont2SpKind=="일반"?20:10 },
      { name: "1~2일", score: cont2SpKind=="일반"?19:9 },
      { name: "3~4일", score: cont2SpKind=="일반"?18:8 },
      { name: "5~6일", score: cont2SpKind=="일반"?17:7 },
      { name: "7일 이상   ", score: cont2SpKind=="일반"?16:6 },
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
              {/* {index == 0 ? option.name : `${option.name} - ${option.score}점`} */}
              {option.name}
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
              {/* {index == 0 ? option.name : `${option.name} - ${option.score}점`} */}
              {option.name}
            </option>
          ))}
        </select>
      )
    }

    const table_cell = {
      fontFamily: "Noto Sans KR",
      fontSize: "1.1em",
      fontWeight: "500",
      backgroundColor: "rgb(240, 240, 240)",
    }

    const table_cell_point = {
      fontFamily: "Noto Sans KR",
      fontSize: "1em",
      cursor: "pointer",
      textDecoration: "underline",
      color: "#183C8C",
      fontWeight: "500"
    }

    const styleModal = {
      fontFamily: "Noto Sans KR",
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: "auto",
      height: "auto",
      bgcolor: 'background.paper',
      border: '1px solid #000',
      boxShadow: 24,
      p: 3,
      overflow: "hidden"
    };

    const table_cell_detail = {
      width: "auto",
      fontFamily: "Noto Sans KR",
      fontSize: "1.1em",
      fontWeight: "600",
      backgroundColor: "rgb(240, 240, 240)",
    }

    const table_cell_point__detail = {
      wordBreak: "nomal",
      width: "auto",
      fontFamily: "Noto Sans KR",
      fontSize: "1em",
      fontWeight: "400"
    }

    useEffect(() => {

    }, [modalKind]);

    const NomalCertificate = () => {
      return (
        <TableContainer sx={{ width: "100%", height: "100%", backgroundColor: "white", borderRadius: "10px", border: "1px solid gray", boxShadow: "0px 1px 3px gray" }}>
          <Table>
            <TableRow sx={{ height: 80 }}>
              <TableCell sx={table_cell_detail} align='center' rowSpan={2}>구분</TableCell>
              <TableCell sx={table_cell_detail} align='center' colSpan={3}>국가기술자격증</TableCell>
              <TableCell sx={table_cell_detail} align='center' colSpan={3}>일학습병행자격증</TableCell>
              <TableCell sx={table_cell_detail} align='center' colSpan={2}>일반자격증</TableCell>
              <TableCell sx={table_cell_detail} align='center' rowSpan={2}>미소지</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={table_cell_detail} align='center'>기사이상</TableCell>
              <TableCell sx={table_cell_detail} align='center'>산업기사</TableCell>
              <TableCell sx={table_cell_detail} align='center'>기능사</TableCell>
              <TableCell sx={table_cell_detail} align='center'>L6, L5</TableCell>
              <TableCell sx={table_cell_detail} align='center'>L4, L3</TableCell>
              <TableCell sx={table_cell_detail} align='center'>L2</TableCell>
              <TableCell sx={table_cell_detail} align='center'>공인</TableCell>
              <TableCell sx={table_cell_detail} align='center'>비공인</TableCell>
            </TableRow>
            <TableBody>
              <TableRow>
                <TableCell sx={{ height: 30 }} align='center'>배점</TableCell>
                <TableCell sx={table_cell_point__detail} align='center'>70</TableCell>
                <TableCell sx={table_cell_point__detail} align='center'>68</TableCell>
                <TableCell sx={table_cell_point__detail} align='center'>66</TableCell>
                <TableCell sx={table_cell_point__detail} align='center'>70</TableCell>
                <TableCell sx={table_cell_point__detail} align='center'>68</TableCell>
                <TableCell sx={table_cell_point__detail} align='center'>66</TableCell>
                <TableCell sx={table_cell_point__detail} align='center'>64</TableCell>
                <TableCell sx={table_cell_point__detail} align='center'>62</TableCell>
                <TableCell sx={table_cell_point__detail} align='center'>60</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )
    }

    const Nomalattendance = () => {
      return (
        <TableContainer sx={{ width: "100%", height: "100%", backgroundColor: "white", borderRadius: "10px", border: "1px solid gray", boxShadow: "0px 1px 3px gray" }}>
          <Table>
            <TableRow sx={{ height: 80 }}>
              <TableCell sx={table_cell_detail} align='center' rowSpan={2}>구분</TableCell>
              <TableCell sx={table_cell_detail} align='center' colSpan={5}>결석일자</TableCell>
              <TableCell sx={table_cell_detail} align='center' rowSpan={2}>비고</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={table_cell_detail} align='center'>0일</TableCell>
              <TableCell sx={table_cell_detail} align='center'>1~2일</TableCell>
              <TableCell sx={table_cell_detail} align='center'>3~4일</TableCell>
              <TableCell sx={table_cell_detail} align='center'>5~6일</TableCell>
              <TableCell sx={table_cell_detail} align='center'>7일</TableCell>
            </TableRow>
            <TableBody>
              <TableRow>
                <TableCell sx={{ height: 30 }} align='center'>배점</TableCell>
                <TableCell sx={table_cell_point__detail} align='center'>20</TableCell>
                <TableCell sx={table_cell_point__detail} align='center'>19</TableCell>
                <TableCell sx={table_cell_point__detail} align='center'>18</TableCell>
                <TableCell sx={table_cell_point__detail} align='center'>17</TableCell>
                <TableCell sx={table_cell_point__detail} align='center'>16</TableCell>
                <TableCell sx={table_cell_point__detail} align='center'>고교 3년간 누계적용</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )
    }

    const Nomalextra = () => {
      return (
        <img src='img/etc/가산점.png' style={{ height: "70vh" }}></img>
      )
    }

    const Nomalinterview = () => {
      return (
        <TableContainer sx={{ width: "100%", height: "100%", backgroundColor: "white", borderRadius: "10px", border: "1px solid gray", boxShadow: "0px 1px 3px gray" }}>
          <Table>
            <TableRow sx={{ height: 80 }}>
              <TableCell sx={table_cell_detail} align='center' rowSpan={2}>평가내용</TableCell>
              <TableCell sx={table_cell_detail} align='center' rowSpan={2}>면접태도</TableCell>
              <TableCell sx={table_cell_detail} align='center' rowSpan={2}>표현력</TableCell>
              <TableCell sx={table_cell_detail} align='center' rowSpan={2}>정신력/의지력</TableCell>
              <TableCell sx={table_cell_detail} align='center' rowSpan={2}>성품</TableCell>
              <TableCell sx={table_cell_detail} align='center' rowSpan={2}>학교생활</TableCell>
              <TableCell sx={table_cell_detail} align='center' rowSpan={2}>계</TableCell>
            </TableRow>
            <TableBody>
              <TableRow>
                <TableCell sx={{ height: 30 }} align='center'>배점</TableCell>
                <TableCell sx={table_cell_point__detail} align='center'>22</TableCell>
                <TableCell sx={table_cell_point__detail} align='center'>22</TableCell>
                <TableCell sx={table_cell_point__detail} align='center'>22</TableCell>
                <TableCell sx={table_cell_point__detail} align='center'>22</TableCell>
                <TableCell sx={table_cell_point__detail} align='center'>22</TableCell>
                <TableCell sx={table_cell_point__detail} align='center'>110</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )
    }

    const SpecialtyCertificate = () => {
      return (
        <TableContainer sx={{ width: "100%", height: "100%", backgroundColor: "white", borderRadius: "10px", border: "1px solid gray", boxShadow: "0px 1px 3px gray" }}>
          <Table>
            <TableRow sx={{ height: 80 }}>
              <TableCell sx={table_cell_detail} align='center' rowSpan={2}>구분</TableCell>
              <TableCell sx={table_cell_detail} align='center' colSpan={3}>국가기술자격증</TableCell>
              <TableCell sx={table_cell_detail} align='center' colSpan={3}>일학습병행자격증</TableCell>
              <TableCell sx={table_cell_detail} align='center' colSpan={2}>일반자격증</TableCell>
              <TableCell sx={table_cell_detail} align='center' colSpan={2}>운전면허증(수송)</TableCell>
              <TableCell sx={table_cell_detail} align='center' rowSpan={2}>미소지</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={table_cell_detail} align='center'>기사이상</TableCell>
              <TableCell sx={table_cell_detail} align='center'>산업기사</TableCell>
              <TableCell sx={table_cell_detail} align='center'>기능사</TableCell>
              <TableCell sx={table_cell_detail} align='center'>L6, L5</TableCell>
              <TableCell sx={table_cell_detail} align='center'>L4, L3</TableCell>
              <TableCell sx={table_cell_detail} align='center'>L2</TableCell>
              <TableCell sx={table_cell_detail} align='center'>공인</TableCell>
              <TableCell sx={table_cell_detail} align='center'>비공인</TableCell>
              <TableCell sx={table_cell_detail} align='center'>대형/특수</TableCell>
              <TableCell sx={table_cell_detail} align='center'>1종보통</TableCell>
            </TableRow>
            <TableBody>
              <TableRow>
                <TableCell sx={{ height: 30 }} align='center'>배점</TableCell>
                <TableCell sx={table_cell_point__detail} align='center'>50</TableCell>
                <TableCell sx={table_cell_point__detail} align='center'>45</TableCell>
                <TableCell sx={table_cell_point__detail} align='center'>40</TableCell>
                <TableCell sx={table_cell_point__detail} align='center'>50</TableCell>
                <TableCell sx={table_cell_point__detail} align='center'>45</TableCell>
                <TableCell sx={table_cell_point__detail} align='center'>40</TableCell>
                <TableCell sx={table_cell_point__detail} align='center'>30</TableCell>
                <TableCell sx={table_cell_point__detail} align='center'>26</TableCell>
                <TableCell sx={table_cell_point__detail} align='center'>50</TableCell>
                <TableCell sx={table_cell_point__detail} align='center'>45</TableCell>
                <TableCell sx={table_cell_point__detail} align='center'>20</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )
    }

    const SpecialtyMajor = () => {
      return (
        <img src='img/etc/전공배점.png' style={{ height: "75vh" }}></img>
      )
    }

    const Specialtyattendance = () => {
      return (
        <TableContainer sx={{ width: "100%", height: "100%", backgroundColor: "white", borderRadius: "10px", border: "1px solid gray", boxShadow: "0px 1px 3px gray" }}>
          <Table>
            <TableRow sx={{ height: 80 }}>
              <TableCell sx={table_cell_detail} align='center' rowSpan={2}>구분</TableCell>
              <TableCell sx={table_cell_detail} align='center' colSpan={5}>결석일자</TableCell>
              <TableCell sx={table_cell_detail} align='center' rowSpan={2}>비고</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={table_cell_detail} align='center'>0일</TableCell>
              <TableCell sx={table_cell_detail} align='center'>1~2일</TableCell>
              <TableCell sx={table_cell_detail} align='center'>3~4일</TableCell>
              <TableCell sx={table_cell_detail} align='center'>5~6일</TableCell>
              <TableCell sx={table_cell_detail} align='center'>7일</TableCell>
            </TableRow>
            <TableBody>
              <TableRow>
                <TableCell sx={{ height: 30 }} align='center'>배점</TableCell>
                <TableCell sx={table_cell_point__detail} align='center'>10</TableCell>
                <TableCell sx={table_cell_point__detail} align='center'>9</TableCell>
                <TableCell sx={table_cell_point__detail} align='center'>8</TableCell>
                <TableCell sx={table_cell_point__detail} align='center'>7</TableCell>
                <TableCell sx={table_cell_point__detail} align='center'>6</TableCell>
                <TableCell sx={table_cell_point__detail} align='center'>고교 3년간 누계적용</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )
    }

    const Specialtyinterview = () => {
      return (
        <TableContainer sx={{ width: "100%", height: "100%", backgroundColor: "white", borderRadius: "10px", border: "1px solid gray", boxShadow: "0px 1px 3px gray" }}>
          <Table>
            <TableRow sx={{ height: 80 }}>
              <TableCell sx={table_cell_detail} align='center' rowSpan={2}>평가내용</TableCell>
              <TableCell sx={table_cell_detail} align='center' rowSpan={2}>면접태도</TableCell>
              <TableCell sx={table_cell_detail} align='center' rowSpan={2}>표현력</TableCell>
              <TableCell sx={table_cell_detail} align='center' rowSpan={2}>정신력/의지력</TableCell>
              <TableCell sx={table_cell_detail} align='center' rowSpan={2}>성품</TableCell>
              <TableCell sx={table_cell_detail} align='center' rowSpan={2}>학교생활</TableCell>
              <TableCell sx={table_cell_detail} align='center' rowSpan={2}>계</TableCell>
            </TableRow>
            <TableBody>
              <TableRow>
                <TableCell sx={{ height: 30 }} align='center'>배점</TableCell>
                <TableCell sx={table_cell_point__detail} align='center'>20</TableCell>
                <TableCell sx={table_cell_point__detail} align='center'>20</TableCell>
                <TableCell sx={table_cell_point__detail} align='center'>20</TableCell>
                <TableCell sx={table_cell_point__detail} align='center'>20</TableCell>
                <TableCell sx={table_cell_point__detail} align='center'>20</TableCell>
                <TableCell sx={table_cell_point__detail} align='center'>100</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )
    }

    const TotalModal = () => {
      switch (modalKind) {
        case "일반자격":
          return <NomalCertificate />;

        case "일반출결":
          return <Nomalattendance />;
        case "일반가산점":
          return <Nomalextra />;
        case "일반면접":
          return <Nomalinterview />;
        case "전문자격":
          return <SpecialtyCertificate />;
        case "전문전공":
          return <SpecialtyMajor />;
        case "전문출결":
          return <Specialtyattendance />;
        case "전문가산점":
          return <Nomalextra />;
        case "전문면접":
          return <Specialtyinterview />;
        default:
          break;
      }
    };

    return (
      <div className="content3-wrap">
        {/* <img src='img/etc/배점표.png' className='pointTable' /> */}
        <div className="table-wrap">
          {cont2SpKind == "일반"? <div className="table">
            <div style={{ fontSize: "16px", fontWeight: 500 }}>
              일반기술병
            </div>
            <TableContainer
              sx={{
                width: "100%",
                height: "100%",
                backgroundColor: "white",
                borderRadius: "10px",
                border: "1px solid gray",
                boxShadow: "0px 1px 3px gray",
              }}
            >
              <Table>
                <TableRow sx={{ height: 80 }}>
                  <TableCell sx={table_cell} align="center" rowSpan={2}>
                    구분
                  </TableCell>
                  <TableCell sx={table_cell} align="center" colSpan={3}>
                    📝서류전형
                  </TableCell>
                  <TableCell sx={table_cell} align="center" rowSpan={2}>
                    👨‍🏫면접
                  </TableCell>
                  <TableCell sx={table_cell} align="center" rowSpan={2}>
                    계
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={table_cell} align="center">
                    💳자격/면허
                  </TableCell>
                  <TableCell sx={table_cell} align="center">
                    🎒출결
                  </TableCell>
                  <TableCell sx={table_cell} align="center">
                    👍가산점
                  </TableCell>
                </TableRow>
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ height: 30 }} align="center">
                      배점
                    </TableCell>
                    <TableCell
                      sx={table_cell_point}
                      align="center"
                      name="일반자격"
                      onClick={handleModalOpen}
                    >
                      70
                    </TableCell>
                    <TableCell
                      sx={table_cell_point}
                      align="center"
                      name="일반출결"
                      onClick={handleModalOpen}
                    >
                      20
                    </TableCell>
                    <TableCell
                      sx={table_cell_point}
                      align="center"
                      name="일반가산점"
                      onClick={handleModalOpen}
                    >
                      15
                    </TableCell>
                    <TableCell
                      sx={table_cell_point}
                      align="center"
                      name="일반면접"
                      onClick={handleModalOpen}
                    >
                      110
                    </TableCell>
                    <TableCell
                      sx={{ fontSize: "1em", fontWeight: "700" }}
                      align="center"
                    >
                      215점
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>: <div className="table">
            <div style={{ fontSize: "16px", fontWeight: 500 }}>
              전문기술병
            </div>
            <TableContainer
              sx={{
                width: "100%",
                height: "100%",
                backgroundColor: "white",
                borderRadius: "10px",
                border: "1px solid gray",
                boxShadow: "0px 1px 3px gray",
              }}
            >
              <Table>
                <TableRow sx={{ height: 80 }}>
                  <TableCell sx={table_cell} align="center" rowSpan={2}>
                    구분
                  </TableCell>
                  <TableCell sx={table_cell} align="center" colSpan={4}>
                    📝서류전형
                  </TableCell>
                  <TableCell sx={table_cell} align="center" rowSpan={2}>
                    👨‍🏫면접
                  </TableCell>
                  <TableCell sx={table_cell} align="center" rowSpan={2}>
                    계
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={table_cell} align="center">
                    💳자격/면허
                  </TableCell>
                  <TableCell sx={table_cell} align="center">
                    💳전공
                  </TableCell>
                  <TableCell sx={table_cell} align="center">
                    🎒출결
                  </TableCell>
                  <TableCell sx={table_cell} align="center">
                    👍가산점
                  </TableCell>
                </TableRow>
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ height: 30 }} align="center">
                      배점
                    </TableCell>
                    <TableCell sx={table_cell_point} align="center" name="전문자격" onClick={handleModalOpen}>
                      50
                    </TableCell>
                    <TableCell sx={table_cell_point} align="center" name="전문전공" onClick={handleModalOpen}>
                      40
                    </TableCell>
                    <TableCell sx={table_cell_point} align="center" name="전문출결" onClick={handleModalOpen}>
                      10
                    </TableCell>
                    <TableCell sx={table_cell_point} align="center" name="전문가산점" onClick={handleModalOpen}>
                      15
                    </TableCell>
                    <TableCell sx={table_cell_point} align="center" name="전문면접" onClick={handleModalOpen}>
                      100
                    </TableCell>
                    <TableCell
                      sx={{ fontSize: "1em", fontWeight: "700" }}
                      align="center"
                    >
                      215점
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>}
         
         
          <Modal
            open={openModal}
            onClose={handleModalClose}
            aria-labelledby="modal-modal-title"
          >
            <Box sx={styleModal}>{<TotalModal />}</Box>
          </Modal>
        </div>

        <div className="content3-article">
          <div className="content3-title">
            <div style={{
                fontSize: "18px",
                fontWeight: "500",
                display: "inline-block",
                marginRight: "5px",
              }}>
              {spTitles[0]}
            </div>
            <span style={{ color: "gray", fontSize: "12px" }}>
              ※가장 높은 점수의 자격증 기준
            </span>
            <Certificate options={certOption}></Certificate>
            <div className="content3-certLists">
              {cont3CertList.map((data, index) => {
                return (
                  <div key={index} className="content3-certList">
                    {data.name}
                    <span
                      className="certdelete"
                      name={data.name}
                      onClick={handeldelete}
                    >
                      X
                    </span>
                  </div>
                );
              })}
            </div>

            {/* 가지고 있는 자격증이 여러개면? */}
            <div className="total">
              {cont3CertList.length == 0
                ? ""
                : Math.max.apply(
                  Math,
                  cont3CertList.map((value) => {
                    return value.score;
                  })
                )}{" "}
              : 점
            </div>
          </div>
          {cont2SpKind=="전문"?
          <div className="content3-title">
            <div style={{ fontSize: "18px", fontWeight: "500" }}>
              {spTitles[1]}
            </div>
            <Major options={MajorOption}></Major>
            <div
              className="Majorselect"
              style={{ textAlign: "center", marginTop: "20px" }}
            >
              {cont3Major == null ? "" : cont3Major.name}
            </div>
            <div className="total">
              {cont3Major == null ? "" : cont3Major.score} : 점
            </div>
          </div>:""}

          <div className="content3-title">
            <div
              style={{
                fontSize: "18px",
                fontWeight: "500",
                display: "inline-block",
                marginRight: "5px",
              }}
            >
              {spTitles[2]}
            </div>
            <span style={{ color: "gray", fontSize: "12px" }}>
              ※고교 3년간 누계 적용
            </span>
            <Attendance options={AttendanceOptions}></Attendance>
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              {cont3Attendance == null ? "" : cont3Attendance.name}
            </div>

            <div className="total">
              {cont3Attendance == null ? "" : cont3Attendance.score} : 점
            </div>
          </div>

          <div className="content3-title">
            <div style={{ fontSize: "18px", fontWeight: "500" }}>
              {spTitles[3]}
            </div>
            <Extrapoint options={Extrapoints}></Extrapoint>
            {cont3Extra.map((data, index) => {
              return (
                <div key={index} className="content3-extralist">
                  {data.name}
                  <span
                    className="certdelete"
                    name={data.name}
                    onClick={handelExtradelete}
                  >
                    X
                  </span>
                </div>
              );
            })}
            {/* score의 총합으로 계산하기 */}
            <div className="total">
              {cont3Extra.length == 0
                ? ""
                : cont3Extra.reduce(
                  (accumulator, current) => accumulator + current.score,
                  0
                )}{" "}
              : 점
            </div>
          </div>
        </div>
      </div>
    );
  }

  useEffect(()=>{
  },[cont4TotalPoint]);

  const Content4 = () => {
    const POINTS1 = "ㅇ 배점 : 자격증(70점) + 출결(15점) + 가산점(15점) ";
    const POINTS2 = "ㅇ 배점 : 자격증(50점) + 전공(40점) + 출결(10점) + 가산점(15점) ";

    const table_cell_detail = {
      width: "auto",
      fontFamily: "Noto Sans KR",
      fontSize: "1.1em",
      fontWeight: "600",
      backgroundColor: "rgb(240, 240, 240)",
    }

    const table_cell_point__detail = {
      wordBreak: "nomal",
      width: "auto",
      fontFamily: "Noto Sans KR",
      fontSize: "1em",
      fontWeight: "400"
    }

    const table_cell_point__total = {
      wordBreak: "nomal",
      width: "auto",
      fontFamily: "Noto Sans KR",
      fontSize: "1.1em",
      fontWeight: "600"
    }

    return (
      <div className='content4-wrap'>
        <div className='content4-article'>
          {cont2item.map((data, index) => {
            return (
              <div className='content4-section' key={index}>
                <div className='table-spname'>{data.spname}</div>
                <div className='table-points'>{cont2SpKind=="일반"?POINTS1:POINTS2}<span>{cont2SpKind=="일반"?" 계(105점)":" 계(115점)"}</span></div>
                <TableContainer sx={{ width: "100%", height: "auto", backgroundColor: "white", borderRadius: "10px", border: "1px solid gray", boxShadow: "0px 1px 3px gray" }}>
                  <Table>
                    <TableRow sx={{ height: 30 }}>
                    <TableCell sx={{backgroundColor:"rgb(240, 240, 240)",borderRight:"1px solid rgba(0,0,0,0.13)"}} align='center' rowSpan={1}></TableCell>
                      <TableCell sx={table_cell_detail} align='center' rowSpan={1}>자격증</TableCell>
                      {cont2SpKind=="일반"?"":<TableCell sx={table_cell_detail} align='center' rowSpan={1}>전공</TableCell>} 
                      <TableCell sx={table_cell_detail} align='center' rowSpan={1}>출결</TableCell>
                      <TableCell sx={table_cell_detail} align='center' rowSpan={1}>가산점</TableCell>
                      <TableCell sx={Object.assign(table_cell_detail, {borderLeft:"1px solid rgba(0,0,0,0.13)"})} align='center' rowSpan={1}>계</TableCell>
                    </TableRow>
                    <TableBody>
                      <TableRow>
                        <TableCell sx={{ width: 180, height: 25, borderRight: "1px solid rgba(0,0,0,0.13)" }} align='center'>지원자</TableCell>
                        <TableCell sx={table_cell_point__detail} colSpan={1} align='center'>{cont3CertList.length == 0
                          ? ""
                          : Math.max.apply(
                            Math,
                            cont3CertList.map((value) => {
                              return value.score;
                            })
                          )}</TableCell>
                        {cont2SpKind=="일반"?"":<TableCell sx={table_cell_point__detail} colSpan={1} align='center'>{cont3Major != null ? cont3Major.score : ""}</TableCell>}
                        <TableCell sx={table_cell_point__detail} colSpan={1} align='center'>{cont3Attendance != null ? cont3Attendance.score : ""}</TableCell>
                        <TableCell sx={table_cell_point__detail} colSpan={1} align='center'> {cont3Extra.length == 0
                          ? "0"
                          : cont3Extra.reduce(
                            (accumulator, current) => accumulator + current.score,
                            0
                          )}</TableCell>
                        <TableCell sx={Object.assign(table_cell_point__detail, { borderLeft: "1px solid rgba(0,0,0,0.13)" })} colSpan={1} align='center'>
                        {cont4TotalPoint} 점
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ width: "auto", height: 25, borderRight:"1px solid rgba(0,0,0,0.13)"}} align='center'>2022년 기준</TableCell>
                        <TableCell sx={table_cell_point__total} colSpan={cont2SpKind=="일반"?4:5} align='center'>{cont2SpKind=="일반"?"76점":"70점"}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            )
          })
          }
        </div>
      </div>
    )
  }

  return (
    <div className='Enlist-wrap'>
      <button className={slideindex === 1 ? "btnblock" : "btnpre"} onClick={handelpre}>이전</button>
      <button className={(slideindex === 1 || slideindex === 4) ? "btnblock" : "btnnext"} onClick={handelnext}>다음</button>
      <div className='stepper-wrap'>
        <StepItem />
      </div>
      <div className='stepper-content' ref={slideRef}>
        <div className='stepper-content-inner'>
          <Content1 />
        </div>
        <div className='stepper-content-inner'>
          <Content2 />
          <span className='content2-selector'>
            <span style={{color:"rgb(66, 66, 66)",fontSize:"1.1em",fontWeight:500}}>
              {cont2item.length==0?"":cont2SpKind + " 계열 : "}
            </span>
            <span style={{ fontSize: "20px", fontWeight: 500 }}>
              {cont2item.map((data, index) => {
                return (
                  <span key={index}>{cont2item.length == index + 1 ? data.spname : data.spname + ", "}</span>
                )
              })
              }
            </span>
            <span ref={sp2Ref}>
              {cont2item.length == 0 ? "" : " 을(를) 선택하셨습니다."}
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