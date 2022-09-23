import React from 'react';

let HeaderItem =(props)=>{
    return(
        <li style={{color:props.color}}>{props.title}</li>
    );
};

export default HeaderItem;