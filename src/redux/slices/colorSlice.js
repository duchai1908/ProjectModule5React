import { createSlice } from "@reduxjs/toolkit";
import {
  addColor,
  deleteColor,
  getAllColors,
  getAllColorsByNothing,
  updateColor,
} from "../../services/colorService";

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

const colorSlice = createSlice({
  name: "color",
  initialState: initialValue,
  reducers: {
    changePageColor: (state, action) => {
      state.number = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Thời điểm tải dữ liệu => Chưa có dữ liệu
    builder
      .addCase(getAllColors.pending, (state, action) => {
        state.status = "pending";
      })
      // Thời điểm đã có dữ liệu
      .addCase(getAllColors.fulfilled, (state, action) => {
        state.status = "successfully";
        // console.log(action.payload);
        // state.data = action.payload.data;
        state.totalElements = action.payload.data.totalElements;
        state.number = action.payload.data.number;
        state.size = action.payload.data.size;
        state.data = action.payload.data.content;
        state.numberOfElements = action.payload.data.numberOfElements;
      })
      .addCase(getAllColors.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // call api to add color
      .addCase(addColor.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(addColor.fulfilled, (state, action) => {
        state.status = "successfully";
        state.data = action.payload.data;
      })
      .addCase(addColor.rejected, (state, action) => {
        state.status = "failed";
        // console.log("error:", action);
        state.error = action.error.message;
      })

      .addCase(getAllColorsByNothing.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(getAllColorsByNothing.fulfilled, (state, action) => {
        state.status = "successfully";
        // console.log("vao:", action);
        state.data = action.payload.data;
        // console.log("action", action.payload.data);
      })
      .addCase(getAllColorsByNothing.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // call api to update color
      .addCase(updateColor.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(updateColor.fulfilled, (state, action) => {
        state.status = "successfully";
        state.data = action.payload.data;
      })
      .addCase(updateColor.rejected, (state, action) => {
        state.status = "failed";
        // console.log("error:", action);
        state.error = action.error.message;
      })

      // Delete product detail
      .addCase(deleteColor.fulfilled, (state, action) => {
        state.status = "successfully";
        state.data = state.data.filter((item) => item.id !== action.payload.id); // Remove deleted item
      })
      .addCase(deleteColor.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { changePageColor } = colorSlice.actions;
export default colorSlice.reducer;
