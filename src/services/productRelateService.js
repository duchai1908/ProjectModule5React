import { createAsyncThunk } from "@reduxjs/toolkit";
import { formAxios, jsonAxios } from "../api";
import { notification } from "antd";

export const getAllProductRelateByCateId = createAsyncThunk(
  "admin/relatedProduct/cateId",
  async ({ id }) => {
    const response = await jsonAxios.get(`/product/relatedProduct/${id}`);
    console.log("list related products", response);
    return response.data;
  }
);
