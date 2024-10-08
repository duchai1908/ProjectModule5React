import { createAsyncThunk } from "@reduxjs/toolkit";
import { jsonAxios } from "../api";

export const findAllAddress = createAsyncThunk("user/address", async () => {
  console.log("Fetching cart...");
  const response = await jsonAxios.get(`/user/address`);
  console.log("repons", response.data);
  return response.data;
});
