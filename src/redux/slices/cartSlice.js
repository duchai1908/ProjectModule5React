import { createSlice } from "@reduxjs/toolkit";
import { findAllCart } from "../../services/cartService";

const initialValue = {
  status: "idle",
  data: [],

  error: null,
};
export const cartSlice = createSlice({
  name: "cart",
  initialState: initialValue,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(findAllCart.pending, (state, action) => {
        state.status = "pending";
        console.log("Pending");
      })
      .addCase(findAllCart.fulfilled, (state, action) => {
        console.log("action: " + action.payload);
        state.status = "successful";
        state.data = action.payload;
      })
      .addCase(findAllCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});
export default cartSlice.reducer;
