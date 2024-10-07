import { createAsyncThunk } from "@reduxjs/toolkit";
import { formAxios, jsonAxios } from "../api";
console.log("kdhfldj");
// Đăng ký người dùng
export const register = createAsyncThunk("auth/register", async (user) => {
  const response = await jsonAxios.post("auth/register", user);
  return response.data; // Trả về dữ liệu từ phản hồi
});

// Kiểm tra phản hồi từ API
console.log("vao day k?");
export const loginUser = createAsyncThunk(
  "auth/loginUser",

  async (formLogin, { rejectWithValue }) => {
    try {
      console.log(formLogin);
      const response = await jsonAxios.post(`/auth/sign-in`, formLogin);
      const token = response.data.data.accessToken;
      localStorage.setItem("token", token);
      console.log("API Response:", response.data.data.accessToken); // Kiểm tra phản hồi ở đây
      return response.data.data; // Đảm bảo rằng đường dẫn này là chính xác
    } catch (error) {
      console.error("Error during login:", error);
      return rejectWithValue(error.response.data.data);
    }
  }
);
console.log(loginUser);
