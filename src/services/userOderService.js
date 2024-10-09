import { createAsyncThunk } from "@reduxjs/toolkit";
import { formAxios, jsonAxios } from "../api";
import { notification } from "antd";

export const getAllOrderByUser = createAsyncThunk(
  "/user/orders",
  async ({ page, size }) => {
    const response = await jsonAxios.get(
      `/user/orders?page=${page}&size=${size}`
    );
    return response.data;
  }
);

export const cancelOrderByUser = createAsyncThunk(
  "/user/orders",
  async ({ id }) => {
    const response = await jsonAxios.put(`/user/orders/cancel/${id}`);
    return response.data;
  }
);
