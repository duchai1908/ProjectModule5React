import { jsonAxios } from "../api";

export const register = (user) => {
  const response = jsonAxios.post("auth/register", user);
  return response;
};
