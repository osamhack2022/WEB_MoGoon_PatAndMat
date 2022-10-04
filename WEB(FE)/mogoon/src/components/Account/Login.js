// import React, { useState } from 'react';
import React, { useEffect, useState, useCallback } from "react";
import axios from 'axios';



const Login = () => {

    return (
        <div className="login-wrap">
            <div className="login-logo"></div>
            <div className="login-name">모군 : 군 입대 지원의 모든 것</div>
            <div className="login-content">

            </div>
        </div>
    );
};

export default React.memo(Login);