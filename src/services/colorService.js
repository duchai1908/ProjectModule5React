import { createAsyncThunk } from "@reduxjs/toolkit";
import { formAxios, jsonAxios } from "../api";
import { notification } from "antd";

export const getAllColors = createAsyncThunk(
  "admin/color/listColor",
  async ({ page, size, search, sortOption }) => {
    const response = await jsonAxios.get(
      `/admin/color/listColor?page=${page}&size=${size}&search=${search}&sortOption=${sortOption}`
    );
    return response.data;
  }
);

export const addColor = createAsyncThunk(
  "admin/color/{color}",
  async ({ color }) => {
    const response = await jsonAxios.post(`/admin/color`, { color });
    console.log(response.data);
    return response.data;
  }
);

export const getAllColorsByNothing = createAsyncThunk(
  "admin/color",
  async () => {
    const response = await jsonAxios.get(`/admin/color`);
    return response.data;
  }
);

export const updateColor = createAsyncThunk(
  "admin/color/{id}",
  async ({ id, color }) => {
    const response = await jsonAxios.put(`/admin/color/${id}`, { color });
    console.log(response.data);
    return response.data;
  }
);

export const deleteColor = createAsyncThunk(
  "admin/color/id",
  async (id, { rejectWithValue }) => {
    try {
      const response = await jsonAxios.delete(`/admin/color/${id}`);
      return { id, ...response.data };
    } catch (error) {
      console.log(error);
      notification.error({
        message: error.response?.data.message,
        duration: 3,
      });
      // return rejectWithValue(error.response?.data || error.message);
    }
  }
);
