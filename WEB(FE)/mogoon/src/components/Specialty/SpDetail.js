import React, { useState } from 'react';
import { useParams } from "react-router-dom";

let SpDetail = () => {
    const name = useParams().SpName; 
    console.log(name);

    return (
        <div>{name}</div>    
    );
};

export default React.memo(SpDetail);