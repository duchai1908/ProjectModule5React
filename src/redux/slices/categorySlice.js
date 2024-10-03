import { createSlice } from "@reduxjs/toolkit";
import { findAllCategory } from "../../services/categoryService";

const initialValue = {
  status: "idle",
  data: [],
  error: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState: initialValue,
  reducers: {},
  extraReducers: (builder) => {
    // Thời điểm tải dữ liệu => Chưa có dữ liệu
    builder
      .addCase(findAllCategory.pending, (state, action) => {
        state.status = "pending";
      })
      // Thời điểm đã có dữ liệu
      .addCase(findAllCategory.fulfilled, (state, action) => {
        state.status = "successfully";
        state.data = action.payload;
      })
      .addCase(findAllCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export default categorySlice.reducer;
