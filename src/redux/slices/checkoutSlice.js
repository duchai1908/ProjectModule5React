import { createSlice } from "@reduxjs/toolkit";
import { addOrder } from "../../services/checkoutService";

const initialValue = {
  status: "idle",
  data: [],
  error: null,
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState: initialValue,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addOrder.pending, (state) => {
        console.log("pending");
        state.status = "loading"; // Đang tải
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        console.log("fulfilled");
        state.status = "succeeded"; // Thành công
        state.data.push(action.payload); // Thêm dữ liệu vào state
      })
      .addCase(addOrder.rejected, (state, action) => {
        console.log("failed");
        state.status = "failed"; // Thất bại
        state.error = action.error.message; // Ghi lại thông báo lỗi
      });
  },
});
export default checkoutSlice.reducer;
