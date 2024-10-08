import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "../slices/categorySlice";
import authSlice from "../slices/authSlice";

import customerSlice from "../slices/customerSlice";

import productDetailSlice from "../slices/productDetailSlice";
import productSlice from "../slices/productSlice";
import colorSlice from "../slices/colorSlice";

import cartSlice from "../slices/cartSlice";
import sizeSlice from "../slices/sizeSlice";
import productAndImageAndSizeAndColor from "../slices/productImageColorSizeSlice";
import productRelateSlice from "../slices/productRelateSlice";
import productDetailAndImageSlice from "../slices/productDetailAndImageSlice";

const store = configureStore({
  reducer: {
    category: categorySlice,
    auth: authSlice,
    customer: customerSlice,
    productDetail: productDetailSlice,
    product: productSlice,
    colorStore: colorSlice,
    cart: cartSlice,
    sizeStore: sizeSlice,
    PISC: productAndImageAndSizeAndColor,
    productRelate: productRelateSlice,
    PDI: productDetailAndImageSlice,
  },
});
export default store;
