import React, { useEffect, useState, useRef } from 'react';
import { Await, json, useParams } from "react-router-dom";
import axios from 'axios';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import Badge from '@mui/material/Badge';

import '../../css/SpDetail.css';
import '../../css/SpDetailTap.css';
import { display } from '@mui/system';

let SpDetail = (props) => {
    //name을 기준으로 DB에서 값 가져오기
    let name = useParams().SpName;
    let type = useParams().Spkind;
    let ref = useRef();

    //Enlist Test
    if (name == undefined || type == undefined) {
        name = "정보체계관리";
        type = "공군";
    }

    //특기소개
    const [SpDetailData, setSpDetailData] = useState();
    const [loading, setLoading] = useState("로딩중..");
    const [title, SetTitle] = useState([]);

    //의견 및 기타
    const [Spopinions, setSpopinions] = useState();
    const user = JSON.parse(localStorage.getItem('userInfo'));
    const token = localStorage.getItem('IdToken');
    const [userOpinput, setuserOpinput] = useState();
    const [onView,setonView] = useState(false);

    const [activeIndex, setActiveIndex] = useState(0);
    const tabClickHandler = (index) => {
        setActiveIndex(index)
    }

    async function getData() {
        await axios.get(`http://localhost:5000/api/speciality/${name}/${type}`)
            .then((response) => {
                setSpDetailData(response.data.data);
                let titles = [...response.data.data.contents];
                SetTitle(titles);

                setLoading("완료");
            })
            .catch((error) => {
                console.log(error)
                setLoading("오류");
            })
    }

    async function getDataopinions() {
        await axios.get(`http://localhost:5000/api/speciality/${name}/${type}/opinions`)
            .then((response) => {
                // console.log(response);
                let opData = [...response.data.data];
                opData = opData.sort((a, b) => a.created_time.seconds - b.created_time.seconds);
                console.log(opData);
                setSpopinions(opData);
            })
            .catch((error) => {
                setLoading("오류");
            })
    }

    const handelLike = (e) => {
        let chkLike = e;
        console.log(chkLike);

        // //아직 없음
        // if(chkLike=="like"){

        // }else{

        // }

        // getDataopinions();
    }

    const handelViewAll = () => {
        if(onView){
            setonView(false);
        }else{
            setonView(true);
        }
    }

    useEffect(() => {
        if (Spopinions != undefined) {
            if (Spopinions.findIndex(data => data.editor_email == user.email) != -1) {
                // console.log(Spopinions.find(data=>data.editor_email==user.email).opinion);
                let myOpinion = Spopinions.find(data => data.editor_email == user.email).opinion;
                setuserOpinput(myOpinion);
            }
        }
    }, [Spopinions]);

    const HandelOpinionAdd = () => {
        let opInputValue = "";

        async function postDataopinions() {
            await axios.get('http://localhost:5000/api/user/info', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("IdToken")}`,
                },
            })
                .then((response) => {
                    // console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                })

            await axios.post(`http://localhost:5000/api/speciality/${name}/${type}/opinion`,
                {
                    editor_nickname: user.email,
                    editor_email: user.email,
                    opinion: opInputValue
                }
            ).then((response) => {
                getDataopinions();
            })
        }

        useEffect(() => {
            opInputValue = userOpinput;
        }, [userOpinput]);

        const handelopinionAdd_button = () => {
            if (!opInputValue == "") {
                postDataopinions();
            } else {
                alert("의견을 입력해주세요.");
                return;
            }
        }

        if (!token) {
            return (
                <div>앗, 여긴 로그인이 필요해요!</div>
            )
        } else {
            return (
                <>
                    <TextField
                        id="standard-multiline-static"
                        label=""
                        multiline
                        multiline
                        fullWidth
                        rows={3}
                        sx={{ backgroundColor: "white", borderRadius: "5px", padding: "10px", boxSizing: "border-box", paddingBottom: "1px" }}
                        placeholder={userOpinput == "undefined" ? "내 의견이 아직 없습니다 내 의견을 작성해주세요." : ""}
                        variant="standard"
                        onChange={(e) => { opInputValue = e.target.value }}
                        defaultValue={userOpinput}
                    />
                    <div className='opinionAdd'>
                        <button className='opinionAdd_button' onClick={handelopinionAdd_button}>작성</button>
                    </div>
                </>
            )
        }
    }

    useEffect(() => {
        getData();
        getDataopinions();
    }, []);

    if (loading == "로딩중..") {
        return (
            <>
                <div className="state">Loading..</div>
                <div class="loader"></div>
            </>
        );
    }

    if (loading == "오류") {
        return (
            <div className="pagestate">데이터를 가져오는 도중 오류가 발생하였습니다.</div>
        );
    }

    if (!SpDetailData) {
        return null;
    }

    // if(!Spopinions){
    //     setSpopinions(null);
    //     return;
    // }

    const handelGrid = (props) => {
        let col = [];
        let rows = [];

        col.push({ field: "id", headerName: "ID", hide: "true" });
        for (let i = 0; i < props.table_header.length; i++) {
            col.push(
                {
                    field: props.table_header[i],
                    headerName: props.table_header[i],
                    type: "number",
                    sortable: false
                }
            );
        }

        for (let i = 0; i < props.table[props.table_header[0]].length; i++) {
            let row = new Object();

            for (let j = 0; j < props.table_header.length; j++) {
                row["id"] = i;
                row[props.table_header[j]] = props.table[props.table_header[j]][i];
            }

            rows.push(row);
        }

        // console.log(rows);

        // console.log(props.table);
        // console.log(col);
        return (
            <Box sx={{ height: 300, width: '100%', backgroundColor: "white", marginTop: "15px" }}>
                <DataGrid
                    rows={rows}
                    columns={col}
                    experimentalFeatures={{ newEditingApi: true }}
                    rowsPerPageOptions="false"
                />
            </Box>
        );
    }

    //특기 탭
    const tabContArr = [
        {
            tabTitle: (
                <div className={activeIndex === 0 ? "is-active" : ""} onClick={() => { tabClickHandler(0) }}>특기 소개</div>
            ),
            tabCont: (
                <>
                    {
                        title.map((data, index) => {
                            return (
                                <BodyTitle key={index} title={data.title}>
                                    <div>
                                        <p>
                                            {
                                                data.content.map((cont, index) => {
                                                    if (cont instanceof Object) {
                                                        return (
                                                            handelGrid(cont)
                                                        )
                                                    } else {
                                                        return (
                                                            <span key={index} style={{ display: "block" }}>{cont}</span>
                                                        )
                                                    }
                                                })
                                            }
                                        </p>
                                    </div>
                                </BodyTitle>
                            );
                        })
                    }
                </>
            )
        },
        {
            tabTitle: (
                <div className={activeIndex === 1 ? "is-active" : ""} onClick={() => { tabClickHandler(1) }}>의견 및 기타</div>
            ),
            tabCont: (
                <>
                    <BodyTitle title="내 의견">
                        <div>
                            <p style={{ whiteSpace: "pre-wrap", height: "auto" }}>
                                <HandelOpinionAdd />
                            </p>
                        </div>
                    </BodyTitle>

                    <BodyTitle title="의견">
                        <section className='view-all'>
                            {Spopinions == undefined ? "" : Spopinions.length <= 3 ? "" : <span onClick={handelViewAll}>{onView?"간략히":"전체보기"}</span>}
                        </section>
                        {Spopinions == undefined ? <div><p>아직 작성된 의견이 없습니다.</p></div> : Spopinions.map((data, index) => {
                            return (
                                <div key={index} style={index<=2?{display:"blcok"}:onView?{display:"block"}:{display:"none"}}>
                                    <span style={{ fontWeight: 500, fontSize: "1.2em", marginBottom: "10px" }}>
                                        {data.editor_nickname}
                                    </span>
                                    <p>
                                        {data.opinion}
                                        <div style={{ marginTop: "20px" }}>
                                            <div style={{ display: "inline-block", marginRight: "10px" }}>
                                                <span className='like' name="like" style={{ cursor: "pointer" }} onClick={handelLike}>
                                                    {/* <img style={{height:"20px"}} src='/img/etc/up_before.svg'/> */}
                                                    <img style={{ height: "20px" }} src='/img/etc/up_after.svg' />
                                                </span>
                                                {data.like}
                                            </div>
                                            <div style={{ display: "inline-block" }}>
                                                <span className='dislike' name="dislike" style={{ cursor: "pointer" }} onClick={handelLike}>
                                                    {/* <img style={{height:"20px"}} src='/img/etc/down_after.svg'/> */}
                                                    <img style={{ height: "20px" }} src='/img/etc/down_before.svg' />
                                                </span>
                                                {data.dislike}
                                            </div>
                                        </div>
                                    </p>
                                </div>
                            )
                        })}
                    </BodyTitle>
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
        <div className='SpDetail-content' style={props.name == "군지원" ? { width: "100%", marginTop: "60px" } : { width: "60%" }}>
            <div className='section-header'>
                <div className='header-img' />
                <div className='header-content'>
                    <div className='header-content-name' style={{ display: "inline-block" }}>{name}</div>
                    <span className='header-content-miltray_kind' style={{ color: "gray" }}>
                        ({SpDetailData.speciality_code})
                    </span>
                    <div className='header-content-kind'>
                        {SpDetailData.military_kind} > {SpDetailData.class} > {SpDetailData.kind} > {SpDetailData.speciality_name}
                    </div>
                    <div className='desc'>
                        {
                            SpDetailData.speciality_summary.map((data, index) => {
                                return (
                                    <span key={index} style={{ display: "block" }}>{data}</span>
                                );
                            })
                        }
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

            </div>
        </div>
    );
};

let BodyTitle = (props) => {
    return (
        <article className='body-artical'>
            <span className='body-title'>{props.title}</span>
            {props.children}
            {/* <hr/> */}
        </article>
    );
};

export default React.memo(SpDetail);