import React from 'react';

let Banner = (props) => {
    return (
        <div className='banner' onClick={() => {

        }}>
            <div style={{
                backgroundColor: props.backColor,
                borderColor: props.borderColor,
                color: props.color,
                backgroundImage: `url(${props.backImg})`
            }}>{props.type}</div>
        </div>
    );

    Banner.defaultProps = {
        backgroundColor: "none",
        borderColor: "none",
        color: "",
    }
};

export default Banner;

