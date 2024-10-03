import { createAsyncThunk } from "@reduxjs/toolkit";
import { formAxios, jsonAxios } from "../api";

export const findAllCategory = createAsyncThunk(
  "admin/category",
  async ({ page, size }) => {
    console.log("vao");
    const response = await jsonAxios.get(
      `/admin/category?page=${page}&size=${size}`
    );
    return response.data;
  }
);

export const addCategory = createAsyncThunk(
  "category/addCategory",
  async (newCategory, { rejectWithValue }) => {
    try {
      const response = await formAxios.post("/admin/category", newCategory);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
