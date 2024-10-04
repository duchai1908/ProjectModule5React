import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;
export const jsonAxios = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});
// export default jsonAxios;
export const formAxios = axios.create({
  baseURL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
