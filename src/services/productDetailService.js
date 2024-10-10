import { createAsyncThunk } from "@reduxjs/toolkit";
import { formAxios, jsonAxios } from "../api";
import { notification } from "antd";

export const findAllProductDetail = createAsyncThunk(
  "admin/productDetail/product",
  async ({ id, page, size }) => {
    const response = await jsonAxios.get(
      `/admin/productDetail/product/${id}?page=${page}&size=${size}`
    );
    return response.data;
  }
);

export const findAllProductDetailByNothing = createAsyncThunk(
  "admin/productDetail",
  async () => {
    const response = await jsonAxios.get(`/admin/productDetail`);
    return response.data;
  }
);

export const addProductDetail = createAsyncThunk(
  "admin/productDetail/add",
  async ({ formData, onClose, clearData }) => {
    try {
      const response = await formAxios.post(
        `/admin/productDetail`, // Assuming this is the correct endpoint for adding
        formData
      );
      onClose();
      clearData();
      return response.data;
    } catch (error) {
      notification.error({
        message: error?.response?.data?.message?.message,
        duration: 3,
      });
      onClose();
      clearData();
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
      console.log("error: ", error.response.data.message);
      notification.error({
        message: error.response.data.message.message,
        duration: 3,
      });
      return rejectWithValue(error.response?.data.message || error.message);
    }
  }
);

export const findProductDetailById = createAsyncThunk(
  "admin/productDetail/id",
  async ({ id }) => {
    try {
      const response = await formAxios.get(`/admin/productDetail/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const findProductDetailByProductId = createAsyncThunk(
  "productDetail/product/id",
  async ({ id }) => {
    try {
      const response = await formAxios.get(`/productDetail/productId/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
// /admin/productDetail/productId/1
