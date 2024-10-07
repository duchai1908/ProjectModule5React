import { createSlice } from "@reduxjs/toolkit";
import {
  addItemProductToCart,
  deleteAllCart,
  deleteCart,
  findAllCart,
} from "../../services/cartService";

const initialValue = {
  status: "idle",
  data: [],
  error: null,
};
export const cartSlice = createSlice({
  name: "cart",
  initialState: initialValue,
  reducers: {
    addProductToCart: (state, action) => {
      console.log("cartdata", action.payload);
      const itemExists = state.data.find(
        (item) => item.id === action.payload.id
      );
      if (itemExists) {
        // Nếu sản phẩm đã có trong giỏ hàng, tăng số lượng
        itemExists.quantity += action.payload.quantity;
      } else {
        // Nếu không, thêm sản phẩm mới vào giỏ hàng
        state.data.push(action.payload);
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(findAllCart.pending, (state, action) => {
        state.status = "pending";
        console.log("Pending");
      })
      .addCase(findAllCart.fulfilled, (state, action) => {
        console.log("action: " + action.payload);
        state.status = "successful";
        state.data = action.payload;
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
  },
});
export const { addProductToCart } = cartSlice.actions; // Xuất action addProductToCart
export default cartSlice.reducer;
