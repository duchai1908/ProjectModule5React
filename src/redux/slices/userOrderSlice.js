import { createSlice } from "@reduxjs/toolkit";
import {
  cancelOrderByUser,
  getAllOrderByUser,
} from "../../services/userOderService";

// import { addCategory, findAllCategory } from "../../services/categoryService";

const initialValue = {
  status: "idle",
  data: [],
  totalElements: 0,
  number: 0,
  size: 2,
  error: null,
  numberOfElements: 0,
};
//page, size, search, minPrice, maxPrice, sortOption

const userOrderSlice = createSlice({
  name: "color",
  initialState: initialValue,
  reducers: {
    changePageUserOder: (state, action) => {
      state.number = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Thời điểm tải dữ liệu => Chưa có dữ liệu
    builder
      .addCase(getAllOrderByUser.pending, (state, action) => {
        state.status = "pending";
      })
      // Thời điểm đã có dữ liệu
      .addCase(getAllOrderByUser.fulfilled, (state, action) => {
        state.status = "successfully";
        state.totalElements = action.payload.data.totalElements;
        state.number = action.payload.data.number;
        state.size = action.payload.data.size;
        state.data = action.payload.data.content;
        state.numberOfElements = action.payload.data.numberOfElements;
      })
      .addCase(getAllOrderByUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { changePageUserOder } = userOrderSlice.actions;
export default userOrderSlice.reducer;
