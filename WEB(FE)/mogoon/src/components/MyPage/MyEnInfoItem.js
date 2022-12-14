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
            if (!!value) {
                contents += value;
                contents += ', '; 
            }  
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
        if (props.kind === '??????/??????') {
            return (
                <ul>
                    <MyEnInfoSelectionGroup name='?????????????????????' code='national'>
                        <MyEnInfoSelectionItem>?????? ??????</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>????????????</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>?????????</MyEnInfoSelectionItem>
                    </MyEnInfoSelectionGroup>
                    <MyEnInfoSelectionGroup name='?????? ?????????' code='general'>
                        <MyEnInfoSelectionItem>??????</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>?????????</MyEnInfoSelectionItem>
                    </MyEnInfoSelectionGroup>
                    <MyEnInfoSelectionGroup name='????????????????????????' code='work_learn'>
                        <MyEnInfoSelectionItem>L6 / L5</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>L4 / L3</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>L2</MyEnInfoSelectionItem>
                    </MyEnInfoSelectionGroup>
                    <MyEnInfoSelectionGroup name='???????????????' code='drive_license'>
                        <MyEnInfoSelectionItem>?????? / ??????</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>1??? ??????</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>2??? ?????? (??????)</MyEnInfoSelectionItem>
                    </MyEnInfoSelectionGroup>
                </ul>
            );
        }
        else if (props.kind === '??????')
            return (
                <ul>
                    <MyEnInfoSelectionGroup name='?????? ??????' code='type'>
                        <MyEnInfoSelectionItem>?????????</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>?????????(3???)</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>?????????(2???)</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>??????</MyEnInfoSelectionItem>
                    </MyEnInfoSelectionGroup>
                    <MyEnInfoSelectionGroup name='??????' code='grade'>
                        <MyEnInfoSelectionItem>1??????</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>2??????</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>3??????</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>4??????</MyEnInfoSelectionItem>
                    </MyEnInfoSelectionGroup>
                    <MyEnInfoSelectionGroup name='?????? / ??????' code='is_register'>
                        <MyEnInfoSelectionItem>??????</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>??????</MyEnInfoSelectionItem>
                    </MyEnInfoSelectionGroup>
                    <MyEnInfoSelectionGroup name='?????? / ????????? (??????)' code='is_major'>
                        <MyEnInfoSelectionItem>??????</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>?????????</MyEnInfoSelectionItem>
                    </MyEnInfoSelectionGroup>
                    <MyEnInfoSelectionGroup name='?????????????????? / ???????????????' code='work_school'>
                        <MyEnInfoSelectionItem>2??? ??????</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>1??? ?????? / 2???</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>6?????? ~ 1???</MyEnInfoSelectionItem>
                    </MyEnInfoSelectionGroup>
                </ul>
            );
        else if (props.kind === '?????? ??????')
            return (
                <ul>
                    <MyEnInfoSelectionGroup name='?????? ??????' code='absent_days'>
                        <MyEnInfoSelectionItem>0???</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>1???~2???</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>3???~4???</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>5???~6???</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>7??? ??????</MyEnInfoSelectionItem>
                    </MyEnInfoSelectionGroup>
                </ul>
            );
        else if (props.kind === '?????????')
            return (
                <ul>
                    <MyEnInfoSelectionGroup name='??????' code='blood_donation'>
                        <MyEnInfoSelectionItem>1???</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>2???</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>3???</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>4???</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>5???</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>6???</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>7???</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>8???</MyEnInfoSelectionItem>
                    </MyEnInfoSelectionGroup>
                    <MyEnInfoSelectionGroup name='????????????' code='volunteer'>
                        <MyEnInfoSelectionItem>8??????</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>16??????</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>24??????</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>32??????</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>40??????</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>48??????</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>56??????</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>64??????</MyEnInfoSelectionItem>
                    </MyEnInfoSelectionGroup>
                    <MyEnInfoSelectionGroup name='?????????' code='child_count'>
                        <MyEnInfoSelectionItem>2???</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>3??? ??????</MyEnInfoSelectionItem>
                    </MyEnInfoSelectionGroup>
                    <MyEnInfoSelectionGroup name='????????? ?????? ??????' code='history_cert'>
                        <MyEnInfoSelectionItem>1??? / 2???</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>3??? / 4???</MyEnInfoSelectionItem>
                    </MyEnInfoSelectionGroup>
                    <MyEnInfoSelectionGroup name='????????? ?????? ??????' code='korean_cert'>
                        <MyEnInfoSelectionItem>1??? / 2???</MyEnInfoSelectionItem>
                        <MyEnInfoSelectionItem>3??? / 4???</MyEnInfoSelectionItem>
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
                    <div className='en-info-edit' onClick={handleModal}>??????</div>
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
                        <button className='button' id='cancel-button' onClick={handleModal}>??????</button>
                        <button className='button' id='save-button' onClick={saveEditModal}>??????</button>    
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default React.memo(MyEnInfoItem);