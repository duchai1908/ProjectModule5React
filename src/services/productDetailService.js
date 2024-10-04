import { createAsyncThunk } from "@reduxjs/toolkit";
import { formAxios, jsonAxios } from "../api";

export const findAllProductDetail = createAsyncThunk(
  "admin/productDetail/product",
  async ({ id, page, size }) => {
    const response = await jsonAxios.get(
      `/admin/productDetail/product/${id}?page=${page}&size=${size}`
    );
    return response.data;
  }
);

export const addProductDetail = createAsyncThunk(
  "admin/productDetail/add",
  async (newProductDetail) => {
    try {
      const response = await formAxios.post(
        `/admin/productDetail`, // Assuming this is the correct endpoint for adding
        newProductDetail
      );
      return response.data;
    } catch (error) {
      // console.log("loi");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const deleteProductDetail = createAsyncThunk(
  "admin/productDetail/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await jsonAxios.delete(`/admin/productDetail/${id}`);
      return { id, ...response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateProductDetail = createAsyncThunk(
  "admin/productDetail/update",
  async ({ productDetailId, formData }) => {
    console.log("object: ", formData);
    try {
      const response = await formAxios.put(
        `/admin/productDetail/${productDetailId}`,
        formData
      );
      return response.data;
    } catch (error) {
      // console.log("loi");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
