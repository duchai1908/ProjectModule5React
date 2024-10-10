import { createSlice } from "@reduxjs/toolkit";
import { changePassword, updateUser } from "../../services/userService";
const initialValue = {
  status: "idle",
  data: [],
  error: null,
};
const userSlice = createSlice({
  name: "user",
  initialState: initialValue,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload.data.data;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        console.log("Rejected payload:", action.payload); // Kiểm tra dữ liệu trả về từ lỗi
      });
    // change password
    builder
      .addCase(changePassword.pending, (state) => {
        console.log("change password pending");
        state.status = "loading";
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        console.log("changePassword  successful");
        state.status = "succeeded";
        state.data = action.payload.data.data;
      })
      .addCase(changePassword.rejected, (state, action) => {
        console.log("changePassword rejected");
        state.status = "failed";
        state.error = action.payload;
      });
  },
});
export const selectUser = (state) => state.user;
export default userSlice.reducer;
