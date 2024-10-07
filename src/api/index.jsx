import axios from "axios";

console.log("Starting");
const baseURL = import.meta.env.VITE_BASE_URL;

export const jsonAxios = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

//

export const formAxios = axios.create({
  baseURL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
