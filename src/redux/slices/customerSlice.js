import { createSlice } from "@reduxjs/toolkit";
import {
  customerStatusChange,
  findAllCustomers,
} from "../../services/customerService";

const initialValue = {
  status: "idle",
  data: [],
  totalElements: 0,
  size: 3,
  number: 0,
  error: null,
};

const customerSlice = createSlice({
  name: "customer",
  initialState: initialValue,
  reducers: {
    changePageCustomer: (state, action) => {
      state.number = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Thời điểm tải dữ liệu => Chưa có dữ liệu
    builder
      .addCase(findAllCustomers.pending, (state, action) => {
        state.status = "pending";
      })
      // Thời điểm đã có dữ liệu
      .addCase(findAllCustomers.fulfilled, (state, action) => {
        state.status = "successful";
        console.log("data", action.payload);
        state.data = action.payload.data.content;
        state.totalElements = action.payload.data.totalElements;
        state.size = action.payload.data.size;
        state.number = action.payload.data.number;
      })
      // Thời điểm bắt lỗi
      .addCase(findAllCustomers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
    // thay doi status
    builder
      .addCase(customerStatusChange.pending, (state) => {
        state.status = "pending"; // Đặt trạng thái khi đang xử lý
      })
      .addCase(customerStatusChange.fulfilled, (state, action) => {
        state.data = state.data.map((customer) =>
          customer.id === action.payload.id
            ? { ...customer, status: action.payload.status }
            : customer
        );
        state.status = "succeeded";
      })
      .addCase(customerStatusChange.rejected, (state, action) => {
        state.status = "failed"; // Đặt trạng thái khi thất bại
        state.error = action.payload; // Gán lỗi vào state
      });
  },
});
export const { changePageCustomer } = customerSlice.actions;
export default customerSlice.reducer;
