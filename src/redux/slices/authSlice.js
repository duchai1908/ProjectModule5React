import { createSlice } from "@reduxjs/toolkit";
import { loadUserFromCookie, login } from "../../services/authService";
import Cookies from "js-cookie";
const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: "idle",
    data: null,
    error: null,
    isLoggedIn: false, // Trạng thái đăng nhập
  },
  reducers: {
    logout: (state) => {
      Cookies.remove("token");
      state.data = null;
      state.isLoggedIn = false; // Đặt lại trạng thái đăng nhập
    },
    loginSuccess: (state, action) => {
      state.isLoggedIn = true; // Đặt trạng thái đăng nhập thành true khi đăng nhập thành công
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state, action) => {
        state.status = "pending";
      })

      .addCase(login.fulfilled, (state, action) => {
        state.status = "successfully";
        state.isLoggedIn = true;
        state.data = action.payload;
      })

      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.isLoggedIn = false;
        state.error = action.error.message;
      })

      .addCase(loadUserFromCookie.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoggedIn = true;
      });
  },
});
export const { logout, loginSuccess } = authSlice.actions;
export default authSlice.reducer;
