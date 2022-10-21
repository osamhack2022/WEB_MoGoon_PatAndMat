import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Modal } from '@mui/material';

// css
import "../../css/MyPage/Common.css";
import "../../css/MyPage/MyEnInfoItem.css";
import "../../css/MyPage/MyEnInfoEdit.css";

const MyEnInfoItem = (props) => {

    const [open, setOpen] = useState(false);

    const handleModal = (e) => {
        setOpen(!open);
    };

    return (
        <div>
            <div className='en-info-container shadow-box'>
                <div className='en-info-header'>
                    <h4>{props.title}</h4>
                    <div className='en-info-edit' onClick={handleModal}>수정</div>
                </div>
                <div className='en-info-content'>
                    computer-engineering
                </div>
            </div>
            <Modal
                open={open}
                onClose={handleModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className='shadow-box en-info-edit-container'>
                    <h4>{props.title}</h4>
                    <button className='button' id='cancel-button' onClick={handleModal}>취소</button>
                    <button className='button' id='save-button'>저장</button>
                    
                </div>
            </Modal>
        </div>
    );
};

export default React.memo(MyEnInfoItem);