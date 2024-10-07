import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "../slices/categorySlice";

import customerSlice from "../slices/customerSlice";

import productDetailSlice from "../slices/productDetailSlice";
import productSlice from "../slices/productSlice";
import authSlice from "../slices/authSlice";
import cartSlice from "../slices/cartSlice";

const store = configureStore({
  reducer: {
    category: categorySlice,
    customer: customerSlice,
    productDetail: productDetailSlice,
    product: productSlice,
    auth: authSlice,
    cart: cartSlice,
  },
});
export default store;
