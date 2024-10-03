import React from "react";

export default function CartItem() {
  return (
    <>
      <div className="cart_item">
        <div className="cart_img-product">
          <div className="cart_item-close">
            <i class="bx bx-x"></i>
          </div>
          <img
            src="https://minimalin-demo.myshopify.com/cdn/shop/files/watch_compact.png?v=1692459788"
            alt="F. Ultimate Smart Watch"
          />
        </div>
        <div className="cart_content">
          <h4 className="cart_title">F. Ultimate Smart Watch</h4>
          <div className="cart_content-quantity">
            <div className="cart_quantity">
              <span className="cart_quantity-detail">1</span>
              <i class="bx bx-x"></i>
              <p className="cart_price">14000000</p>
            </div>
          </div>
        </div>
      </div>
      <div className="cart_line"></div>
    </>
  );
}
