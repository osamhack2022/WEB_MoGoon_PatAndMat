import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Checkbox, Modal } from '@mui/material';

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
                    <h3>{props.title}</h3>
                    <ul>
                        <li>
                            국가기술자격증
                            <div className='en-info-edit-list-container'>
                                <div className='en-info-edit-list-item'>
                                    기사 이상
                                </div>
                                <div className='en-info-edit-list-item'>
                                    산업기사
                                </div>
                                <div className='en-info-edit-list-item'>
                                    기능사
                                </div>
                            </div>
                        </li>
                        <li>
                            민간 자격증
                            <div className='en-info-edit-list-container'>
                                <div className='en-info-edit-list-item'>
                                    공인
                                </div>
                                <div className='en-info-edit-list-item'>
                                    비공인
                                </div>
                            </div>
                        </li>
                        <li>
                            일학습병행자격증
                            <div className='en-info-edit-list-container'>
                                <div className='en-info-edit-list-item'>
                                    L6 / L5
                                </div>
                                <div className='en-info-edit-list-item'>
                                    L4 / L3
                                </div>
                                <div className='en-info-edit-list-item'>
                                    L2
                                </div>
                            </div>
                        </li>
                        <li>
                            운전면허증
                            <div className='en-info-edit-list-container'>
                                <div className='en-info-edit-list-item'>
                                    대형 / 특수
                                </div>
                                <div className='en-info-edit-list-item'>
                                    1종 보통
                                </div>
                                <div className='en-info-edit-list-item'>
                                    2종 보통 (수동)
                                </div>
                            </div>
                        </li>
                    </ul>
                    <checkbox className='en-info-edit-button-section'>
                        <button className='button' id='cancel-button' onClick={handleModal}>취소</button>
                        <button className='button' id='save-button'>저장</button>    
                    </checkbox>
                </div>
            </Modal>
        </div>
    );
};

export default React.memo(MyEnInfoItem);