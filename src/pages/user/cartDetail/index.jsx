import React from "react";
import "./cartDetail.css";
import { Link } from "react-router-dom";
export default function CartDetail() {
  return (
    <>
      <div className="cartDetail_container">
        <div className="cartDetail_header">
          <h1 className="cartDetail_title">Your Shopping Cart</h1>
        </div>
        <div className="cartDetail_content">
          <div className="cartDetail_table">
            <table>
              <tbody>
                {/* cart item  start*/}
                <tr>
                  <td className="cartDetail_img">
                    <Link>
                      <img
                        src="https://minimalin-demo.myshopify.com/cdn/shop/files/e1_22_compact.png?v=1708945190"
                        alt=""
                      />
                    </Link>
                  </td>
                  <td className="cartDetail_product-title">
                    <Link to="#" className="link_title-product">
                      Rb. ECO 5MP Dome CC Camera
                    </Link>
                    <p>blue</p>
                    <p>size: L</p>
                  </td>
                  <td className="cartDetail_product-price">975.000₫</td>
                  <td className="cartDetail_control-quantity">
                    <div className="cart_quantity-box">
                      <div className="cart_quantity-minus">-</div>
                      <input
                        className="cart_quantity-control"
                        type="text"
                        value="1"
                      />
                      <div className="cart_quantity-plus">+</div>
                    </div>
                  </td>
                  <td className="cartDetail_total">2000000</td>
                  <td className="cartDetail_close">
                    <div className="cartDetail_icon-close">
                      <i class="bx bx-x"></i>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="cartDetail_img">
                    <Link>
                      <img
                        src="https://minimalin-demo.myshopify.com/cdn/shop/files/e1_22_compact.png?v=1708945190"
                        alt=""
                      />
                    </Link>
                  </td>
                  <td className="cartDetail_product-title">
                    <Link to="#" className="link_title-product">
                      Rb. ECO 5MP Dome CC Camera
                    </Link>
                    <p>blue</p>
                    <p>size: L</p>
                  </td>
                  <td className="cartDetail_product-price">975.000₫</td>
                  <td className="cartDetail_control-quantity">
                    <div className="cart_quantity-box">
                      <div className="cart_quantity-minus">-</div>
                      <input
                        className="cart_quantity-control"
                        type="text"
                        value="1"
                      />
                      <div className="cart_quantity-plus">+</div>
                    </div>
                  </td>
                  <td className="cartDetail_total">2000000</td>
                  <td className="cartDetail_close">
                    <div className="cartDetail_icon-close">
                      <i class="bx bx-x"></i>
                    </div>
                  </td>
                </tr>
                {/* cart item  end*/}
              </tbody>
            </table>
          </div>
          <div className="cartDetail_button">
            <button className="cartDetail_button-item">
              <Link to="/list-products">Continue Shopping</Link>
            </button>
            <button className="cartDetail_button-item">Clear Cart</button>
          </div>

          <div className="cartDetail_total-box">
            <div className="cart-coupon">
              <h3>Special instructions for seller</h3>
              <textarea
                name="note"
                class=""
                id="CartSpecialInstructions"
              ></textarea>
            </div>
            <div className="cart_total-table">
              <h3>Cart Totals</h3>
              <table class="cart_table-items">
                <tbody>
                  <tr class="cart-subtotal">
                    <th>Subtotal</th>
                    <td className="cart_amount">
                      <span class="amount">
                        <span id="bk-cart-subtotal-price">3.400.000₫</span>
                      </span>
                    </td>
                  </tr>
                  <tr class="order-total">
                    <th>Total</th>
                    <td>
                      <strong>
                        <span class="amount">
                          <span id="bk-cart-subtotal-price">3.400.000₫</span>
                        </span>
                      </strong>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="proceed-to-checkout">
                <button
                  type="submit"
                  class="theme-default-button"
                  name="checkout"
                >
                  <Link to="/checkout">Proceed to Checkout</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
