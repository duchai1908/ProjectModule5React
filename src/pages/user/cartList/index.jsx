import React, { useEffect } from "react";
import "./cartList.css";

import { Link } from "react-router-dom";
import CartItem from "../cartItem";
import { useDispatch, useSelector } from "react-redux";
import { deleteCart, findAllCart } from "../../../services/cartService";
export default function CartList({ closeCart }) {
  const { data: listCart, status } = useSelector((state) => state.cart);
  // console.log("listCart", listCart, status);
  const dispatch = useDispatch();
  useEffect(() => {
    // Gọi API lấy danh sách cart
    if (status === "idle") {
      dispatch(findAllCart());
    }
  }, [status, dispatch]);

  // Hàm xóa sản phẩm
  const handleDeleteItem = (id) => {
    dispatch(deleteCart(id)).then(() => {
      dispatch(findAllCart());
    }); // Gọi action xóa sản phẩm khỏi giỏ hàng
  };
  return (
    <>
      <div className="cart_container">
        <div className="cart_box">
          <div className="cart_header">
            <p>Your cart</p>
            <div className="cart_close" onClick={closeCart}>
              <i class="bx bx-x"></i>
            </div>
          </div>
          <div className="cart_line"></div>
          <div className="cart_items">
            {status === "pending" && <p>Loading...</p>}
            {status === "successful" && listCart?.data?.data.length > 0 ? (
              listCart.data.data.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onDelete={() => handleDeleteItem(item.id)}
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
