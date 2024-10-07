import { createAsyncThunk } from "@reduxjs/toolkit";
import { jsonAxios } from "../api";

export const findAllCart = createAsyncThunk("user/cart", async () => {
  console.log("Fetching cart...");
  const response = await jsonAxios.get(`/user/cart`);
  return response;
});
