import { createAsyncThunk } from "@reduxjs/toolkit";
import { jsonAxios } from "../api";
import Cookies from "js-cookie";

export const register = (user) => {
  const response = jsonAxios.post("auth/sign-up", user);
  return response;
};

export const login = createAsyncThunk("auth/sign-in", async (user) => {
  const response = await jsonAxios.post("auth/sign-in", user);

  Cookies.set("token", JSON.stringify(response.data));
  return response;
});

/**
 * Hàm lấy dữ liệu từ Cookie và lưu vào redux
 */
export const loadUserFromCookie = createAsyncThunk(
  "auth/loadUserFromCookie",
  async (token) => {
    return token;
  }
);
