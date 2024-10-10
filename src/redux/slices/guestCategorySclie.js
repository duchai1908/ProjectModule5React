import { createSlice } from "@reduxjs/toolkit";
import { getAllCategories } from "../../services/categoryService";

const initialValue = {
  status: "idle",
  data: [],
  error: null,
};

const guestCategorySlice = createSlice({
  name: "category",
  initialState: initialValue,
  reducers: {},
  extraReducers: (builder) => {
    // Thời điểm tải dữ liệu => Chưa có dữ liệu
    builder

      .addCase(getAllCategories.pending, (state, action) => {
        console.log("start");
        state.status = "pending";
      })
      // Thời điểm đã có dữ liệu
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.status = "successfully";
        state.data = action.payload;
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});
export default guestCategorySlice.reducer;
