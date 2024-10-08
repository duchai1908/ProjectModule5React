import { createSlice } from "@reduxjs/toolkit";
import { getAllPDI } from "../../services/pdi";

// import { addCategory, findAllCategory } from "../../services/categoryService";

const initialValue = {
  status: "idle",
  data: [],
  error: null,
};
//page, size, search, minPrice, maxPrice, sortOption

const productDetailAndImageSlice = createSlice({
  name: "size",
  initialState: initialValue,
  extraReducers: (builder) => {
    // Thời điểm tải dữ liệu => Chưa có dữ liệu
    builder
      .addCase(getAllPDI.pending, (state, action) => {
        state.status = "pending";
      })
      // Thời điểm đã có dữ liệu
      .addCase(getAllPDI.fulfilled, (state, action) => {
        state.status = "successfully";
        console.log(action.payload);
        state.data = action.payload.data;
      })
      .addCase(getAllPDI.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default productDetailAndImageSlice.reducer;
