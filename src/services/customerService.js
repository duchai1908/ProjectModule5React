import { createAsyncThunk } from "@reduxjs/toolkit";
import { jsonAxios } from "../api";

export const findAllCustomers = createAsyncThunk(
  "customer/findAllCustomers",
  async ({ page, size, keySearch }) => {
    console.log("vao", page, size, keySearch);
    const response = await jsonAxios.get(
      `/admin/users?page=${page}&size=${size}&search=${keySearch}`
    );
    console.log(response.data);
    return response.data;
  }
);
