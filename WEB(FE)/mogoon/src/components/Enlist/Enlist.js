import { margin } from '@mui/system';
import React, { useState } from 'react';

import "../../css/Enlist.css"



let Enlist = (props) => {

    return (
        <div className='Enlist-wrap'>
            <div className='stepper-wrap'>
                <StepItem>{stSteps}</StepItem>
            </div>
        </div>
    );
};

let stSteps = ["군종을 선택해주세요.", "특기를 선택해주세요.", "개인정보를 입력해주세요.", "서류 점수 확인"];

let StepItem = () => {

    return (
        stSteps.map((item,index) => (
            <div>
                <div style={{display:"inline-flex",justifyContent:"center",alignItems:"center",textAlign:"center",borderRadius:"15px",
                    marginRight:"10px",backgroundColor:"gray",color:"white",width:"30px",height:"30px",
                    fontWeight:500
                    }}>{index+1}</div>
                <span style={{verticalAlign:"middle"}}>{item}</span>
            </div> 
        ))
    );
}


export default Enlist;