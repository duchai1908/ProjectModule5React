import { createAsyncThunk } from "@reduxjs/toolkit";
import { formAxios, jsonAxios } from "../api";
import { notification } from "antd";

export const getAllPDI = createAsyncThunk(
  "productDetail/id",
  async ({ productDetailId }) => {
    const response = await jsonAxios.get(
      `user/productDetail/${productDetailId}`
    );
    return response.data;
  }
);
