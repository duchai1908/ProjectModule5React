import { jsonAxios } from "../api";

export const addCoupon = (coupon) => {
    const reponse = jsonAxios.post("admin/coupon",coupon);
    return reponse;
  }
export const listCoupon = () => {
    const reponse = jsonAxios.get("admin/coupon");
    return reponse;
}
export const deleteCoupon = (id) => {
    const reponse = jsonAxios.delete(`admin/coupon/${id}`);
    return reponse;
}
export const changePageCoupon = (currentPage,size) => {
    const reponse = jsonAxios.get(`admin/coupon?page=${currentPage}&size=${size}`);
    return reponse;
}

