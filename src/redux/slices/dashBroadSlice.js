import { createSlice } from "@reduxjs/toolkit";
import { getDashboard } from "../../services/dashBoardService";

const initialValue = {
  status: "idle",
  data: [],
  error: null,
};

const dashBoardSlice = createSlice({
  name: "dashBoard",
  initialState: initialValue,
  reducers: {
    changePageUserOder: (state, action) => {
      state.number = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDashboard.pending, (state, action) => {
        state.status = "pending";
      })
      // Thời điểm đã có dữ liệu
      .addCase(getDashboard.fulfilled, (state, action) => {
        console.log("success", action.payload);
        state.status = "successfully";
        state.data = action.payload.data;
      })
      .addCase(getDashboard.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export default dashBoardSlice.reducer;
