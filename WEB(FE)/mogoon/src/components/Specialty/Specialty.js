import React, { useState } from 'react';
import SpecialtyItem from "./SpecialtyItem";

const Specialty = (props) => {
    return (
        <>
            <div className='spsearch'>
                <input type={'text'} placeholder="특기를 입력해주세요."></input>
                <div className='srarchIcon'></div>
            </div>
            <div className='specialty'>
                <SpecialtyItem name="화생방병" />
                <SpecialtyItem name="화생방병" />
                <SpecialtyItem name="화생방병" />
                <SpecialtyItem name="화생방병" />
                <SpecialtyItem name="화생방병" />
                <SpecialtyItem name="화생방병" />
                <SpecialtyItem name="화생방병" />
                <SpecialtyItem name="화생방병" />
                <SpecialtyItem name="화생방병" />
                <SpecialtyItem name="화생방병" />
                <SpecialtyItem name="화생방병" />
                <SpecialtyItem name="화생방병" />
                <SpecialtyItem name="화생방병" />
                <SpecialtyItem name="화생방병" />
                <SpecialtyItem name="화생방병" />
                <SpecialtyItem name="화생방병" />
                <SpecialtyItem name="화생방병" />
            </div>
        </>
    );
};

export default Specialty;