import { createSlice } from "@reduxjs/toolkit";
import {
  addSize,
  deleteSize,
  getAllSize,
  getAllSizesByNothing,
  updateSize,
} from "../../services/sizeService";

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

const sizeSlice = createSlice({
  name: "size",
  initialState: initialValue,
  reducers: {
    changePageSize: (state, action) => {
      state.number = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Thời điểm tải dữ liệu => Chưa có dữ liệu
    builder
      .addCase(getAllSize.pending, (state, action) => {
        state.status = "pending";
      })
      // Thời điểm đã có dữ liệu
      .addCase(getAllSize.fulfilled, (state, action) => {
        state.status = "successfully";
        // console.log(action.payload);
        // state.data = action.payload.data;
        state.totalElements = action.payload.data.totalElements;
        state.number = action.payload.data.number;
        state.size = action.payload.data.size;
        state.data = action.payload.data.content;
        state.numberOfElements = action.payload.data.numberOfElements;
      })
      .addCase(getAllSize.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // call api to add size
      .addCase(addSize.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(addSize.fulfilled, (state, action) => {
        state.status = "successfully";
        state.data = action.payload.data;
      })
      .addCase(addSize.rejected, (state, action) => {
        state.status = "failed";
        // console.log("error:", action);
        state.error = action.error.message;
      })

      .addCase(getAllSizesByNothing.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(getAllSizesByNothing.fulfilled, (state, action) => {
        state.status = "successfully";
        // console.log("vao:", action);
        state.data = action.payload.data;
        // console.log("action", action.payload.data);
      })
      .addCase(getAllSizesByNothing.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // call api to update color
      .addCase(updateSize.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(updateSize.fulfilled, (state, action) => {
        state.status = "successfully";
        state.data = action.payload.data;
      })
      .addCase(updateSize.rejected, (state, action) => {
        state.status = "failed";
        // console.log("error:", action);
        state.error = action.error.message;
      })

      //   // Delete product detail
      .addCase(deleteSize.fulfilled, (state, action) => {
        state.status = "successfully";
        state.data = state.data.filter((item) => item.id !== action.payload.id); // Remove deleted item
      })
      .addCase(deleteSize.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { changePageSize } = sizeSlice.actions;
export default sizeSlice.reducer;
