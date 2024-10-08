import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
  status: "idle",
  data: [],
  error: null,
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState: initialValue,
  reducers: {},
});
export default checkoutSlice.reducer;
