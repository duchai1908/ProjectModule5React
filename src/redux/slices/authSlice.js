import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "../../services/authService";
console.log("chay vao day");
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null, // Lưu thông tin người dùng
    accessToken: null, // Lưu accessToken
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        console.log("pending");
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log("fulfilled");
        console.log("Payload:", action.payload); // Thêm log này để xem nội dung của payload
        state.status = "succeeded";
        state.user = action.payload; // Lưu thông tin người dùng
        state.accessToken = action.payload.accessToken; // Lưu toke;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        console.log("error");
        state.status = "failed";
        state.error = action.payload; // Lưu lại thông báo lỗi
      });
  },
});

export default authSlice.reducer;
