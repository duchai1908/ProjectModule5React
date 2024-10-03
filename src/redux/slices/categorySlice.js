import { createSlice } from "@reduxjs/toolkit";
import { addCategory, findAllCategory } from "../../services/categoryService";

const initialValue = {
  status: "idle",
  data: [],
  totalElements: 0,
  number: 0,
  size: 5,
  error: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState: initialValue,
  reducers: {
    changePageCategory: (state, action) => {
      state.number = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Thời điểm tải dữ liệu => Chưa có dữ liệu
    builder
      .addCase(findAllCategory.pending, (state, action) => {
        state.status = "pending";
      })
      // Thời điểm đã có dữ liệu
      .addCase(findAllCategory.fulfilled, (state, action) => {
        state.status = "successfully";
        console.log(action.payload);
        state.totalElements = action.payload.data.totalElements;
        state.number = action.payload.data.number;
        state.size = action.payload.data.size;
        state.data = action.payload.data.content;
      })
      .addCase(findAllCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    // Xử lý thêm mới danh mục
    // builder
    //   .addCase(addCategory.pending, (state) => {
    //     console.log("Adding category...");
    //     state.status = "pending";
    //   })
    //   .addCase(addCategory.fulfilled, (state, action) => {
    //     console.log("Category added successfully", action.payload);
    //     state.status = "successfully";
    //     state.data.push(action.payload); // Thêm danh mục mới vào danh sách
    //   })
    //   .addCase(addCategory.rejected, (state, action) => {
    //     console.error("Failed to add category", action.payload);
    //     state.status = "failed";
    //     state.error = action.payload; // Lấy lỗi trả về từ server
    //   });
  },
});

export const { changePageCategory } = categorySlice.actions;
export default categorySlice.reducer;
