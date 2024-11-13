import { createSlice } from "@reduxjs/toolkit";
import {
  findAllProductWithCondition,
  getProductById,
} from "../../services/productService";

// import { addCategory, findAllCategory } from "../../services/categoryService";

const initialValue = {
  status: "idle",
  data: [],
  totalElements: 0,
  number: 0,
  size: 3,
  error: null,
};
//page, size, search, minPrice, maxPrice, sortOption

const productSlice = createSlice({
  name: "product",
  initialState: initialValue,
  reducers: {
    changePageProduct: (state, action) => {
      state.number = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Thời điểm tải dữ liệu => Chưa có dữ liệu
    builder
      .addCase(findAllProductWithCondition.pending, (state, action) => {
        state.status = "pending";
      })
      // Thời điểm đã có dữ liệu
      .addCase(findAllProductWithCondition.fulfilled, (state, action) => {
        state.status = "successfully";
        // console.log(action.payload);
        state.totalElements = action.payload.data.totalElements;
        state.number = action.payload.data.number;
        state.size = action.payload.data.size;
        state.data = action.payload.data.content;
      })
      .addCase(findAllProductWithCondition.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      //call api to get product by product id
      .addCase(getProductById.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.status = "successfully";
        state.data = action.payload.data;
        // console.log("action", action);
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { changePageProduct } = productSlice.actions;
export default productSlice.reducer;
