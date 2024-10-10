import { createSlice } from "@reduxjs/toolkit";
import {} from "../../services/userOderService";
import {
  findAllOrderByUser,
  updateStatusOrder,
} from "../../services/adminOrderService";

// import { addCategory, findAllCategory } from "../../services/categoryService";

const initialValue = {
  status: "idle",
  data: [],
  totalElements: 0,
  number: 0,
  size: 3,
  error: null,
  numberOfElements: 0,
};
//page, size, search, minPrice, maxPrice, sortOption

const adminOrderSlice = createSlice({
  name: "adminOrder",
  initialState: initialValue,
  reducers: {
    changePageAdminOder: (state, action) => {
      state.number = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Thời điểm tải dữ liệu => Chưa có dữ liệu
    builder
      .addCase(findAllOrderByUser.pending, (state, action) => {
        console.log("Pending");
        state.status = "pending";
      })
      // Thời điểm đã có dữ liệu
      .addCase(findAllOrderByUser.fulfilled, (state, action) => {
        console.log("success", action.payload);
        state.status = "successfully";
        state.totalElements = action.payload.data.totalElements;
        state.number = action.payload.data.number;
        state.size = action.payload.data.size;
        state.data = action.payload.data.content; // Dữ liệu content
        state.numberOfElements = action.payload.data.numberOfElements;
      })
      .addCase(findAllOrderByUser.rejected, (state, action) => {
        console.log("Rejected");
        state.status = "failed";
        state.error = action.error.message;
      });

    builder
      .addCase(updateStatusOrder.pending, (state, action) => {
        console.log("pending");
        state.status = "pending";
      })
      // Thời điểm đã có dữ liệu
      .addCase(updateStatusOrder.fulfilled, (state, action) => {
        console.log("success");
        state.status = "successfully";
        // state.data = action.payload.data;
      })
      .addCase(updateStatusOrder.rejected, (state, action) => {
        console.log("failed to update");
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { changePageAdminOder } = adminOrderSlice.actions;
export default adminOrderSlice.reducer;
