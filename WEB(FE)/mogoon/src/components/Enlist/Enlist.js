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
                console.log("???????????? ????????? ?????????",test[i][key]);
//???????????????
                break;
              case 1:
                console.log("???????????? ????????? ?????????",test[i][key]);
                break;
              case 2:
                console.log("???????????? ????????? ?????????",test[i][key]);
                break;
              case 3:
                console.log("???????????? ????????? ?????????",test[i][key]);
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
      sp2Ref.current.innerText = "????????? ??????????????????.";
      return null;
    }

    if(cont2SpKind=="??????"){
      if (slideindex == 3 && (cont3CertList.length == 0 || cont3Attendance == null)) {
        sp3Ref.current.innerText = "????????? ??????????????????.";
        return null;
      }
    }else{
      if (slideindex == 3 && (cont3CertList.length == 0 || cont3Major == null || cont3Major.name=="" || cont3Attendance == null)) {
        sp3Ref.current.innerText = "????????? ??????????????????.";
        return null;
      }
    }

    if(slideindex==2){
      getUser();

      // let setUserData = confirm("?????????????????? ??????????????? ????????????????");
    }

    if(cont2SpKind=="??????"){
      setcont3Major({name:'',score:0});
    }

    if(cont3CertList.length!=0 || cont3Attendance!=null || cont3Extra.length!=0){
      setcont4TotalPoint(Math.max.apply(Math,cont3CertList.map((value) => {return value.score}))+cont3Major.score+cont3Attendance.score + cont3Extra.reduce((accumulator, current) => accumulator + current.score,0));
    }

    let t2 = slideindex + 1;
    setSlideindex(t2);
    slideRef.current.style.transform = `translateX(-${slideRef.current.offsetWidth / 4 * slideindex}px)`;
  }

  let stSteps = ["????????? ??????????????????.", "????????? ??????????????????.", "??????????????? ??????????????????.", "?????? ?????? ??????"];

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

  let stBanners = ["??????", "??????", "??????", "?????????"];
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
              <div className='content1-banner' name="??????"></div>
            </div>
            <div ref={elem => (bannerRef.current[1] = elem)} className="content1-article">
              <div className='content1-banner' name="??????"></div>
            </div>
            <div ref={elem => (bannerRef.current[2] = elem)} className="content1-article">
              <div className='content1-banner' name="??????"></div>
            </div>
            <div ref={elem => (bannerRef.current[3] = elem)} className="content1-article">
              <div className='content1-banner' name="?????????"></div>
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
      //?????? ????????? ???????????????
      if (cont2item.find(item => item.spindex == e.target.id) != undefined) {
        let spalready = cont2item.filter(data => data.spindex != e.target.id);
        setcont2item(spalready);
        return;
      }

      if (cont2item.length == 3) {
        alert("????????? ?????? 3????????? ?????????????????????.");
        return;
      }

      //?????? ?????? ??????
      if(cont2SpKind==undefined){
        setcont2SpKind(e.target.children[0].innerText);
      }else{
        if(cont2SpKind!=e.target.children[0].innerText){
          alert("?????? ????????? ????????? ???????????? ??? ????????????.");
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

  //?????? ???????????? ????????? ?????????????????? ???????????????

  const handelcontItem = (e) => {
    if (cont2item.find(item => item.spindex == handelTargetindex) != undefined) {
      alert("?????? ????????? ???????????????");
      return;
    }

    if (cont2item.length == 3) {
      alert("????????? ?????? 3????????? ?????????????????????.");
      return;
    }

    if(cont2SpKind==undefined){
      setcont2SpKind(handelTargetindex%2==0?"??????":"??????");
    }else{
      if(cont2SpKind!=(handelTargetindex%2==0?"??????":"??????")){
        alert("?????? ????????? ????????? ???????????? ??? ????????????.");
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
    const sp = ["CBT???", "?????????", "?????????", "?????????", "?????????", "???????????????", "??????", "??????", "??????","?????????????????????"
  ,"?????????","SSU","UDT","????????????","?????????","?????????","????????? ?????????","???????????????","?????????","?????????","??????????????????","?????????","????????????","?????????","CBT???", "?????????", "?????????", "?????????", "?????????", "???????????????", "??????", "??????", "??????","?????????????????????"
  ,"?????????","SSU","UDT","????????????","?????????","?????????","????????? ?????????","???????????????","?????????","?????????","??????????????????","?????????","????????????","?????????"];

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
              <span>{index%2==0?"??????":"??????"}</span>
              {item}
              <span id={index} name={item} onClick={handelDetail}>????</span>
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
              <div id="modal-modal-title" className='model-support' onClick={handelcontItem}>????????????</div>
            </div>
            <SpDetail name="?????????" />
          </Box>
        </Modal>
      </div>
    )
  }

  useEffect(() => {
  }, [cont3CertList]);

  const Content3 = () => {
    const nomalTitles = ["??????/??????", "??????", "?????????"];
    const spTitles = ["??????/??????", "??????", "??????", "?????????"];

    const certOption = [
      { name: "????????????????????? - ?????? ??????", score: cont2SpKind=="??????"? 70:50 },
      { name: "????????????????????? - ????????????", score: cont2SpKind=="??????"? 68:45 },
      { name: "????????????????????? - ?????????", score: cont2SpKind=="??????"? 66:40 },
      { name: "??????????????? - ??????", score: cont2SpKind=="??????"? 64:30 },
      { name: "??????????????? - ?????????", score: cont2SpKind=="??????"? 62:26 },
      { name: "????????? ??????????????? - L6/L5", score: cont2SpKind=="??????"? 70:50 },
      { name: "????????? ??????????????? - L4/L3", score: cont2SpKind=="??????"? 68:45 },
      { name: "????????? ??????????????? - L2", score: cont2SpKind=="??????"? 66:40 },
      { name: "?????????", score: cont2SpKind=="??????"? 68:20 },
    ];

    certOption.unshift({ name: "???????????? ??????????????????", scroe: 0 });

    const handelSelect = (e) => {
      if (e.target.value === "???????????? ??????????????????") {
        return null;
      }

      if (cont3CertList.find(item => item.name == e.target.value) != undefined) {
        alert("?????? ????????? ????????? ?????????.");
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
              {/* {index == 0 ? option.name : `${option.name} - ${option.score}???`} */}
              {option.name}
            </option>
          ))}
        </select>
      )
    }

    useEffect(() => {
    }, [cont3Major]);

    const MajorOption = [
      { name: "????????? 4???(??????)", score: 40 },
      { name: "????????? 4???(??????)", score: 38 },
      { name: "????????? 3???(??????)", score: 36 },
      { name: "????????? 3???(??????)", score: 34 },
      { name: "????????? 2???(??????)", score: 32 },
      { name: "????????? 2???(??????)", score: 30 },
      { name: "????????? 1???(??????)", score: 28 },
      { name: "????????? 1???(??????)", score: 26 },
      { name: "????????? 3?????? 3??????(??????)", score: 40 },
      { name: "????????? 3?????? 3??????(??????)", score: 38 },
      { name: "????????? 3?????? 2??????(??????)", score: 36 },
      { name: "????????? 3?????? 2??????(??????)", score: 34 },
      { name: "????????? 3?????? 1??????(??????)", score: 32 },
      { name: "????????? 3?????? 1??????(??????)", score: 28 },
      { name: "????????? 2?????? 2??????(??????)", score: 36 },
      { name: "????????? 2?????? 2??????(??????)", score: 34 },
      { name: "????????? 2?????? 1??????(??????)", score: 32 },
      { name: "????????? 2?????? 1??????(??????)", score: 28 },
      { name: "???????????? ??????", score: 34 },
      { name: "??????????????????/??????????????? 2???(??????)", score: 32 },
      { name: "??????????????????/??????????????? 1???(??????) ~ 2???", score: 30 },
      { name: "??????????????????/??????????????? 6?????? ~ 1???", score: 26 },
      { name: "?????????/???????????? ??????", score: 20 },
    ];

    MajorOption.unshift({ name: "????????? ??????????????????.", scroe: 0 });

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
      { name: "0???", score: cont2SpKind=="??????"?20:10 },
      { name: "1~2???", score: cont2SpKind=="??????"?19:9 },
      { name: "3~4???", score: cont2SpKind=="??????"?18:8 },
      { name: "5~6???", score: cont2SpKind=="??????"?17:7 },
      { name: "7??? ??????   ", score: cont2SpKind=="??????"?16:6 },
    ];

    AttendanceOptions.unshift({ name: "????????? ??????????????????.", scroe: 0 });

    const handelAttendance = (e) => {
      if (e.target.value == "????????? ??????????????????.") {
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
              {/* {index == 0 ? option.name : `${option.name} - ${option.score}???`} */}
              {option.name}
            </option>
          ))}
        </select>
      )
    }

    useEffect(() => {
    }, [cont3Extra]);

    const Extrapoints = [
      { name: "???????????? ??????????????? 1???~2??? ??????", score: 4 },
      { name: "???????????? ??????????????? 6??????~1??? ??????", score: 3 },
      { name: "???????????? ??????????????? 6?????? ??????", score: 2 },
      { name: "??????????????? (???)??????", score: 4 },
      { name: "???????????? ?????????????????????", score: 4 },
      { name: "??????????????? ??? ?????????????????????", score: 4 },
      { name: "?????????(3??? ??????) ???????????? ?????????", score: 4 },
      { name: "?????????(2??? ??????) ???????????? ?????????", score: 2 },
      { name: "???????????????????????? ???7??????1??????1?????? ?????? ???????????? ????????????", score: 4 },
      { name: "?????? 8??? ??????", score: 8 },
      { name: "?????? 7??? ??????", score: 7 },
      { name: "?????? 6??? ??????", score: 6 },
      { name: "?????? 5??? ??????", score: 5 },
      { name: "?????? 4??? ??????", score: 4 },
      { name: "?????? 3??? ??????", score: 3 },
      { name: "?????? 2??? ??????", score: 2 },
      { name: "?????? 1??? ??????", score: 1 },
      { name: "?????? 64?????? ??????", score: 8 },
      { name: "?????? 56~63??????", score: 7 },
      { name: "?????? 48~55??????", score: 6 },
      { name: "?????? 40~47??????", score: 5 },
      { name: "?????? 32~39??????", score: 4 },
      { name: "?????? 24~31??????", score: 3 },
      { name: "?????? 16~23??????", score: 2 },
      { name: "?????? 8~15??????", score: 1 }
      //???????????? ??? ??????
    ]

    Extrapoints.unshift({ name: "???????????? ??????????????????.", scroe: 0 });

    const handelExtrapoint = (e) => {
      if (e.target.value == "???????????? ??????????????????.") {
        return null;
      }

      if (cont3Extra.find(item => item.name == e.target.value) != undefined) {
        alert("?????? ????????? ????????? ?????????.");
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
              {/* {index == 0 ? option.name : `${option.name} - ${option.score}???`} */}
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
              <TableCell sx={table_cell_detail} align='center' rowSpan={2}>??????</TableCell>
              <TableCell sx={table_cell_detail} align='center' colSpan={3}>?????????????????????</TableCell>
              <TableCell sx={table_cell_detail} align='center' colSpan={3}>????????????????????????</TableCell>
              <TableCell sx={table_cell_detail} align='center' colSpan={2}>???????????????</TableCell>
              <TableCell sx={table_cell_detail} align='center' rowSpan={2}>?????????</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={table_cell_detail} align='center'>????????????</TableCell>
              <TableCell sx={table_cell_detail} align='center'>????????????</TableCell>
              <TableCell sx={table_cell_detail} align='center'>?????????</TableCell>
              <TableCell sx={table_cell_detail} align='center'>L6, L5</TableCell>
              <TableCell sx={table_cell_detail} align='center'>L4, L3</TableCell>
              <TableCell sx={table_cell_detail} align='center'>L2</TableCell>
              <TableCell sx={table_cell_detail} align='center'>??????</TableCell>
              <TableCell sx={table_cell_detail} align='center'>?????????</TableCell>
            </TableRow>
            <TableBody>
              <TableRow>
                <TableCell sx={{ height: 30 }} align='center'>??????</TableCell>
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
              <TableCell sx={table_cell_detail} align='center' rowSpan={2}>??????</TableCell>
              <TableCell sx={table_cell_detail} align='center' colSpan={5}>????????????</TableCell>
              <TableCell sx={table_cell_detail} align='center' rowSpan={2}>??????</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={table_cell_detail} align='center'>0???</TableCell>
              <TableCell sx={table_cell_detail} align='center'>1~2???</TableCell>
              <TableCell sx={table_cell_detail} align='center'>3~4???</TableCell>
              <TableCell sx={table_cell_detail} align='center'>5~6???</TableCell>
              <TableCell sx={table_cell_detail} align='center'>7???</TableCell>
            </TableRow>
            <TableBody>
              <TableRow>
                <TableCell sx={{ height: 30 }} align='center'>??????</TableCell>
                <TableCell sx={table_cell_point__detail} align='center'>20</TableCell>
                <TableCell sx={table_cell_point__detail} align='center'>19</TableCell>
                <TableCell sx={table_cell_point__detail} align='center'>18</TableCell>
                <TableCell sx={table_cell_point__detail} align='center'>17</TableCell>
                <TableCell sx={table_cell_point__detail} align='center'>16</TableCell>
                <TableCell sx={table_cell_point__detail} align='center'>?????? 3?????? ????????????</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )
    }

    const Nomalextra = () => {
      return (
        <img src='img/etc/?????????.png' style={{ height: "70vh" }}></img>
      )
    }

    const Nomalinterview = () => {
      return (
        <TableContainer sx={{ width: "100%", height: "100%", backgroundColor: "white", borderRadius: "10px", border: "1px solid gray", boxShadow: "0px 1px 3px gray" }}>
          <Table>
            <TableRow sx={{ height: 80 }}>
              <TableCell sx={table_cell_detail} align='center' rowSpan={2}>????????????</TableCell>
              <TableCell sx={table_cell_detail} align='center' rowSpan={2}>????????????</TableCell>
              <TableCell sx={table_cell_detail} align='center' rowSpan={2}>?????????</TableCell>
              <TableCell sx={table_cell_detail} align='center' rowSpan={2}>?????????/?????????</TableCell>
              <TableCell sx={table_cell_detail} align='center' rowSpan={2}>??????</TableCell>
              <TableCell sx={table_cell_detail} align='center' rowSpan={2}>????????????</TableCell>
              <TableCell sx={table_cell_detail} align='center' rowSpan={2}>???</TableCell>
            </TableRow>
            <TableBody>
              <TableRow>
                <TableCell sx={{ height: 30 }} align='center'>??????</TableCell>
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
              <TableCell sx={table_cell_detail} align='center' rowSpan={2}>??????</TableCell>
              <TableCell sx={table_cell_detail} align='center' colSpan={3}>?????????????????????</TableCell>
              <TableCell sx={table_cell_detail} align='center' colSpan={3}>????????????????????????</TableCell>
              <TableCell sx={table_cell_detail} align='center' colSpan={2}>???????????????</TableCell>
              <TableCell sx={table_cell_detail} align='center' colSpan={2}>???????????????(??????)</TableCell>
              <TableCell sx={table_cell_detail} align='center' rowSpan={2}>?????????</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={table_cell_detail} align='center'>????????????</TableCell>
              <TableCell sx={table_cell_detail} align='center'>????????????</TableCell>
              <TableCell sx={table_cell_detail} align='center'>?????????</TableCell>
              <TableCell sx={table_cell_detail} align='center'>L6, L5</TableCell>
              <TableCell sx={table_cell_detail} align='center'>L4, L3</TableCell>
              <TableCell sx={table_cell_detail} align='center'>L2</TableCell>
              <TableCell sx={table_cell_detail} align='center'>??????</TableCell>
              <TableCell sx={table_cell_detail} align='center'>?????????</TableCell>
              <TableCell sx={table_cell_detail} align='center'>??????/??????</TableCell>
              <TableCell sx={table_cell_detail} align='center'>1?????????</TableCell>
            </TableRow>
            <TableBody>
              <TableRow>
                <TableCell sx={{ height: 30 }} align='center'>??????</TableCell>
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
        <img src='img/etc/????????????.png' style={{ height: "75vh" }}></img>
      )
    }

    const Specialtyattendance = () => {
      return (
        <TableContainer sx={{ width: "100%", height: "100%", backgroundColor: "white", borderRadius: "10px", border: "1px solid gray", boxShadow: "0px 1px 3px gray" }}>
          <Table>
            <TableRow sx={{ height: 80 }}>
              <TableCell sx={table_cell_detail} align='center' rowSpan={2}>??????</TableCell>
              <TableCell sx={table_cell_detail} align='center' colSpan={5}>????????????</TableCell>
              <TableCell sx={table_cell_detail} align='center' rowSpan={2}>??????</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={table_cell_detail} align='center'>0???</TableCell>
              <TableCell sx={table_cell_detail} align='center'>1~2???</TableCell>
              <TableCell sx={table_cell_detail} align='center'>3~4???</TableCell>
              <TableCell sx={table_cell_detail} align='center'>5~6???</TableCell>
              <TableCell sx={table_cell_detail} align='center'>7???</TableCell>
            </TableRow>
            <TableBody>
              <TableRow>
                <TableCell sx={{ height: 30 }} align='center'>??????</TableCell>
                <TableCell sx={table_cell_point__detail} align='center'>10</TableCell>
                <TableCell sx={table_cell_point__detail} align='center'>9</TableCell>
                <TableCell sx={table_cell_point__detail} align='center'>8</TableCell>
                <TableCell sx={table_cell_point__detail} align='center'>7</TableCell>
                <TableCell sx={table_cell_point__detail} align='center'>6</TableCell>
                <TableCell sx={table_cell_point__detail} align='center'>?????? 3?????? ????????????</TableCell>
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
              <TableCell sx={table_cell_detail} align='center' rowSpan={2}>????????????</TableCell>
              <TableCell sx={table_cell_detail} align='center' rowSpan={2}>????????????</TableCell>
              <TableCell sx={table_cell_detail} align='center' rowSpan={2}>?????????</TableCell>
              <TableCell sx={table_cell_detail} align='center' rowSpan={2}>?????????/?????????</TableCell>
              <TableCell sx={table_cell_detail} align='center' rowSpan={2}>??????</TableCell>
              <TableCell sx={table_cell_detail} align='center' rowSpan={2}>????????????</TableCell>
              <TableCell sx={table_cell_detail} align='center' rowSpan={2}>???</TableCell>
            </TableRow>
            <TableBody>
              <TableRow>
                <TableCell sx={{ height: 30 }} align='center'>??????</TableCell>
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
        case "????????????":
          return <NomalCertificate />;

        case "????????????":
          return <Nomalattendance />;
        case "???????????????":
          return <Nomalextra />;
        case "????????????":
          return <Nomalinterview />;
        case "????????????":
          return <SpecialtyCertificate />;
        case "????????????":
          return <SpecialtyMajor />;
        case "????????????":
          return <Specialtyattendance />;
        case "???????????????":
          return <Nomalextra />;
        case "????????????":
          return <Specialtyinterview />;
        default:
          break;
      }
    };

    return (
      <div className="content3-wrap">
        {/* <img src='img/etc/?????????.png' className='pointTable' /> */}
        <div className="table-wrap">
          {cont2SpKind == "??????"? <div className="table">
            <div style={{ fontSize: "16px", fontWeight: 500 }}>
              ???????????????
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
                    ??????
                  </TableCell>
                  <TableCell sx={table_cell} align="center" colSpan={3}>
                    ????????????????
                  </TableCell>
                  <TableCell sx={table_cell} align="center" rowSpan={2}>
                    ?????????????????
                  </TableCell>
                  <TableCell sx={table_cell} align="center" rowSpan={2}>
                    ???
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={table_cell} align="center">
                    ??????????/??????
                  </TableCell>
                  <TableCell sx={table_cell} align="center">
                    ??????????
                  </TableCell>
                  <TableCell sx={table_cell} align="center">
                    ?????????????
                  </TableCell>
                </TableRow>
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ height: 30 }} align="center">
                      ??????
                    </TableCell>
                    <TableCell
                      sx={table_cell_point}
                      align="center"
                      name="????????????"
                      onClick={handleModalOpen}
                    >
                      70
                    </TableCell>
                    <TableCell
                      sx={table_cell_point}
                      align="center"
                      name="????????????"
                      onClick={handleModalOpen}
                    >
                      20
                    </TableCell>
                    <TableCell
                      sx={table_cell_point}
                      align="center"
                      name="???????????????"
                      onClick={handleModalOpen}
                    >
                      15
                    </TableCell>
                    <TableCell
                      sx={table_cell_point}
                      align="center"
                      name="????????????"
                      onClick={handleModalOpen}
                    >
                      110
                    </TableCell>
                    <TableCell
                      sx={{ fontSize: "1em", fontWeight: "700" }}
                      align="center"
                    >
                      215???
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>: <div className="table">
            <div style={{ fontSize: "16px", fontWeight: 500 }}>
              ???????????????
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
                    ??????
                  </TableCell>
                  <TableCell sx={table_cell} align="center" colSpan={4}>
                    ????????????????
                  </TableCell>
                  <TableCell sx={table_cell} align="center" rowSpan={2}>
                    ?????????????????
                  </TableCell>
                  <TableCell sx={table_cell} align="center" rowSpan={2}>
                    ???
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={table_cell} align="center">
                    ??????????/??????
                  </TableCell>
                  <TableCell sx={table_cell} align="center">
                    ??????????
                  </TableCell>
                  <TableCell sx={table_cell} align="center">
                    ??????????
                  </TableCell>
                  <TableCell sx={table_cell} align="center">
                    ?????????????
                  </TableCell>
                </TableRow>
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ height: 30 }} align="center">
                      ??????
                    </TableCell>
                    <TableCell sx={table_cell_point} align="center" name="????????????" onClick={handleModalOpen}>
                      50
                    </TableCell>
                    <TableCell sx={table_cell_point} align="center" name="????????????" onClick={handleModalOpen}>
                      40
                    </TableCell>
                    <TableCell sx={table_cell_point} align="center" name="????????????" onClick={handleModalOpen}>
                      10
                    </TableCell>
                    <TableCell sx={table_cell_point} align="center" name="???????????????" onClick={handleModalOpen}>
                      15
                    </TableCell>
                    <TableCell sx={table_cell_point} align="center" name="????????????" onClick={handleModalOpen}>
                      100
                    </TableCell>
                    <TableCell
                      sx={{ fontSize: "1em", fontWeight: "700" }}
                      align="center"
                    >
                      215???
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
              ????????? ?????? ????????? ????????? ??????
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

            {/* ????????? ?????? ???????????? ????????????? */}
            <div className="total">
              {cont3CertList.length == 0
                ? ""
                : Math.max.apply(
                  Math,
                  cont3CertList.map((value) => {
                    return value.score;
                  })
                )}{" "}
              : ???
            </div>
          </div>
          {cont2SpKind=="??????"?
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
              {cont3Major == null ? "" : cont3Major.score} : ???
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
              ????????? 3?????? ?????? ??????
            </span>
            <Attendance options={AttendanceOptions}></Attendance>
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              {cont3Attendance == null ? "" : cont3Attendance.name}
            </div>

            <div className="total">
              {cont3Attendance == null ? "" : cont3Attendance.score} : ???
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
            {/* score??? ???????????? ???????????? */}
            <div className="total">
              {cont3Extra.length == 0
                ? ""
                : cont3Extra.reduce(
                  (accumulator, current) => accumulator + current.score,
                  0
                )}{" "}
              : ???
            </div>
          </div>
        </div>
      </div>
    );
  }

  useEffect(()=>{
  },[cont4TotalPoint]);

  const Content4 = () => {
    const POINTS1 = "??? ?????? : ?????????(70???) + ??????(15???) + ?????????(15???) ";
    const POINTS2 = "??? ?????? : ?????????(50???) + ??????(40???) + ??????(10???) + ?????????(15???) ";

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
                <div className='table-points'>{cont2SpKind=="??????"?POINTS1:POINTS2}<span>{cont2SpKind=="??????"?" ???(105???)":" ???(115???)"}</span></div>
                <TableContainer sx={{ width: "100%", height: "auto", backgroundColor: "white", borderRadius: "10px", border: "1px solid gray", boxShadow: "0px 1px 3px gray" }}>
                  <Table>
                    <TableRow sx={{ height: 30 }}>
                    <TableCell sx={{backgroundColor:"rgb(240, 240, 240)",borderRight:"1px solid rgba(0,0,0,0.13)"}} align='center' rowSpan={1}></TableCell>
                      <TableCell sx={table_cell_detail} align='center' rowSpan={1}>?????????</TableCell>
                      {cont2SpKind=="??????"?"":<TableCell sx={table_cell_detail} align='center' rowSpan={1}>??????</TableCell>} 
                      <TableCell sx={table_cell_detail} align='center' rowSpan={1}>??????</TableCell>
                      <TableCell sx={table_cell_detail} align='center' rowSpan={1}>?????????</TableCell>
                      <TableCell sx={Object.assign(table_cell_detail, {borderLeft:"1px solid rgba(0,0,0,0.13)"})} align='center' rowSpan={1}>???</TableCell>
                    </TableRow>
                    <TableBody>
                      <TableRow>
                        <TableCell sx={{ width: 180, height: 25, borderRight: "1px solid rgba(0,0,0,0.13)" }} align='center'>?????????</TableCell>
                        <TableCell sx={table_cell_point__detail} colSpan={1} align='center'>{cont3CertList.length == 0
                          ? ""
                          : Math.max.apply(
                            Math,
                            cont3CertList.map((value) => {
                              return value.score;
                            })
                          )}</TableCell>
                        {cont2SpKind=="??????"?"":<TableCell sx={table_cell_point__detail} colSpan={1} align='center'>{cont3Major != null ? cont3Major.score : ""}</TableCell>}
                        <TableCell sx={table_cell_point__detail} colSpan={1} align='center'>{cont3Attendance != null ? cont3Attendance.score : ""}</TableCell>
                        <TableCell sx={table_cell_point__detail} colSpan={1} align='center'> {cont3Extra.length == 0
                          ? "0"
                          : cont3Extra.reduce(
                            (accumulator, current) => accumulator + current.score,
                            0
                          )}</TableCell>
                        <TableCell sx={Object.assign(table_cell_point__detail, { borderLeft: "1px solid rgba(0,0,0,0.13)" })} colSpan={1} align='center'>
                        {cont4TotalPoint} ???
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ width: "auto", height: 25, borderRight:"1px solid rgba(0,0,0,0.13)"}} align='center'>2022??? ??????</TableCell>
                        <TableCell sx={table_cell_point__total} colSpan={cont2SpKind=="??????"?4:5} align='center'>{cont2SpKind=="??????"?"76???":"70???"}</TableCell>
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
      <button className={slideindex === 1 ? "btnblock" : "btnpre"} onClick={handelpre}>??????</button>
      <button className={(slideindex === 1 || slideindex === 4) ? "btnblock" : "btnnext"} onClick={handelnext}>??????</button>
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
              {cont2item.length==0?"":cont2SpKind + " ?????? : "}
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
              {cont2item.length == 0 ? "" : " ???(???) ?????????????????????."}
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