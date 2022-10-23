import React, { useEffect, useState } from 'react';
import { Modal } from '@mui/material';
import axios from 'axios';

// css
import "../../css/MyPage/Common.css";
import "../../css/MyPage/MyEnInfoItem.css";
import "../../css/MyPage/MyEnInfoEdit.css";

const MyEnInfoItem = (props) => {
    const [open, setOpen] = useState(false);
    const [selectionObj, setSelectionObj] = useState(props.selectionObj);

    useEffect(() => {
        console.log(selectionObj);

    }, [selectionObj]);

    const handleModal = (e) => {
        setOpen(!open);
    };

    const saveEditModal = (e) => {
        const saveData = async (selectionObj) => {
            try {
                const token = localStorage.getItem('IdToken');
                //setSavingModalOpen(true);
                await axios.put(`http://localhost:5000/api/user/en-info/${props["en-info-type"]}`, selectionObj, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                }).then((response) => {
                    return response.data;
                }).then((result) => {
                //    setSavingModalOpen(false);
                    if (!result.success)
                        console.log(result.err_msg);
                });    
            } catch (error) {
                console.log(error);
            }
        };

        saveData(selectionObj);

        const new_selectionObj = Object.assign({}, selectionObj);
        setSelectionObj(new_selectionObj);
        setOpen(!open);
    };

    const getContentsFromSelection = (selectionObj) => {
        //if (!!selectionObj) return 'no data';

        let contents = '';

        Object.entries(selectionObj).forEach(([key, value]) => {
            contents += key
            contents += ': '
            contents += value;
            contents += '\n';   
        });

        return contents;
    };

    const MyEnInfoSelectionGroup = (props) => {
        const [selection, setSelection] = useState(selectionObj[props.code]);
        const [children, setChildren] = useState(props.children);

        useEffect(() => {
            const new_children = React.Children.map(props.children, (child) => {
                if (React.isValidElement(child)) {
                    return React.cloneElement(child, {
                        selectionHandler,
                        clicked: child.props.children === selection
                    });
                }
                return child;
            });
            setChildren(new_children);
            selectionObj[props.code] = selection;
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
        };

        return (
            <div className={'en-info-edit-list-item' + (props.clicked ? ' clicked' : '')} onClick={handleClick}>
                {props.children}
            </div>
        );
    };

    const MyEnInfoSelectionCentent = (props) => {
        if (props.kind === '자격/면허') {
            return (
                <ul>
                    <MyEnInfoSelectionGroup name='국가기술자격증' code='national'>
                        <MyEnInfoSelectionItem>기사 이상</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>산업기사</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>기능사</MyEnInfoSelectionItem>
                    </MyEnInfoSelectionGroup>
                    <MyEnInfoSelectionGroup name='민간 자격증' code='general'>
                        <MyEnInfoSelectionItem>공인</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>비공인</MyEnInfoSelectionItem>
                    </MyEnInfoSelectionGroup>
                    <MyEnInfoSelectionGroup name='일학습병행자격증' code='work_learn'>
                        <MyEnInfoSelectionItem>L6 / L5</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>L4 / L3</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>L2</MyEnInfoSelectionItem>
                    </MyEnInfoSelectionGroup>
                    <MyEnInfoSelectionGroup name='운전면허증' code='drive_license'>
                        <MyEnInfoSelectionItem>대형 / 특수</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>1종 보통</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>2종 보통 (수동)</MyEnInfoSelectionItem>
                    </MyEnInfoSelectionGroup>
                </ul>
            );
        }
        else if (props.kind === '전공')
            return (
                <ul>
                    <MyEnInfoSelectionGroup name='학교 구분' code='type'>
                        <MyEnInfoSelectionItem>대학교</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>전문대(3년)</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>전문대(2년)</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>고졸</MyEnInfoSelectionItem>
                    </MyEnInfoSelectionGroup>
                    <MyEnInfoSelectionGroup name='학년' code='grade'>
                        <MyEnInfoSelectionItem>1학년</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>2학년</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>3학년</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>4학년</MyEnInfoSelectionItem>
                    </MyEnInfoSelectionGroup>
                    <MyEnInfoSelectionGroup name='재학 / 수료' code='is_register'>
                        <MyEnInfoSelectionItem>재학</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>수료</MyEnInfoSelectionItem>
                    </MyEnInfoSelectionGroup>
                    <MyEnInfoSelectionGroup name='전공 / 비전공 (고졸)' code='is_major'>
                        <MyEnInfoSelectionItem>전공</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>비전공</MyEnInfoSelectionItem>
                    </MyEnInfoSelectionGroup>
                    <MyEnInfoSelectionGroup name='직업전문학교 / 인재개발원' code='work_school'>
                        <MyEnInfoSelectionItem>2년 수료</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>1년 수료 / 2년</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>6개월 ~ 1년</MyEnInfoSelectionItem>
                    </MyEnInfoSelectionGroup>
                </ul>
            );
        else if (props.kind === '결석 일수')
            return (
                <ul>
                    <MyEnInfoSelectionGroup name='결석 일수' code='absent_days'>
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
                    <MyEnInfoSelectionGroup name='헌혈' code='blood_donation'>
                        <MyEnInfoSelectionItem>1회</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>2회</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>3회</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>4회</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>5회</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>6회</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>7회</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>8회</MyEnInfoSelectionItem>
                    </MyEnInfoSelectionGroup>
                    <MyEnInfoSelectionGroup name='봉사활동' code='volunteer'>
                        <MyEnInfoSelectionItem>8시간</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>16시간</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>24시간</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>32시간</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>40시간</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>48시간</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>56시간</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>64시간</MyEnInfoSelectionItem>
                    </MyEnInfoSelectionGroup>
                    <MyEnInfoSelectionGroup name='다자녀' code='child_count'>
                        <MyEnInfoSelectionItem>2인</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>3인 이상</MyEnInfoSelectionItem>
                    </MyEnInfoSelectionGroup>
                    <MyEnInfoSelectionGroup name='한국사 능력 검정' code='history_cert'>
                        <MyEnInfoSelectionItem>1급 / 2급</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>3급 / 4급</MyEnInfoSelectionItem>
                    </MyEnInfoSelectionGroup>
                    <MyEnInfoSelectionGroup name='한국어 능력 검정' code='korean_cert'>
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
                    {!!selectionObj ? getContentsFromSelection(selectionObj) : 'no data'}
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