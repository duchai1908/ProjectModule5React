import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "../slices/categorySlice";
import customerSlice from "../slices/customerSlice";

const store = configureStore({
  reducer: {
    category: categorySlice,
    customer: customerSlice,
  },
});
export default store;
