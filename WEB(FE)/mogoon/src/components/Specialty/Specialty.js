// import React, { useState } from 'react';
import React, { useEffect, useState } from "react";
import SpecialtyItem from "./SpecialtyItem";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import { makeStyles } from "@material-ui/styles";
import { fontSize } from "@mui/system";

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
            <SpFilter>

            </SpFilter>
            <div className='specialty'>
                {SpData.map(data => (
                    <SpecialtyItem key={data.speciality_code} name={data.speciality_name} class={data.class}
                        desc={data.desc} military_kind={data.military_kind} tags={data.tags}
                        imageSrc={data.imageSrc} kind={data.kind} like={data.like}
                    />
                ))}

                <SpecialtyItem name="화생방병" class="전문" desc="이것은 소개입니다 이것은 소개입니다 이것은 소개입니다" military_kind="해군" tags={["휴가많음", "아닌가?", "몰라용"]} />
                <SpecialtyItem name="화생방병" class="전문" desc="이것은 소개입니다 이것은 소개입니다 이것은 소개입니다" military_kind="해군" tags={["휴가많음", "아닌가?", "몰라용"]} />
                <SpecialtyItem name="화생방병" class="전문" desc="이것은 소개입니다 이것은 소개입니다 이것은 소개입니다" military_kind="해군" tags={["휴가많음", "아닌가?", "몰라용"]} />
                <SpecialtyItem name="화생방병" class="전문" desc="이것은 소개입니다 이것은 소개입니다 이것은 소개입니다" military_kind="해군" tags={["휴가많음", "아닌가?", "몰라용"]} />
                <SpecialtyItem name="화생방병" class="전문" desc="이것은 소개입니다 이것은 소개입니다 이것은 소개입니다" military_kind="해군" tags={["휴가많음", "아닌가?", "몰라용"]} />
                <SpecialtyItem name="화생방병" class="전문" desc="이것은 소개입니다 이것은 소개입니다 이것은 소개입니다" military_kind="해군" tags={["휴가많음", "아닌가?", "몰라용"]} />
                <SpecialtyItem name="화생방병" class="전문" desc="이것은 소개입니다 이것은 소개입니다 이것은 소개입니다" military_kind="해군" tags={["휴가많음", "아닌가?", "몰라용"]} />
                <SpecialtyItem name="화생방병" class="전문" desc="이것은 소개입니다 이것은 소개입니다 이것은 소개입니다" military_kind="해군" tags={["휴가많음", "아닌가?", "몰라용"]} />
                <SpecialtyItem name="화생방병" class="전문" desc="이것은 소개입니다 이것은 소개입니다 이것은 소개입니다" military_kind="해군" tags={["휴가많음", "아닌가?", "몰라용"]} />
                <SpecialtyItem name="화생방병" class="전문" desc="이것은 소개입니다 이것은 소개입니다 이것은 소개입니다" military_kind="해군" tags={["휴가많음", "아닌가?", "몰라용"]} />
                <SpecialtyItem name="화생방병" class="전문" desc="이것은 소개입니다 이것은 소개입니다 이것은 소개입니다" military_kind="해군" tags={["휴가많음", "아닌가?", "몰라용"]} />
            </div>
        </>
    );
};

const useStyles = makeStyles((theme) => ({
    label: {
        fontSize: theme.Typography.pxToRem(19),
    }
}));

const SpFilter = (props) => {
    const classes = useStyles();

    return (
        <fieldset className="SpFilter">
            <legend style={{ fontSize: "1em", fontWeight: 600 }}>Filter</legend>
            <FormGroup classes="FormGroup">
                <FormControlLabel control={<Checkbox defaultChecked size="small" />} label="육군" classes={classes} />
                <FormControlLabel control={<Checkbox defaultChecked size="small" />} label="해군" />
                <FormControlLabel control={<Checkbox defaultChecked size="small" />} label="공군" />
                <FormControlLabel control={<Checkbox defaultChecked size="small" />} label="해병대" />
            </FormGroup>
        </fieldset>
    );
};

export default Specialty;