import React, { useEffect, useState } from 'react';
import { Checkbox, Modal, RadioGroup, Radio } from '@mui/material';

// css
import "../../css/MyPage/Common.css";
import "../../css/MyPage/MyEnInfoItem.css";
import "../../css/MyPage/MyEnInfoEdit.css";

const MyEnInfoItem = (props) => {

    const [open, setOpen] = useState(false);

    const handleModal = (e) => {
        setOpen(!open);
    };

    const saveEditModal = (e) => {
        // 선택한 정보를 디비에 저장하고 컴포넌트 다시 그리기
        setOpen(!open);
    }

    const MyEnInfoSelectionGroup = (props) => {
        const [selection, setSelection] = useState(null);
        const [children, setChildren] = useState(props.children);

        useEffect(() => {
            const new_children = React.Children.map(props.children, (child) => {
                if (React.isValidElement(child)) {
                    console.log(child.props.children === selection);
                    return React.cloneElement(child, {
                        selectionHandler,
                        clicked: child.props.children === selection
                    });
                }
                return child;
            });
            setChildren(new_children);
            console.log(selection);
        }, [selection]);

        const selectionHandler = (value) => {
            setSelection(value);
        };

        return (
            <li>
                {props.name}
                <div className='en-info-edit-list-container'>
                    {children}
                </div>
            </li>
        )
    };

    const MyEnInfoSelectionItem = (props) => {        
        const handleClick = (e) => {
            if (props.clicked) {
                props.selectionHandler(null);
            }
            else {
                props.selectionHandler(props.children);
            }
            //setClick(!click);
        };

        return (
            <div className={'en-info-edit-list-item' + (props.clicked ? ' clicked' : '')} onClick={handleClick}>
                {props.children}
            </div>
        );
    };

    const MyEnInfoSelectionCentent = (props) => {
        if (props.kind === '자격/면허')
            return (
                <ul>
                    <MyEnInfoSelectionGroup name='국가기술자격증'>
                        <MyEnInfoSelectionItem>기사 이상</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>산업기사</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>기능사</MyEnInfoSelectionItem>
                    </MyEnInfoSelectionGroup>
                    <MyEnInfoSelectionGroup name='민간 자격증'>
                        <MyEnInfoSelectionItem>공인</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>비공인</MyEnInfoSelectionItem>
                    </MyEnInfoSelectionGroup>
                    <MyEnInfoSelectionGroup name='일학습병행자격증'>
                        <MyEnInfoSelectionItem>L6 / L5</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>L4 / L3</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>L2</MyEnInfoSelectionItem>
                    </MyEnInfoSelectionGroup>
                    <MyEnInfoSelectionGroup name='운전면허증'>
                        <MyEnInfoSelectionItem>대형 / 특수</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>1종 보통</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>2종 보통 (수동)</MyEnInfoSelectionItem>
                    </MyEnInfoSelectionGroup>
                </ul>
            );
        else if (props.kind === '전공')
            return (
                <ul>
                    <MyEnInfoSelectionGroup name='학교 구분'>
                        <MyEnInfoSelectionItem>대학교</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>전문대(3년)</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>전문대(2년)</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>고졸</MyEnInfoSelectionItem>
                    </MyEnInfoSelectionGroup>
                    <MyEnInfoSelectionGroup name='학년'>
                        <MyEnInfoSelectionItem>1학년</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>2학년</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>3학년</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>4학년</MyEnInfoSelectionItem>
                    </MyEnInfoSelectionGroup>
                    <MyEnInfoSelectionGroup name='재학 / 수료'>
                        <MyEnInfoSelectionItem>재학</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>수료</MyEnInfoSelectionItem>
                    </MyEnInfoSelectionGroup>
                    <MyEnInfoSelectionGroup name='전공 / 비전공 (고졸)'>
                        <MyEnInfoSelectionItem>전공</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>비전공</MyEnInfoSelectionItem>
                    </MyEnInfoSelectionGroup>
                    <MyEnInfoSelectionGroup name='직업전문학교 / 인재개발원'>
                        <MyEnInfoSelectionItem>2년 수료</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>1년 수료 / 2년</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>6개월 ~ 1년</MyEnInfoSelectionItem>
                    </MyEnInfoSelectionGroup>
                </ul>
            );
        else if (props.kind === '결석 일수')
            return (
                <ul>
                    <MyEnInfoSelectionGroup name='결석 일수'>
                        <MyEnInfoSelectionItem>0일</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>1일~2일</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>3일~4일</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>5일~6일</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>7일 이상</MyEnInfoSelectionItem>
                    </MyEnInfoSelectionGroup>
                </ul>
            );
        else if (props.kind === '가산점')
            return (
                <ul>
                    <MyEnInfoSelectionGroup name='헌혈'>
                        <MyEnInfoSelectionItem>1회</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>2회</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>3회</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>4회</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>5회</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>6회</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>7회</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>8회</MyEnInfoSelectionItem>
                    </MyEnInfoSelectionGroup>
                    <MyEnInfoSelectionGroup name='봉사활동'>
                        <MyEnInfoSelectionItem>8시간</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>16시간</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>24시간</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>32시간</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>40시간</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>48시간</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>56시간</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>64시간</MyEnInfoSelectionItem>
                    </MyEnInfoSelectionGroup>
                    <MyEnInfoSelectionGroup name='다자녀'>
                        <MyEnInfoSelectionItem>2인</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>3인 이상</MyEnInfoSelectionItem>
                    </MyEnInfoSelectionGroup>
                    <MyEnInfoSelectionGroup name='한국사 능력 검정'>
                        <MyEnInfoSelectionItem>1급 / 2급</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>3급 / 4급</MyEnInfoSelectionItem>
                    </MyEnInfoSelectionGroup>
                    <MyEnInfoSelectionGroup name='한국어 능력 검정'>
                        <MyEnInfoSelectionItem>1급 / 2급</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>3급 / 4급</MyEnInfoSelectionItem>
                    </MyEnInfoSelectionGroup>
                </ul>
            );
        else
            return null;
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
                    <MyEnInfoSelectionCentent kind={props.title}/>
                    <div className='en-info-edit-button-section'>
                        <button className='button' id='cancel-button' onClick={handleModal}>취소</button>
                        <button className='button' id='save-button' onClick={saveEditModal}>저장</button>    
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default React.memo(MyEnInfoItem);