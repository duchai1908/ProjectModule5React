import axios from "axios";
import Cookies from "js-cookie";

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

const handleAddInterceptors = (instance) => {
  // request
  instance.interceptors.request.use(
    (config) => {
      // const cookies = new Cookies();

      const data = JSON.parse(Cookies.get("token")|| 'null') ;


      // console.log("data = " + data);
      if (data) {
        config.headers.Authorization = `Bearer ${data.data.accessToken}`;
      }
      return config;
    },
    (err) => Promise.reject(err)
  );
  // response
};

handleAddInterceptors(jsonAxios);
handleAddInterceptors(formAxios);
