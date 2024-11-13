import { createAsyncThunk } from "@reduxjs/toolkit";
import { jsonAxios } from "../api";

export const findAllOrderByUser = createAsyncThunk(
  "admin/order",
  async ({ page, size, searchTerm, sortField, sortDirection }) => {
    // try {
    console.log("vao");
    const response = await jsonAxios.get(
      `/admin/orders?page=${page}&size=${size}&search=${searchTerm}&sortField=${sortField}&sortDirection=${sortDirection}`
    );
    console.log("Order", response.data);
    return response.data;
    // } catch (err) {
    //   console.log(err);
    // }
  }
);
// change status
export const updateStatusOrder = createAsyncThunk(
  "/admin/orders/updateStatus",
  async ({ orderId, newStatus }) => {
    try {
      // Gọi API để cập nhật trạng thái của đơn hàng
      const response = await jsonAxios.put(
        `/admin/orders/${orderId}/${newStatus}`
      );
      console.log(response.data);
      return response.data; // Trả về dữ liệu phản hồi
    } catch (err) {
      console.error("Cập nhật trạng thái đơn hàng thất bại:", err);
      throw err; // Ném lỗi để Redux có thể xử lý
    }
  }
);
