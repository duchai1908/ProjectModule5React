import { createAsyncThunk } from "@reduxjs/toolkit";
import { formAxios, jsonAxios } from "../api";
// render all cart
export const findAllCart = createAsyncThunk("user/cart", async () => {
  console.log("Fetching cart...");
  const response = await jsonAxios.get(`/user/cart`);
  console.log("repons", response.data);
  return response.data;
});

// delete item cart

export const deleteCart = createAsyncThunk(
  "cart/delete",
  async (cartId, thunkAPI) => {
    try {
      const response = await jsonAxios.delete(`/user/cart/${cartId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

//delete all cart
export const deleteAllCart = createAsyncThunk(
  "cart/AllDelete",
  async (thunkAPI) => {
    try {
      const response = await jsonAxios.delete(`/user/cart/deleteAllCart`);
      console.log(response.data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

//add product Detail to cartList

export const addItemProductToCart = createAsyncThunk(
  "cart/addProductToCart",
  async (newProductToCart, { rejectWithValue }) => {
    try {
      const response = await jsonAxios.post(`/user/cart`, newProductToCart);
      console.log(response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
