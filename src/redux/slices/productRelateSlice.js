import { createSlice } from "@reduxjs/toolkit";
import { getAllProductRelateByCateId } from "../../services/productRelateService";

const initialValue = {
  status: "idle",
  data: [],
  error: null,
};

const productRelateSlice = createSlice({
  name: "productRelate",
  initialState: initialValue,

  extraReducers: (builder) => {
    // Thời điểm tải dữ liệu => Chưa có dữ liệu
    builder
      .addCase(getAllProductRelateByCateId.pending, (state, action) => {
        state.status = "pending";
      })
      // Thời điểm đã có dữ liệu
      .addCase(getAllProductRelateByCateId.fulfilled, (state, action) => {
        state.status = "successfully";
        console.log("in slice", action.payload);
        state.data = action.payload.data;
      })
      .addCase(getAllProductRelateByCateId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default productRelateSlice.reducer;
