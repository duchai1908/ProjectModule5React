import { createSlice } from "@reduxjs/toolkit";
import { getAllPISC } from "../../services/piscService";

const initialValue = {
  status: "idle",
  data: [],
  totalElements: 0,
  number: 0,
  size: 5,
  error: null,
};
const productAndImageAndSizeAndColor = createSlice({
  name: "productAndImageAndSizeAndColor",
  initialState: initialValue,
  reducers: {
    changePagePISC: (state, action) => {
      state.number = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Thời điểm tải dữ liệu => Chưa có dữ liệu
    builder

      // call api method to have list
      .addCase(getAllPISC.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(getAllPISC.fulfilled, (state, action) => {
        state.status = "successfully";
        state.data = action.payload.data; // Add to top of list
      })
      .addCase(getAllPISC.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { changePagePISC } = productAndImageAndSizeAndColor.actions;
export default productAndImageAndSizeAndColor.reducer;
