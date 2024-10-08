import React, { useEffect, useState } from "react";
import "./cartDetail.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAllCart,
  deleteCart,
  findAllCart,
  updateCartQuantity,
} from "../../../services/cartService";

import ConfirmationModal from "../../../components/model/ConfirmationModal";
export default function CartDetail() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isClearingCart, setIsClearingCart] = useState(false);
  const [cartItemIdToDelete, setCartItemIdToDelete] = useState(null);
  const dispatch = useDispatch();

  // Lấy listCart từ Redux store
  const {
    data: listCart,
    status,
    totalPrice,
  } = useSelector((state) => state.cart);
  console.log("totalPrice", totalPrice);
  // console.log("listDetail", listCart);
  if (!listCart || listCart.length === 0) {
    return <p>Your cart is empty.</p>; // Hiển thị thông báo khi giỏ hàng trống
  }
  // Hàm xử lý xóa item khỏi giỏ hàng chi tiet

  const showDeleteConfirmation = (id) => {
    setCartItemIdToDelete(id); // Lưu id của sản phẩm muốn xóa
    setIsModalVisible(true); // khi bam thi mo model de xac nhan co xoa khong
    setIsClearingCart(false); // Đặt thành false để xóa item
  };
  // xac nhan xoa khi mo form de xac nhan

  const handleConfirmDelete = () => {
    if (isClearingCart) {
      dispatch(deleteAllCart()).then(() => {
        setIsModalVisible(false); // Đóng modal
        dispatch(findAllCart()); // Cập nhật lại danh sách giỏ hàng
      });
    } else {
      console.log(cartItemIdToDelete);
      if (cartItemIdToDelete) {
        dispatch(deleteCart(cartItemIdToDelete)).then(() => {
          setIsModalVisible(false); // Đóng modal
          dispatch(findAllCart()); // Cập nhật lại danh sách giỏ hàng
        }); // Gọi action xóa sản phẩm
      }
    }
  };
  // khi bam cancel thi chi dong form

  const handleCancelDelete = () => {
    setIsModalVisible(false); // xoa x roi dong form
  };

  const handleClearCart = () => {
    setIsClearingCart(true); // Đặt thành true để xóa toàn bộ giỏ hàng
    setIsModalVisible(true);
  };

  //update quantity

  const handleUpdateQuantity = (cartId, newQuantity) => {
    console.log(cartId, newQuantity);
    dispatch(updateCartQuantity({ newQuantity, cartId }));
    dispatch(findAllCart()); // Cập nhật lại danh sách giỏ hàng
  };

  // goi coupon goi API backend  tai day

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
                {listCart &&
                  listCart?.data?.map((item) => (
                    <tr key={item.id}>
                      <td className="cartDetail_img">
                        <Link>
                          <img
                            src={item.productDetail.product.image}
                            alt={item.productDetail.name}
                          />
                        </Link>
                      </td>
                      <td className="cartDetail_product-title">
                        <Link to="#" className="link_title-product">
                          {item.productDetail.name}
                        </Link>
                        <p>{item.productDetail.color.color}</p>
                        <p>Size: {item.productDetail.size.size}</p>
                      </td>
                      <td className="cartDetail_product-price">
                        {item.productDetail.price}₫
                      </td>
                      <td className="cartDetail_control-quantity">
                        <div className="cart_quantity-box">
                          <div
                            className="cart_quantity-minus"
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              handleUpdateQuantity(item.id, item.quantity - 1)
                            }
                          >
                            -
                          </div>
                          <input
                            className="cart_quantity-control"
                            type="text"
                            value={item.quantity}
                            readOnly
                          />
                          <div
                            className="cart_quantity-plus"
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              handleUpdateQuantity(item.id, item.quantity + 1)
                            }
                          >
                            +
                          </div>
                        </div>
                      </td>
                      <td className="cartDetail_total">
                        {item.productDetail.price * item.quantity}₫
                      </td>
                      <td
                        className="cartDetail_close"
                        onClick={() => showDeleteConfirmation(item.id)} // Truyền item.id vào hàm
                      >
                        <div className="cartDetail_icon-close">
                          <i class="bx bx-x"></i>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="cartDetail_button">
            <button className="cartDetail_button-item">
              <Link to="/list-products">Continue Shopping</Link>
            </button>
            <button
              className="cartDetail_button-item"
              onClick={handleClearCart}
            >
              Clear Cart
            </button>
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
                        <span id="bk-cart-subtotal-price">{totalPrice}</span>
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
      <ConfirmationModal
        visible={isModalVisible}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        title={
          isClearingCart
            ? "Xác nhận xóa toàn bộ giỏ hàng"
            : "Xác nhận xóa sản phẩm"
        }
        content={
          isClearingCart
            ? "Bạn có chắc chắn muốn xóa toàn bộ giỏ hàng?"
            : "Bạn có chắc chắn muốn xóa sản phẩm này?"
        }
      />
    </>
  );
}
