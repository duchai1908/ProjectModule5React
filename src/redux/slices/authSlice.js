import { createSlice } from "@reduxjs/toolkit";
import { loadUserFromCookie, login } from "../../services/authService";
import Cookies from "js-cookie";
const authSlice = createSlice({
    name: "auth",
    initialState:{
        status: "idle",
        data: null,
        error: null,
    },
    reducers: {
        logout: (state) => {
            Cookies.remove("token");
            state.data = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state,action) =>{
            state.status = "pending";
        })

        .addCase(login.fulfilled, (state,action) => {
            state.status = "successfully";
            state.data = action.payload;
        })

        .addCase(login.rejected, (state, action) =>{
            state.status = "failed";
            state.error = action.error.message;
        })

        .addCase(loadUserFromCookie.fulfilled, (state,action) => {
            state.data = action.payload;
        })
    }
});
export const { logout } = authSlice.actions;
export default authSlice.reducer;