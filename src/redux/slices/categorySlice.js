import { createSlice } from "@reduxjs/toolkit";
import {
  addCategory,
  categoryStatusChange,
  deleteCategory,
  findAllCategory,
  updateCategory,
} from "../../services/categoryService";

const initialValue = {
  status: "idle",
  data: [],
  totalElements: 0,
  number: 0,
  size: 3,
  error: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState: initialValue,
  reducers: {
    changePageCategory: (state, action) => {
      state.number = action.payload;
    },
    clearError: (state) => {
      state.error = null;
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
        state.error = action.payload.message.name;
        console.log(action.payload.message.name);
      });

    // Xử lý thêm mới danh mục
    builder
      .addCase(addCategory.pending, (state) => {
        console.log("Adding category...");
        state.status = "pending";
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        console.log("Category added successfully", action.payload);
        state.status = "successfully";
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message.name;
        console.log("error", action.payload.message.name);
      });

    // Xử lý xóa danh mục
    builder
      .addCase(deleteCategory.pending, (state) => {
        state.status = "pending";
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.status = "successfully";

        state.data = state.data.filter(
          (category) => category.id !== action.payload.data.content.id
        ); // Xóa danh mục theo ID
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    // Xử lý cập nhật danh mục
    builder
      .addCase(updateCategory.pending, (state) => {
        state.status = "pending";
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.status = "successfully";
        const updatedCategory = action.payload; // Thay đổi để lấy payload trực tiếp

        const index = state.data.findIndex(
          (category) => category.id === updatedCategory.id // Cập nhật theo ID
        );

        if (index !== -1) {
          state.data[index] = updatedCategory; // Cập nhật danh mục theo ID
        }
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    // Thêm xử lý thay đổi status danh mục
    builder
      .addCase(categoryStatusChange.pending, (state) => {
        state.status = "pending"; // Đặt trạng thái khi đang xử lý
      })
      .addCase(categoryStatusChange.fulfilled, (state, action) => {
        state.data = state.data.map((category) =>
          category.id === action.payload.id
            ? { ...category, status: action.payload.status } // Cập nhật trạng thái chính xác từ server
            : category
        );
        state.status = "succeeded";
      })
      .addCase(categoryStatusChange.rejected, (state, action) => {
        state.status = "failed"; // Đặt trạng thái khi thất bại
        state.error = action.payload; // Gán lỗi vào state
      });
  },
});

export const { changePageCategory, clearError } = categorySlice.actions;

export default categorySlice.reducer;
