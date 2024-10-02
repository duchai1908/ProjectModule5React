import React from "react";
import "./cartList.css";

import { Link } from "react-router-dom";
import CartItem from "../cartItem";

export default function CartList() {
  return (
    <>
      <div className="cart_container">
        <div className="cart_box">
          <div className="cart_header">
            <p>your cart</p>
            <div className="cart_line"></div>
          </div>

          <div className="cart_items">
            {/* cartItem  start*/}
            <CartItem />
            <CartItem />
            <CartItem />
            <CartItem />
            {/* cartItem end*/}
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
                <Link to="/cart-detail" className="cart_link">
                  View cart
                </Link>
              </button>
              <button type="button" className="cart_button-item">
                <Link className="cart_link">Check out</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
