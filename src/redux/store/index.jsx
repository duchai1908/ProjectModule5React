import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "../slices/categorySlice";
import productDetailSlice from "../slices/productDetailSlice";
import productSlice from "../slices/productSlice";

const store = configureStore({
  reducer: {
    category: categorySlice,
    productDetail: productDetailSlice,
    product: productSlice,
  },
});
export default store;
