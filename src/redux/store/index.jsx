import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "../slices/categorySlice";
import authSlice from "../slices/authSlice";

import customerSlice from "../slices/customerSlice";

import productDetailSlice from "../slices/productDetailSlice";
import productSlice from "../slices/productSlice";

import cartSlice from "../slices/cartSlice";

const store = configureStore({
  reducer: {
    category: categorySlice,
    auth: authSlice,
    customer: customerSlice,
    productDetail: productDetailSlice,
    product: productSlice,
    cart: cartSlice,
  },
});
export default store;
