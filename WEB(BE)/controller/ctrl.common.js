"use strict";

export const Result = function() {
    this.success = false;
    this.data = null;
    this.err_code = null;
    this.err_msg = null;
};

export const cookieOption = {
    httpOnly: true,
    maxAge: 1000*60*10,
    sameSite: 'none',
    secure: true
};