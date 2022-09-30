import React, { useState } from 'react';
import { useParams } from "react-router-dom";

import '../../css/SpDetail.css';

let SpDetail = () => {
    const name = useParams().SpName; 

    return (
        <div className='SpDetail-content'>
            <div className='section-header'>
                <div className='header-img'/>
                <div className='header-content'>
                    <div className='header-content-name'>정보체계관리</div>
                    <div className='header-content-miltray_kind' style={{borderRight:"1px solid gray"}}>대한민국 육군/해군/공군</div>
                    <div className='header-content-kind'>전자계산</div>
                    
                </div>
            </div>
        </div>    
    );
};

export default React.memo(SpDetail);