import { createSlice } from "@reduxjs/toolkit";
import { findAllAddress } from "../../services/addressService";

const initialValue = {
  status: "idle",
  data: [],
  error: null,
};

const addressSlice = createSlice({
  name: "address",
  initialState: initialValue,
  reducers: {},
  extraReducers: (builder) => {
    // Thời điểm tải dữ liệu => Chưa có dữ liệu
    builder

      .addCase(findAllAddress.pending, (state, action) => {
        console.log("start");
        state.status = "pending";
      })
      // Thời điểm đã có dữ liệu
      .addCase(findAllAddress.fulfilled, (state, action) => {
        state.status = "successfully";
        console.log(action.payload);
        state.data = action.payload;
      })
      .addCase(findAllAddress.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        console.log(action.payload);
      });
  },
});
export default addressSlice.reducer;
