import { createAsyncThunk } from "@reduxjs/toolkit";
import { jsonAxios } from "../api";

export const findAllAddress = createAsyncThunk("user/address", async () => {
  console.log("Fetching cart...");
  const response = await jsonAxios.get(`/user/address`);
  console.log("repons", response.data);
  return response.data;
});

export const addAddress = (data) => {
  const reponse = jsonAxios.post("user/address",data);
  return reponse;
}

export const listAddress = () =>{
  const reponse = jsonAxios.get("user/address");
  return reponse;
}

export const deleteAddress = (id) => {
  const reponse = jsonAxios.delete(`user/address/${id}`);
  return reponse;
}
