import { createSlice } from "@reduxjs/toolkit";
import {
  addProductDetail,
  deleteProductDetail,
  findAllProductDetail,
  findAllProductDetailByNothing,
  findProductDetailById,
  findProductDetailByProductId,
  updateProductDetail,
} from "../../services/productDetailService";
// import { addCategory, findAllCategory } from "../../services/categoryService";

const initialValue = {
  status: "idle",
  data: [],
  totalElements: 0,
  number: 0,
  size: 5,
  error: null,
};

const productDetailSlice = createSlice({
  name: "productDetail",
  initialState: initialValue,
  reducers: {
    changePageProductDetail: (state, action) => {
      state.number = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Thời điểm tải dữ liệu => Chưa có dữ liệu
    builder
      .addCase(findAllProductDetail.pending, (state, action) => {
        state.status = "pending";
      })
      // Thời điểm đã có dữ liệu
      .addCase(findAllProductDetail.fulfilled, (state, action) => {
        state.status = "successfully";
        console.log(action.payload);
        state.totalElements = action.payload.data.totalElements;
        state.number = action.payload.data.number;
        state.size = action.payload.data.size;
        state.data = action.payload.data.content;
      })
      .addCase(findAllProductDetail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Add product detail
      .addCase(addProductDetail.pending, (state) => {
        state.status = "pending";
      })
      .addCase(addProductDetail.fulfilled, (state, action) => {
        state.status = "successfully";
        state.data = [action.payload, ...state.data]; // Add to top of list
      })
      .addCase(addProductDetail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Delete product detail
      .addCase(deleteProductDetail.fulfilled, (state, action) => {
        state.status = "successfully";
        state.data = state.data.filter((item) => item.id !== action.payload.id); // Remove deleted item
      })
      .addCase(deleteProductDetail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      //update product detail
      .addCase(updateProductDetail.pending, (state) => {
        state.status = "pending";
      })
      .addCase(updateProductDetail.fulfilled, (state, action) => {
        state.status = "successfully";
        state.data = [action.payload, ...state.data]; // Add to top of list
      })
      .addCase(updateProductDetail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // call api method to have list
      .addCase(findAllProductDetailByNothing.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(findAllProductDetailByNothing.fulfilled, (state, action) => {
        state.status = "successfully";
        state.data = action.payload.data; // Add to top of list
      })
      .addCase(findAllProductDetailByNothing.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // call api to get product detail by id product detail
      .addCase(findProductDetailById.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(findProductDetailById.fulfilled, (state, action) => {
        state.status = "successfully";
        console.log("state", state.data);
        state.data = action.payload.data;
        console.log("action", action.payload.data);
      })
      .addCase(findProductDetailById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      //call api to get product detail by product id
      .addCase(findProductDetailByProductId.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(findProductDetailByProductId.fulfilled, (state, action) => {
        state.status = "successfully";
        state.data = action.payload.data;
        // console.log("action", action.payload.data);
      })
      .addCase(findProductDetailByProductId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { changePageProductDetail } = productDetailSlice.actions;
export default productDetailSlice.reducer;
