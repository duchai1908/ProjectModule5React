import { createAsyncThunk } from "@reduxjs/toolkit";
import { jsonAxios } from "../api";

export const findAllCategory = createAsyncThunk("admin/category", async () => {
  console.log("vao");
  const response = await jsonAxios.get("/admin/category");
  return response.data;
});
