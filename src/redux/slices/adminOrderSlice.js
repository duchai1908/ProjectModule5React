import { createSlice } from "@reduxjs/toolkit";
import {} from "../../services/userOderService";
import {
  findAllOrderByUser,
  updateOrderByUser,
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
    changePageUserOder: (state, action) => {
      state.number = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Thời điểm tải dữ liệu => Chưa có dữ liệu
    builder
      .addCase(findAllOrderByUser.pending, (state, action) => {
        state.status = "pending";
      })
      // Thời điểm đã có dữ liệu
      .addCase(findAllOrderByUser.fulfilled, (state, action) => {
        state.status = "successfully";
        state.totalElements = action.payload.data.totalElements;
        state.number = action.payload.data.number;
        state.size = action.payload.data.size;
        state.data = action.payload.data.content;
        state.numberOfElements = action.payload.data.numberOfElements;
      })
      .addCase(findAllOrderByUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    // builder
    //   // .addCase(updateOrderByUser.pending, (state, action) => {
    //   //   state.status = "pending";
    //   // })
    //   // Thời điểm đã có dữ liệu
    //   .addCase(updateOrderByUser.fulfilled, (state, action) => {
    //     state.status = "successfully";
    //     state.data = action.payload.data;
    //   })
    //   .addCase(updateOrderByUser.rejected, (state, action) => {
    //     state.status = "failed";
    //     state.error = action.error.message;
    //   });
  },
});

export const { changePageUserOder } = adminOrderSlice.actions;
export default adminOrderSlice.reducer;
