import { jsonAxios } from "../api";

export const addToWishlist = (id) => {
    const reponse = jsonAxios.post(`user/wishlist/${id}`);
    return reponse;
  }

export const getWishList = ()=>{
    const reponse = jsonAxios.get("user/wishlist");
    return reponse;
}

export const removeWishlist = (id)=>{
    const reponse = jsonAxios.delete(`user/wishlist/${id}`);
    return reponse;
}

export const removeAllWishlist = () => {
    const reponse = jsonAxios.delete("user/wishlist");
    return reponse;
}