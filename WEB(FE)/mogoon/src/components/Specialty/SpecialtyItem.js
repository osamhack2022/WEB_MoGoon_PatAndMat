import React, { useState,useEffect } from 'react';
import axios from 'axios';
import Checkbox from '@mui/material/Checkbox';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import Badge from '@mui/material/Badge';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

let SpecialtyItem = (props) => {
    let user = localStorage.getItem("IdToken");
    let [chkBool, setChkBool] = useState(false);

    useEffect(()=>{
        console.log(props.LikeLists);
        if(props.LikeLists!=undefined){
            if(props.LikeLists.indexOf(`${props.name}${props.military_kind}`)!=-1){
                setChkBool(true);
            }
        }
    },[])

    // const Dibs = () =>{
    //     let dibsList = localStorage.getItem("dibsList");

    //     if(dibsList==undefined){
    //         localStorage.setItem("dibsList",[]);
    //     }
    // }
    
    useEffect(()=>{

    },[chkBool]);

    async function chkClick(e){
        e.preventDefault();
        if(user==undefined){
            alert("찜 기능은 로그인 후 이용가능합니다.");
            return;
        }
        // console.log(e.target.attributes.name.value);
        if (chkBool == false) {
            setChkBool(true);
            if(user==undefined){

                Dibs();
            }else{
                await axios.post(`http://localhost:5000/api/speciality/${props.name}/${props.military_kind}/like/increase`,{}, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("IdToken")}`,
                    },
                })
                    .then((response) => {
                        console.log(response);
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            }
        } else {
            setChkBool(false);
            if(user==undefined){
                
                Dibs();
            }else{
                await axios.post(`http://localhost:5000/api/speciality/${props.name}/${props.military_kind}/like/decrease`,{}, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("IdToken")}`,
                    },
                })
                    .then((response) => {
                        console.log(response);
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            }
        }

    }

    return (
        <div className='specialtyitem'>
            <Link to={`/Specialty/list/${props.name}/${props.military_kind}`}>
                <div className='spimg' style={{ content: `URL(${props.imageSrc})` }} />
                <div className='spcontent'>
                    <div className='sptype'>
                        <SpTypeItem type={props.military_kind} />
                        <div>{props.class}</div>
                    </div>
                    <div className='spname'>{props.name}</div>
                    <p className='spexplan'>{props.desc == "" ? "" : `"${props.desc}"`}</p>
                    <div className='sptag'>
                        {
                            props.tags.map(tag => (
                                <SpTagItem tag={tag} />
                            ))
                        }
                        <Badge color="success" badgeContent={props.like} sx={{
                            marginRight: "0", marginLeft: "auto", padding: "0", "& .MuiBadge-badge": {
                                color: "white",
                                backgroundColor: "#1976d2",
                                fontSize: "10px"
                            }
                        }}>
                            <Checkbox name={`${props.military_kind}${props.name}`} sx={{ marginRight: "0", marginLeft: "auto", padding: "0" }} checked={chkBool} onClick={chkClick} icon={<BookmarkBorderIcon />} checkedIcon={<BookmarkIcon sx={{ color: "#ffd731" }} />} />
                        </Badge>
                    </div>
                </div>
            </Link>
        </div>
    );
};

let SpTypeItem = (props) => {
    const type = props.type;

    let typeColor = "";
    if (type == "육군") {
        typeColor = "green";
    } else if (type == "해군") {
        typeColor = "#000080";
    } else if (type == "공군") {
        typeColor = "#5d5d5d";
    } else {
        typeColor = "red";
    }

    return (
        <div style={{ color: typeColor }}>{type}</div>
    );
};

let SpTagItem = (props) => {
    return (
        //type 기본값을 이용해서 tag별로 css 적용
        <div>#{props.tag}</div>
    );
};

const onSearchChange = (e) => {
    console.log(e);
};

export default React.memo(SpecialtyItem);