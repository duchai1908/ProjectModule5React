import { createSlice } from "@reduxjs/toolkit";
import { getCoupon } from "../../services/couponService";

const initialValue = {
  status: "idle",
  data: [],
  error: null,
};

const couponSlice = createSlice({
  name: "coupon",
  initialState: initialValue,
  reducers: {
    clearCoupon: (state) => {
      state.data = null; // Xóa dữ liệu coupon khi cần
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Thời điểm tải dữ liệu => Chưa có dữ liệu
    builder

      .addCase(getCoupon.pending, (state, action) => {
        console.log("start");
        state.status = "pending";
      })
      // Thời điểm đã có dữ liệu
      .addCase(getCoupon.fulfilled, (state, action) => {
        state.status = "successfully";
        console.log(action.payload);
        state.data = action.payload;
      })
      .addCase(getCoupon.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        console.log(action.payload);
      });
  },
});
export const { clearCoupon } = couponSlice.actions;
export default couponSlice.reducer;
