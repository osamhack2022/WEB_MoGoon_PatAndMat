import React, { useEffect, useState,useRef } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

import '../../css/SpDetail.css';
import '../../css/SpDetailTap.css';

let SpDetail = (EnlistSpName) => {
    //name을 기준으로 DB에서 값 가져오기
    let name = useParams().SpName;
    let type = useParams().Spkind;
    let ref = useRef();

    //Enlist Test
    if(name==undefined || type==undefined){
        name="정보체계관리";
        type="공군";

        console.log(name);
        console.log(type);
    }

    const [SpDetailData, setSpDetailData] = useState();

    const [loading,setLoading] = useState("로딩중..");

    const [title, SetTitle] = useState([]);

    const [activeIndex, setActiveIndex] = useState(0);
    const tabClickHandler = (index) => {
        setActiveIndex(index)
    }

    async function getData() {

        await axios.get(`http://localhost:5000/api/speciality/list/${name}/${type}`)
            .then((response) => {
                console.log();
                setSpDetailData(response.data.data);
                console.log(response.data.data.contents);
                let titles = [...response.data.data.contents];
                SetTitle(titles);

                setLoading("완료");
            })
            .catch((error)=>{
                setLoading("오류");
            })

    }

    useEffect(() => {
        getData();
    }, []);

    if (loading == "로딩중..") {
        return (
            <>
                <div className="state">Loading..</div>
                <div class="loader"></div>
            </>
        );
    }

    if(loading=="오류"){
        return(
            <div className="pagestate">데이터를 가져오는 도중 오류가 발생하였습니다.</div>
        );
    }

    if (!SpDetailData) {
        return null;
    }

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

        console.log(rows);

        console.log(props.table);
        console.log(col);
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
                        title.map(data => {
                            return (
                                <BodyTitle title={data.title}>
                                    <div>
                                        <p>
                                            {
                                                data.content.map(cont => {
                                                    if (cont instanceof Object) {
                                                        return (
                                                            handelGrid(cont)
                                                        )
                                                    } else {
                                                        return (
                                                            <span style={{ display: "block" }}>{cont}</span>
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
        <div className='SpDetail-content' ref={ref}>
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
                            SpDetailData.speciality_summary.map(data => {
                                return (
                                    <span style={{ display: "block" }}>{data}</span>
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
        <article className='body-artical' style={{ marginBottom: "30px" }}>
            <span className='body-title'>{props.title}</span>
            {props.children}
            {/* <hr/> */}
        </article>
    );
};

export default React.memo(SpDetail);