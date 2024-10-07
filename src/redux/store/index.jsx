import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "../slices/categorySlice";

import customerSlice from "../slices/customerSlice";

import productDetailSlice from "../slices/productDetailSlice";
import productSlice from "../slices/productSlice";
import colorSlice from "../slices/colorSlice";

const store = configureStore({
  reducer: {
    category: categorySlice,
    customer: customerSlice,
    productDetail: productDetailSlice,
    product: productSlice,
    colorStore: colorSlice,
  },
});
export default store;
