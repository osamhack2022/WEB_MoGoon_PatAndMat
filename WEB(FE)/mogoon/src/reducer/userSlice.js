import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        email: "",
        password: ""
    },
    reducers: {
        // login 성공 시
        loginUser: (state, action) => {
            console.log(action);

            state.email = action.payload.email;
            state.password = action.payload.password;
            // state 변화를 알림
            return state;
        },
        // login 실패 시
        clearUser: (state) => {
            // name, id 값을 비워줌.
            state.email = "";
            state.password = "";
            // state 변화를 알림
            return state;
        },
    },
});

export const { loginUser, clearUser } = userSlice.actions;
export default userSlice.reducer;