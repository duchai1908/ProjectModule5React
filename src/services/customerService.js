import { createAsyncThunk } from "@reduxjs/toolkit";
import { formAxios, jsonAxios } from "../api";

export const findAllCustomers = createAsyncThunk(
  "customer/findAllCustomers",
  async ({ page, size, keySearch, sortField, sortDirection }) => {
    console.log("vao", page, size, keySearch, sortDirection);
    try {
      const response = await jsonAxios.get(
        `/admin/users?page=${page}&size=${size}&search=${keySearch}&sortField=${sortField}&sortDirection=${sortDirection}`
      );
      console.log("API response:", response.data); // In ra phản hồi API
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);
export const customerStatusChange = createAsyncThunk(
  "customer/customerStatusChange",
  async ({ userId }, thunkAPI) => {
    try {
      // Log the userId and URL for troubleshooting
      console.log(`Sending request to: /admin/users/${userId}`);
      const response = await jsonAxios.put(`/admin/users/${userId}`);
      console.log("success", response.data);
      return response.data; // Return updated customer data
    } catch (error) {
      console.error("Error during API call:", error.response); // Log full error response
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
