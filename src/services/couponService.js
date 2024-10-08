import { createAsyncThunk } from "@reduxjs/toolkit";
import { jsonAxios } from "../api";

export const getCoupon = createAsyncThunk("user/coupon", async (code) => {
  console.log("Fetching cart...");
  const response = await jsonAxios.get(`/user/coupon/${code}`);
  console.log("repons", response.data);
  return response.data;
});
