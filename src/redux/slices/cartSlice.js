import { createSlice } from "@reduxjs/toolkit";
import {
  addItemProductToCart,
  deleteAllCart,
  deleteCart,
  findAllCart,
  updateCartQuantity,
} from "../../services/cartService";

const initialValue = {
  status: "idle",
  data: [],
  error: null,
  totalPrice: 0,
  totalQuantity: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialValue,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(findAllCart.pending, (state, action) => {
        state.status = "pending";
        console.log("Pending");
      })
      .addCase(findAllCart.fulfilled, (state, action) => {
        console.log("API payload:", action.payload.data);
        console.log("State sau khi :", state.data);
        state.status = "successful";
        state.data = action.payload;

        const totalQuantity = action.payload.data.reduce(
          (total, item) => total + item.quantity,
          0
        );
        state.totalQuantity = totalQuantity;
        console.log(totalQuantity);
        // Tính tổng giá trị
        const totalPrice = action.payload.data.reduce(
          (total, item) => total + item.productDetail.price * item.quantity,
          0
        );
        state.totalPrice = totalPrice;
        console.log("Tổng giá trị:", totalPrice);
      })
      .addCase(findAllCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    // Xử lý xóa item cart
    builder
      .addCase(deleteCart.pending, (state) => {
        state.status = "pending";
      })
      .addCase(deleteCart.fulfilled, (state, action) => {
        console.log(action.payload);
        state.status = "successful";
        console.log(action.payload.data.id);
        // state.data = state.data.filter(
        //   (cart) => cart.id !== action.payload.data.content.id
        // );
      })
      .addCase(deleteCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    // xu ly xoa toan bo cart
    builder
      .addCase(deleteAllCart.pending, (state) => {
        state.status = "pending";
      })
      .addCase(deleteAllCart.fulfilled, (state, action) => {
        state.status = "successful";
      })
      .addCase(deleteAllCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    // add products to cart

    builder
      .addCase(addItemProductToCart.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(addItemProductToCart.fulfilled, (state, action) => {
        state.status = "successful";
      })
      .addCase(addItemProductToCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    // update products to cart
    builder
      .addCase(updateCartQuantity.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        state.status = "successful";
      })
      .addCase(updateCartQuantity.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default cartSlice.reducer;
