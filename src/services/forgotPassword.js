import { jsonAxios } from "../api";
export const forgotPasword = (data) => {
    const reponse = jsonAxios.post("forgotPassword",data);
    return reponse;
  }