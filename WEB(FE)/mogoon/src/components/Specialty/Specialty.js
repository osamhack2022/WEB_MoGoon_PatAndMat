// import React, { useState } from 'react';
import React, { useEffect, useState } from "react";
import SpecialtyItem from "./SpecialtyItem";
import axios from 'axios';

const Specialty = (props) => {
    const [SpData, setSpData] = useState(null);
    async function getData() {
        const response = await axios.get("http://localhost:5000/api/speciality/list")
            .then((response) => {
                setSpData(response.data);
            });
    }

    useEffect(() => {
        getData();

    }, []);

    if (!SpData) {
        return null;
    }

    console.log(SpData);

    return (
        <>
            <div className='spsearch'>
                <input type={'text'} placeholder="특기를 입력해주세요."></input>
                <div className='srarchIcon'></div>
            </div>
            <div className='specialty'>
                {SpData.map(data => (
                    <SpecialtyItem key={data.speciality_code} name={data.speciality_name} class={data.class}
                        desc={data.desc} military_kind={data.military_kind} tags={data.tags}
                        imageSrc={data.imageSrc} kind={data.kind} like={data.like}
                    />
                ))}

                {/* <SpecialtyItem name="화생방병" class="전문" desc="이것은 소개입니다 이것은 소개입니다 이것은 소개입니다" military_kind="해군" tags={["휴가많음","아닌가?","몰라용"]}  />
                <SpecialtyItem name="화생방병" class="전문" desc="이것은 소개입니다 이것은 소개입니다 이것은 소개입니다" military_kind="해군" tags={["휴가많음","아닌가?","몰라용"]}  />
                <SpecialtyItem name="화생방병" class="전문" desc="이것은 소개입니다 이것은 소개입니다 이것은 소개입니다" military_kind="해군" tags={["휴가많음","아닌가?","몰라용"]}  />
                <SpecialtyItem name="화생방병" class="전문" desc="이것은 소개입니다 이것은 소개입니다 이것은 소개입니다" military_kind="해군" tags={["휴가많음","아닌가?","몰라용"]}  />
                <SpecialtyItem name="화생방병" class="전문" desc="이것은 소개입니다 이것은 소개입니다 이것은 소개입니다" military_kind="해군" tags={["휴가많음","아닌가?","몰라용"]}  />
                <SpecialtyItem name="화생방병" class="전문" desc="이것은 소개입니다 이것은 소개입니다 이것은 소개입니다" military_kind="해군" tags={["휴가많음","아닌가?","몰라용"]}  />
                <SpecialtyItem name="화생방병" class="전문" desc="이것은 소개입니다 이것은 소개입니다 이것은 소개입니다" military_kind="해군" tags={["휴가많음","아닌가?","몰라용"]}  />
                <SpecialtyItem name="화생방병" class="전문" desc="이것은 소개입니다 이것은 소개입니다 이것은 소개입니다" military_kind="해군" tags={["휴가많음","아닌가?","몰라용"]}  />
                <SpecialtyItem name="화생방병" class="전문" desc="이것은 소개입니다 이것은 소개입니다 이것은 소개입니다" military_kind="해군" tags={["휴가많음","아닌가?","몰라용"]}  />
                <SpecialtyItem name="화생방병" class="전문" desc="이것은 소개입니다 이것은 소개입니다 이것은 소개입니다" military_kind="해군" tags={["휴가많음","아닌가?","몰라용"]}  />
                <SpecialtyItem name="화생방병" class="전문" desc="이것은 소개입니다 이것은 소개입니다 이것은 소개입니다" military_kind="해군" tags={["휴가많음","아닌가?","몰라용"]}  /> */}
                
            </div>
        </>
    );
};

export default Specialty;