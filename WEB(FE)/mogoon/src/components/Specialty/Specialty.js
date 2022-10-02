// import React, { useState } from 'react';
import React, { useEffect, useState } from "react";
import SpecialtyItem from "./SpecialtyItem";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import axios from 'axios';

const Specialty = (props) => {
    let dataList = [
        {
            "class" : "일반",
            "desc" : "장갑차를 조종 할 수 있습니다",
            "imageSrc" : "",
            "kind" : "",
            "like" : 0,
            "military_kind" : ["육군"],
            "speciality_code" : {"marin" : "","army":"","airforce" : "","navy":""},
            "speciality_name" : "장갑차조종",
            "tags" : ["교대근무","휴가많음","실내근무"]
        },
        {
            "class" : "일반",
            "desc" : "",
            "imageSrc" : "",
            "kind" : "",
            "like" : 0,
            "military_kind" : ["육군"],
            "speciality_code" : {"marin" : "","army":"","airforce" : "","navy":""},
            "speciality_name" : "155mm자주포병",
            "tags" : ["교대근무","휴가많음","실내근무"]
        },
        {
            "class" : "전문특기",
            "desc" : "",
            "imageSrc" : "",
            "kind" : "",
            "like" : 0,
            "military_kind" : ["육군"],
            "speciality_code" : {"marin" : "","army":"","airforce" : "","navy":""},
            "speciality_name" : "의장병",
            "tags" : ["교대근무","휴가많음","실내근무"]
        },
        {
            "class" : "일반",
            "desc" : "",
            "imageSrc" : "",
            "kind" : "",
            "like" : 0,
            "military_kind" : ["해군"],
            "speciality_code" : {"marin" : "","army":"","airforce" : "","navy":""},
            "speciality_name" : "조타",
            "tags" : ["교대근무","휴가많음","실내근무"]
        },
        {
            "class" : "일반",
            "desc" : "",
            "imageSrc" : "",
            "kind" : "",
            "like" : 0,
            "military_kind" : ["해군"],
            "speciality_code" : {"marin" : "","army":"","airforce" : "","navy":""},
            "speciality_name" : "병기",
            "tags" : ["교대근무","휴가많음","실내근무"]
        },
        {
            "class" : "특기",
            "desc" : "전산, 컴퓨터와 관련된 임무를 할 수 있습니다",
            "imageSrc" : "",
            "kind" : "",
            "like" : 0,
            "military_kind" : ["해군"],
            "speciality_code" : {"marin" : "","army":"","airforce" : "","navy":""},
            "speciality_name" : "전산",
            "tags" : ["교대근무","휴가많음","실내근무"]
        },
        {
            "class" : "전문특기",
            "desc" : "프로그램 개발을 할 수 있습니다",
            "imageSrc" : "",
            "kind" : "",
            "like" : 0,
            "military_kind" : ["해군"],
            "speciality_code" : {"marin" : "","army":"","airforce" : "","navy":""},
            "speciality_name" : "S/W개발병",
            "tags" : ["교대근무","휴가많음","실내근무"]
        },
        {
            "class" : "일반",
            "desc" : "",
            "imageSrc" : "",
            "kind" : "",
            "like" : 0,
            "military_kind" : ["해병대"],
            "speciality_code" : {"marin" : "","army":"","airforce" : "","navy":""},
            "speciality_name" : "대전차화기",
            "tags" : ["교대근무","휴가많음","실내근무"]
        },
        {
            "class" : "특기",
            "desc" : "",
            "imageSrc" : "",
            "kind" : "",
            "like" : 0,
            "military_kind" : ["해병대"],
            "speciality_code" : {"marin" : "","army":"","airforce" : "","navy":""},
            "speciality_name" : "통기",
            "tags" : ["교대근무","휴가많음","실내근무"]
        },
        {
            "class" : "일반",
            "desc" : "",
            "imageSrc" : "",
            "kind" : "",
            "like" : 0,
            "military_kind" : ["공군"],
            "speciality_code" : {"marin" : "","army":"","airforce" : "","navy":""},
            "speciality_name" : "장비물자보급",
            "tags" : ["교대근무","휴가많음","실내근무"]
        },
        {
            "class" : "전문특기",
            "desc" : "",
            "imageSrc" : "",
            "kind" : "",
            "like" : 0,
            "military_kind" : ["공군"],
            "speciality_code" : {"marin" : "","army":"","airforce" : "","navy":""},
            "speciality_name" : "우주기상분석병",
            "tags" : ["교대근무","휴가많음","실내근무"]
        },
    ]
    const [MASTER_DATA, setMASTER_DATA] = useState(dataList);
    const [SpData, setSpData] = useState(dataList);



    // useEffect(() => {
    //     setMASTER_DATA(dataList);
    //     setSpData(dataList);
    // }, []);

    console.log(SpData);

    let searchWord = null;
    let searchData = null;

    // async function getData() {
    //     await axios.get("http://localhost:5000/api/speciality/list")
    //         .then((response) => {
    //             setSpData(response.data);
    //             setMASTER_DATA(response.data);
    //         });
    // }

    // useEffect(() => {
    //     getData();
    // }, []);

    // if (!SpData) {
    //     return null;
    // }

    console.log(SpData);

    const handelSearchChange = (e) => {
        searchWord = e.target.value;
    };

    const handelSearch = (e) => {
        searchFunction(searchWord);
    }

    const handelSearchEnter = (e) => {
        if (e.key === 'Enter') {
            searchFunction(searchWord);
        }
    };

    const searchFunction = (word) => {
        searchData = MASTER_DATA.filter(data => {
            if (data.speciality_name.indexOf(word) !== -1) {
                return data;
            }
        });
        setSpData(searchData);
    };

    const SpRender = () => {
        return (
            SpData.map(data => (
                <SpecialtyItem key={data.speciality_name} code={data.speciality_code} name={data.speciality_name} class={data.class}
                    desc={data.desc} military_kind={data.military_kind} tags={data.tags}
                    imageSrc={data.imageSrc} kind={data.kind} like={data.like}
                />
            ))
        );
    }

    return (
        <>
            <div className='spsearch'>
                <input type={'text'} placeholder="특기를 입력해주세요." onKeyPress={handelSearchEnter} onChange={handelSearchChange}></input>
                <div className='srarchIcon' onClick={handelSearch}></div>
            </div>
            <SpFilter>

            </SpFilter>
            <div className='specialty'>
                <SpRender/>

                {/* <SpecialtyItem name="화생방병" class="특기" desc="화생방병 특기 입니다" military_kind={["해군","육군","공군","해병대"]} tags={["휴가많음", "아닌가?", "몰라용"]} />
                <SpecialtyItem name="화생방병" class="전문" desc="이것은 소개입니다 이것은 소개입니다 이것은 소개입니다" military_kind={["해군","육군","공군","해병대"]} tags={["휴가많음", "아닌가?", "몰라용"]} />
                <SpecialtyItem name="화생방병" class="전문" desc="이것은 소개입니다 이것은 소개입니다 이것은 소개입니다" military_kind={["해군","육군","공군","해병대"]} tags={["휴가많음", "아닌가?", "몰라용"]} />
                <SpecialtyItem name="화생방병" class="전문" desc="이것은 소개입니다 이것은 소개입니다 이것은 소개입니다" military_kind={["해군","육군","공군","해병대"]} tags={["휴가많음", "아닌가?", "몰라용"]} />
                <SpecialtyItem name="화생방병" class="전문" desc="이것은 소개입니다 이것은 소개입니다 이것은 소개입니다" military_kind={["해군","육군","공군","해병대"]} tags={["휴가많음", "아닌가?", "몰라용"]} />
                <SpecialtyItem name="화생방병" class="전문" desc="이것은 소개입니다 이것은 소개입니다 이것은 소개입니다" military_kind={["해군","육군","공군","해병대"]} tags={["휴가많음", "아닌가?", "몰라용"]} />
                <SpecialtyItem name="화생방병" class="전문" desc="이것은 소개입니다 이것은 소개입니다 이것은 소개입니다" military_kind={["해군","육군","공군","해병대"]} tags={["휴가많음", "아닌가?", "몰라용"]} />
                <SpecialtyItem name="화생방병" class="전문" desc="이것은 소개입니다 이것은 소개입니다 이것은 소개입니다" military_kind={["해군","육군","공군","해병대"]} tags={["휴가많음", "아닌가?", "몰라용"]} />
                <SpecialtyItem name="화생방병" class="전문" desc="이것은 소개입니다 이것은 소개입니다 이것은 소개입니다" military_kind={["해군","육군","공군","해병대"]} tags={["휴가많음", "아닌가?", "몰라용"]} />
                <SpecialtyItem name="화생방병" class="전문" desc="이것은 소개입니다 이것은 소개입니다 이것은 소개입니다" military_kind={["해군","육군","공군","해병대"]} tags={["휴가많음", "아닌가?", "몰라용"]} />
                <SpecialtyItem name="화생방병" class="전문" desc="이것은 소개입니다 이것은 소개입니다 이것은 소개입니다" military_kind={["해군","육군","공군","해병대"]} tags={["휴가많음", "아닌가?", "몰라용"]} />
                <SpecialtyItem name="화생방병" class="전문" desc="이것은 소개입니다 이것은 소개입니다 이것은 소개입니다" military_kind={["해군","육군","공군","해병대"]} tags={["휴가많음", "아닌가?", "몰라용"]} /> */}
            </div>
        </>
    );
};


