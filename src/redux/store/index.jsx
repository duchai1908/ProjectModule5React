import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "../slices/categorySlice";
import authSlice from "../slices/authSlice";

const store = configureStore({
  reducer: {
    category: categorySlice,
    auth: authSlice,
  },
});
export default store;
