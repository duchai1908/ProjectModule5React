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
export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (categoryId, thunkAPI) => {
    try {
      const response = await jsonAxios.delete(`/admin/category/${categoryId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async ({ categoryId, formData }, thunkAPI) => {
    try {
      const response = await formAxios.put(
        `/admin/category/${categoryId}`,
        formData
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
