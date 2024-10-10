import { createAsyncThunk } from "@reduxjs/toolkit";
import { formAxios, jsonAxios } from "../api";

export const findAllProductWithCondition = createAsyncThunk(
  // "admin/products",
  // async ({ page, size, search, minPrice, maxPrice, sortOption, colorId }) => {
  //   console.log("colorId: ", colorId);
  //   console.log("search: ", search);
  //   console.log("minPrice: ", minPrice);
  //   console.log("maxPrice: ", maxPrice);
  //   console.log("sortOption: ", sortOption);
  //   const response = await jsonAxios.get(
  //     `/admin/products?page=${page}&size=${size}&search=${search}&sortOption=${sortOption}&minPrice=${minPrice}&maxPrice=${maxPrice}&color=${colorId}`
  //   );
  //   console.log(response.data);
  //   return response.data;
  //   // if (colorId) {
  //   //   console.log("vao 1");

  //   // } else {
  //   //   console.log("vao 2");
  //   //   const response = await jsonAxios.get(
  //   //     // `/admin/products?page=${page}&size=${size}&search=${search}&sortOption=${sortOption}&minPrice=${minPrice}&maxPrice=${maxPrice}`
  //   //     `/admin/products?page=${page}&size=${size}`
  //   //   );
  //   //   console.log(response.data);
  //   //   return response.data;
  //   // }
  // }
  "product",
  async ({ page, size, search, sortOption }) => {
    // console.log("search: ", search);
    // console.log("sortOption: ", sortOption);
    const response = await jsonAxios.get(
      `/admin/products?page=${page}&size=${size}&productName=${search}&sortOption=${sortOption}`
    );
    // console.log(response.data);
    return response.data;
  }
);

export const getProductById = createAsyncThunk("product/id", async ({ id }) => {
  try {
    const response = await formAxios.get(`/admin/products/${id}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

// http://localhost:8080/api/v1/admin/products?minPrice=0&maxPrice=120000&sortOption=lowToHigh
