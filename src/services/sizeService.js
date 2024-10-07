import { createAsyncThunk } from "@reduxjs/toolkit";
import { formAxios, jsonAxios } from "../api";
import { notification } from "antd";

export const getAllSize = createAsyncThunk(
  "admin/size/listSize",
  async ({ page, size, search, sortOption }) => {
    const response = await jsonAxios.get(
      `/admin/size/listSizes?page=${page}&size=${size}&search=${search}&sortOption=${sortOption}`
    );
    return response.data;
  }
);

export const addSize = createAsyncThunk(
  "admin/size/{size}",
  async ({ size }) => {
    try {
      const response = await jsonAxios.post(`/admin/size`, { size: size });
      console.log(response.data);
      return response.data;
    } catch (e) {
      notification.error({
        message: error.response?.data.message,
        duration: 3,
      });
    }
  }
);

export const getAllSizesByNothing = createAsyncThunk("admin/size", async () => {
  const response = await jsonAxios.get(`/admin/size`);
  return response.data;
});

export const deleteSize = createAsyncThunk(
  "admin/size/id",
  async (id, { rejectWithValue }) => {
    try {
      const response = await jsonAxios.delete(`/admin/size/${id}`);
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

export const updateSize = createAsyncThunk(
  "admin/size/{id}",
  async ({ id, size }) => {
    const response = await jsonAxios.put(`/admin/size/${id}`, { size });
    console.log(response.data);
    return response.data;
  }
);
