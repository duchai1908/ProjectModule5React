import { createAsyncThunk } from "@reduxjs/toolkit";
import { formAxios, jsonAxios } from "../api";

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (formData, thunkAPI) => {
    try {
      const response = await formAxios.put(
        `/user/information/change`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("User information updated successfully:", response.data);
      return response.data; // Trả về dữ liệu sau khi cập nhật
    } catch (error) {
      console.error(
        "Error updating user information:",
        error.response?.data || error.message
      );
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const changePassword = createAsyncThunk(
  "user/changePassword",
  async (changePasswordRequest, thunkAPI) => {
    try {
      console.log("vao");
      const response = await jsonAxios.put(
        `user/information/changePassword`,
        changePasswordRequest
      );
      console.log("User information updated successfully:", response.data);
      return response.data; // Trả về dữ liệu người dùng sau khi cập nhật
    } catch (error) {
      console.log(error.response.data);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
