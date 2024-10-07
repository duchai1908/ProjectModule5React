import React, { useEffect, useState } from "react";
import "./cartList.css";

import { Link } from "react-router-dom";
import CartItem from "../cartItem";
import { useDispatch, useSelector } from "react-redux";
import { findAllCart } from "../../../services/cartService";

export default function CartList({ closeCart }) {
  const { data: listCart, status } = useSelector((state) => state.cart);
  console.log("listCart", listCart.data, status);
  const dispatch = useDispatch();
  useEffect(() => {
    // Gọi API lấy danh sách cart
    if (status === "idle") {
      dispatch(findAllCart());
    }
  }, [status, dispatch]);
  return (
    <>
      <div className="cart_container">
        <div className="cart_box">
          <div className="cart_header">
            <p>your cart</p>
            <div className="cart_close" onClick={closeCart}>
              <i class="bx bx-x"></i>
            </div>
          </div>
          <div className="cart_line"></div>
          <div className="cart_items">
            {/* Kiểm tra trạng thái trước khi render */}
            {status === "pending" && <p>Loading...</p>}
            {status === "successful" && listCart?.data?.length > 0 ? ( // Check if data exists and has items
              listCart.data.map((item) => (
                <CartItem
                  key={item.id}
                  item={{
                    name: item.productDetail.name,
                    quantity: item.quantity,
                    price: item.productDetail.price,
                    image: item.productDetail.image, // Assuming the image is available
                  }}
                />
              ))
            ) : (
              <p>No items in cart</p> // If no items present
            )}
            {status === "failed" && <p>Error loading cart items</p>}
          </div>

          <div className="cart_footer">
            <div className="cart_line"></div>
            <div className="cart_total">
              <h4 className="cart_total_title">Subtotal:</h4>
              <span className="cart_price_total">20.000.000 vnd</span>
            </div>
            <div className="cart_line"></div>
            <div className="cart_button">
              <button type="button" className="cart_button-item">
                <Link
                  onClick={closeCart}
                  to="/cart-detail"
                  className="cart_link"
                >
                  View cart
                </Link>
              </button>
              <button type="button" className="cart_button-item">
                <Link onClick={closeCart} to="/checkout" className="cart_link">
                  Check out
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
