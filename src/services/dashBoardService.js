import { createAsyncThunk } from "@reduxjs/toolkit";
import { jsonAxios } from "../api";

export const getDashboard = createAsyncThunk("admin/getDashboard", async () => {
  try {
    const response = await jsonAxios.get(`/admin/dashboard`);
    console.log("Dashboard", response.data);
    return response.data;
  } catch (error) {
    console.log("Dashboard", error.response);
  }
});