const SpFilter = (props) => {
    let chkGroup = ["육군","해군","공군","해병대"];

    return (
        <fieldset className="SpFilter">
            <legend style={{ fontSize: "1em", fontWeight: 600 }}>Filter</legend>
            <FormGroup onChange={(e)=>{console.log(e)}} row={true}>
                <FormControlLabel control={<Checkbox defaultChecked size="small" color="success" />} label={<span style={{ fontSize: '16px' }}>육군</span>} sx={{ width: "auto", display: "flex" }} />
                <FormControlLabel control={<Checkbox defaultChecked size="small" />} label={<span style={{ fontSize: '16px' }}>해군</span>} sx={{ width: "auto", display: "flex" }} />
                <FormControlLabel control={<Checkbox defaultChecked size="small" color="default" />} label={<span style={{ fontSize: '16px' }}>공군</span>} sx={{ width: "auto", display: "flex" }} />
                <FormControlLabel control={<Checkbox defaultChecked size="small" sx={{
                    color: "red",
                    '&.Mui-checked': {
                        color: "red",
                    },
                }} />} label={<span style={{ fontSize: '16px' }}>해병대</span>} sx={{ width: "auto", display: "flex" }} />

            </FormGroup>
        </fieldset>
    );
};

export default React.memo(Specialty);