// import React, { useState } from 'react';
import React, { useEffect, useState, useCallback } from "react";
import SpecialtyItem from "./SpecialtyItem";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import axios from 'axios';

//임시 필터 체크박스 데이터
let chkGroup = ["육군", "해군", "공군", "해병대"];

const Specialty = (props) => {    
    const [MASTER_DATA, setMASTER_DATA] = useState();
    const [SpData, setSpData] = useState();
    const [search, setSearch] = useState("");

    let searchData = null;

    axios.defaults.withCredentials = true;
    async function getData() {
        await axios.get("http://localhost:5000/api/speciality/list")
            .then((response) => {
                setSpData(response.data.data);
                setMASTER_DATA(response.data.data);
            });
    }

    useEffect(() => {
        getData();
    }, []);

    if (!SpData) {
        return null;
    }

    console.log(SpData);

    const handelSearch = (e) => {
        searchFunction(search);
    }

    const handelSearchChange = (e) => {
        setSearch(e.target.value)
    };

    const handelSearchEnter = (e) => {
        if (e.key === 'Enter') {
            searchFunction(e.target.value);
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
                    imageSrc={data.imageSrc} kind={data.kind} like={data.like}/>
            ))
        );
    }
    
    const chkFunction = (value) => {
        //군종이 여러개일 경우

        if(chkGroup.includes(value)){
            chkGroup = chkGroup.filter(data=>data!=value);
        }else{
            chkGroup.push(value);
        }
        
        searchData = MASTER_DATA.filter((data)=>{
            for (let i = 0; i < chkGroup.length; i++) {
                if(data.military_kind.includes(chkGroup[i])){
                    return data;
                }
            }
        });
        
        setSearch("");
        setSpData(searchData);
    }

    return (
        <>
            <div className='spsearch'>
                <input type={'text'} placeholder="특기를 입력해주세요." onKeyPress={handelSearchEnter} onChange={handelSearchChange} value={search}></input>
                <div className='srarchIcon' onClick={handelSearch}></div>
            </div>

            <fieldset className="SpFilter">
                <legend style={{ fontSize: "1em", fontWeight: 600 }}>Filter</legend>
                <FormGroup onChange={(e) => { chkFunction(e.target.defaultValue) }} row={true}>
                    <FormControlLabel value="육군" control={<Checkbox defaultChecked size="small" sx={{
                        color: "#2e7d32",
                        '&.Mui-checked': {
                            color: "#2e7d32",
                        },
                    }} />} label={<span>육군</span>}  className="chklabel"/>
                    <FormControlLabel value="해군" control={<Checkbox defaultChecked size="small" sx={{
                        color: "#1976d2",
                        '&.Mui-checked': {
                            color: "#1976d2",
                        },
                    }}/>} label={<span>해군</span>} className="chklabel"/>
                    <FormControlLabel value="공군" control={<Checkbox defaultChecked size="small" color="default" />} label={<span>공군</span>} className="chklabel"/>
                    <FormControlLabel value="해병대" control={<Checkbox defaultChecked size="small" sx={{
                        color: "red",
                        '&.Mui-checked': {
                            color: "red",
                        },
                    }} />} label={<span>해병대</span>} className="chklabel"/>

                </FormGroup>
            </fieldset>
            <div className='specialty'>
                <SpRender />
            </div>
        </>
    );
};

export default React.memo(Specialty);