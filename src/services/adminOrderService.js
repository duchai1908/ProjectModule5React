import { createAsyncThunk } from "@reduxjs/toolkit";

export const findAllOrderByUser = createAsyncThunk(
  "/admin/orders",
  async ({ page, size }) => {
    const response = await jsonAxios.get(
      `/admin/orders?page=${page}&size=${size}`
    );
    return response.data;
  }
);

export const updateOrderByUser = createAsyncThunk(
  "/admin/orders",
  async ({ id }) => {
    const response = await jsonAxios.put(`/admin/orders/cancel/${id}`);
    return response.data;
  }
);
