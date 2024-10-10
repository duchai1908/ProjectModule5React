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
import couponSlice from "../slices/couponSlice";
import addressSlice from "../slices/addressSlice";
import productDetailAndImageSlice from "../slices/productDetailAndImageSlice";
import checkoutSlice from "../slices/checkoutSlice";
import userOrderSlice from "../slices/userOrderSlice";
import userSlice from "../slices/userSlice";
import adminOrderSlice from "../slices/adminOrderSlice";
import dashBroadSlice from "../slices/dashBroadSlice";

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
    coupon: couponSlice,
    address: addressSlice,
    PDI: productDetailAndImageSlice,
    checkout: checkoutSlice,
    userOrder: userOrderSlice,
    user: userSlice,
    adminOrder: adminOrderSlice,
    dashBoard: dashBroadSlice,
  },
});
export default store;
