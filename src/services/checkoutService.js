import { createAsyncThunk } from "@reduxjs/toolkit";
import { jsonAxios } from "../api";

// Định nghĩa hàm bất đồng bộ để gọi API thêm đơn hàng
export const addOrder = createAsyncThunk(
  "checkout/addOrder",
  async (orderRequest, { rejectWithValue }) => {
    try {
      const response = await jsonAxios.post(`/user/orders`, orderRequest);
      console.log("data: ", response.data);
      return response.data; // Trả về dữ liệu từ server
    } catch (error) {
      console.error("Error while adding order:", error); // Log lỗi
      return rejectWithValue(error.response?.data || "Failed to add order"); // Trả về lỗi
    }
  }
);
