import { jsonAxios } from "../api";

export const addReviewProduct = (review) => {
    const reponse = jsonAxios.post("user/rating",review);
    return reponse;
  }

export const addAllReviewProduct = (id) =>{
    const reponse = jsonAxios.get(`product/rating/${id}`);
    return reponse;
}

export const countRating = (productId) =>{
  const reponse = jsonAxios.get(`product/totalCountRating/${productId}`);
  return reponse;
}

export const getAllRating = (page,size,search) => {
  const reponse = jsonAxios.get(`admin/rating?page=${page}&size=${size}&search=${search}`);
  return reponse;
}

export const deleteRating = (id) => {
  const reponse = jsonAxios.delete(`admin/rating/${id}`);
  return reponse;
}