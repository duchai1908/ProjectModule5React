import React from "react";

export default function CartItem({ item }) {
  return (
    <>
      <div className="cart_item">
        <div className="cart_img-product">
          <div className="cart_item-close">
            <i className="bx bx-x"></i>
          </div>
          <img
            src={item.productDetail.image || "fallback-image-url.png"} // Fallback image if none is provided
            alt={item.productDetail.name} // Use the product name for the alt text
          />
        </div>
        <div className="cart_content">
          <h4 className="cart_title">{item.productDetail.name}</h4>{" "}
          {/* Accessing the product name */}
          <div className="cart_content-quantity">
            <div className="cart_quantity">
              <span className="cart_quantity-detail">{item.quantity}</span>
              <i className="bx bx-x"></i>
              <p className="cart_price">
                {item.productDetail.price.toLocaleString()} VND
              </p>{" "}
              {/* Format price */}
            </div>
          </div>
        </div>
      </div>
      <div className="cart_line"></div>
    </>
  );
}
