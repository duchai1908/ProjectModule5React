import { createAsyncThunk } from "@reduxjs/toolkit";
import { formAxios, jsonAxios } from "../api";
import { notification } from "antd";

export const getAllPISC = createAsyncThunk(
  "product/size",
  async ({ productId }) => {
    const response = await jsonAxios.get(`/product/${productId}`);
    return response.data;
  }
);
