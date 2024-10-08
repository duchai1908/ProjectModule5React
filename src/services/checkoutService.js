import { createAsyncThunk } from "@reduxjs/toolkit";
import { jsonAxios } from "../api";

// export const getCoupon = createAsyncThunk("user/coupon", async () => {
//   console.log("Fetching cart...");
//   const response = await jsonAxios.get(`/user/coupon`);
//   console.log("repons", response.data);
//   return response.data;
// });
