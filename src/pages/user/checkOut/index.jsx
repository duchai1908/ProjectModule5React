import React, { useEffect } from "react";
import "./checkout.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCoupon } from "../../../services/couponService";
import { findAllAddress } from "../../../services/addressService";

export default function CheckOut() {
  const dispatch = useDispatch();
  const [isCardChecked, setIsCardChecked] = useState(false);
  const [isSameAsShippingChecked, setIsSameAsShippingChecked] = useState(false); // Trạng thái cho checkbox "Same as shipping address"
  const [selectedAddress, setSelectedAddress] = useState(""); // State cho địa chỉ đã chọn
  const [finalPrice, setFinalPrice] = useState(0); // Giá sau khi áp dụng giảm giá
  const [couponCode, setCouponCode] = useState(""); // Mã coupon

  // State cho địa chỉ giao hàng
  const [receiveName, setReceiveName] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // Lấy listCart từ Redux store
  const {
    data: listCart,
    totalPrice,
    totalQuantity,
  } = useSelector((state) => state.cart);
  const { data: couponData } = useSelector((state) => state.coupon);
  // Lấy dữ liệu địa chỉ từ Redux
  const { data: addressList, status: addressStatus } = useSelector(
    (state) => state.address
  );
  // console.log("listDetail", listCart);
  if (!listCart || listCart.length === 0) {
    return <p>Your cart is empty.</p>; // Hiển thị thông báo khi giỏ hàng trống
  }
  useEffect(() => {
    dispatch(findAllAddress()); // Gọi API để lấy danh sách địa chỉ khi component mount
  }, [dispatch]);

  // Hàm xử lý khi nhấn "Apply"
  const handleApplyCoupon = async (e) => {
    e.preventDefault(); // Ngăn chặn hành vi mặc định của form submit
    if (couponCode) {
      // Gọi API để lấy thông tin giảm giá từ coupon
      dispatch(getCoupon(couponCode));
      alert("success!");
    } else {
      alert("Vui lòng nhập mã coupon.");
    }
  };

  // const handleCompleteOrder = () => {
  //   // Bạn có thể xử lý logic cho việc hoàn tất đơn hàng tại đây
  //   console.log("Địa chỉ đã chọn:", selectedAddress);
  // };

  // Xử lý checkbox
  // Hàm xử lý checkbox
  const handleCheckbox = (checkbox) => {
    if (checkbox === "sameAsShipping") {
      setIsSameAsShippingChecked(true);
      setIsCardChecked(false);

      // Lấy thông tin từ địa chỉ đầu tiên
      const firstAddress = addressList.data[0];
      if (firstAddress) {
        setReceiveName(firstAddress.receiveName);
        setDeliveryAddress(firstAddress.address);
        setPhoneNumber(firstAddress.phone);
      }
    } else if (checkbox === "differentBilling") {
      setIsCardChecked(true);
      setIsSameAsShippingChecked(false);
      setReceiveName(""); // Đặt lại khi chọn địa chỉ khác
      setDeliveryAddress(""); // Đặt lại khi chọn địa chỉ khác
      setPhoneNumber(""); // Đặt lại khi chọn địa chỉ khác
    }
  };

  // Cập nhật thông tin khi chọn địa chỉ từ dropdown
  const handleAddressChange = (e) => {
    const selected = addressList.data[e.target.selectedIndex - 1]; // -1 vì option đầu tiên là "Chọn địa chỉ"
    if (selected) {
      setReceiveName(selected.receiveName);
      setDeliveryAddress(selected.address);
      setPhoneNumber(selected.phone);
    }
  };
  return (
    <>
      <div className="checkout_container">
        <div className="checkout_line"></div>
        <div className="checkout_main">
          <div className="checkout_main-left">
            <div className="checkout_content">
              <main className="checkout_items">
                {/* dien vao form */}
                <form action="" className="checkout_form">
                  <div className="address_first">
                    <div className="checkout_contact">
                      <div className="checkout_form-contact">
                        <h3>Contact</h3>
                        <Link className="link-contact">Login</Link>
                      </div>
                      <input
                        type="text"
                        className="checkout_email"
                        placeholder="Enter your mail"
                      />
                    </div>

                    <div className="checkout_delivery">
                      <h3>Delivery</h3>
                      <div className="checkout_address-input">
                        <input
                          type="text"
                          className="checkout_address-item"
                          placeholder="Enter your receive name"
                          value={receiveName}
                          onChange={(e) => setReceiveName(e.target.value)}
                        />
                      </div>

                      <div className="checkout_address-input">
                        <input
                          type="text"
                          className="checkout_address-item"
                          placeholder="Enter your address"
                          value={deliveryAddress}
                          onChange={(e) => setDeliveryAddress(e.target.value)}
                        />
                      </div>
                      <div className="checkout_address-input">
                        <input
                          type="text"
                          className="checkout_address-item"
                          placeholder="Enter your phone"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                      </div>
                      <label className="cyberpunk-checkbox-label">
                        <input type="checkbox" className="cyberpunk-checkbox" />
                        Save this information for next time
                      </label>
                    </div>

                    <div className="checkout_shipping-method">
                      <h3>Shipping method</h3>
                      <div className="checkout_shipping">
                        <p>International Shipping</p>
                        <h3>₫4,000</h3>
                      </div>
                    </div>

                    <div className="checkout_address-payment">
                      <h3>Payment</h3>
                      <label className="cyberpunk-checkbox-label">
                        <input type="checkbox" className="cyberpunk-checkbox" />
                        Cash on Delivery (COD)
                      </label>
                    </div>
                  </div>

                  <div className="checkout_billing">
                    <h3>Billing address</h3>

                    <label className="cyberpunk-checkbox-label">
                      <input
                        type="checkbox"
                        name="address"
                        className="cyberpunk-checkbox"
                        id="checkbox1"
                        value="address"
                        checked={isSameAsShippingChecked}
                        onClick={() => handleCheckbox("sameAsShipping")}
                      />
                      Same as shipping address
                    </label>

                    <label className="cyberpunk-checkbox-label">
                      <input
                        type="checkbox"
                        name="address"
                        className="cyberpunk-checkbox"
                        id="checkbox2"
                        value="address"
                        checked={isCardChecked}
                        onClick={() => handleCheckbox("differentBilling")}
                      />
                      Use a different billing address
                    </label>

                    {/* Dropdown cho địa chỉ đã chọn */}
                    {isCardChecked && (
                      <div className="checkout_address-selector">
                        <label htmlFor="addressSelect">Chọn địa chỉ:</label>
                        <select
                          id="addressSelect"
                          onChange={handleAddressChange}
                        >
                          <option value="">-- Chọn địa chỉ --</option>
                          {addressList?.data?.map((address, index) => (
                            <option key={index} value={address}>
                              {address.receiveName} - {address.address} -
                              {address.phone}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    {/* Hộp thoại mở rộng khi chọn checkbox Pay with card */}
                    {isCardChecked && (
                      <div
                        className={`checkout_delivery-box ${
                          isCardChecked ? "show" : ""
                        }`}
                      >
                        <div className="checkout_address-input">
                          <input
                            type="text"
                            className="checkout_address-item"
                            placeholder="Enter your receive name"
                            value={receiveName}
                            onChange={(e) => setReceiveName(e.target.value)}
                          />
                        </div>
                        <div className="checkout_address-input">
                          <input
                            type="text"
                            className="checkout_address-item"
                            placeholder="Enter your address"
                            value={deliveryAddress}
                            onChange={(e) => setDeliveryAddress(e.target.value)}
                          />
                        </div>
                        <div className="checkout_address-input">
                          <input
                            type="text"
                            className="checkout_address-item"
                            placeholder="Enter your phone"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="checkout_address-input_button">
                    <button className="checkout-button">Complete order</button>
                  </div>
                </form>
              </main>
              <footer className="checkout_footer"></footer>
            </div>
          </div>
          {/* phan mind-line dai het */}
          {/* <div className="mind-line"></div> */}
          {/* phan ben phai  nay thi man hinh giu nguyen khi chuot croll thi khong di theo chuot*/}
          <div className="right-checkout">
            <div className="checkout_detail-items">
              {/* item product */}
              {listCart &&
                listCart?.data?.map((item) => (
                  <div className="checkout_detail-item">
                    <div className="checkout_detail-left">
                      <div className="check_product-img">
                        <img
                          src={item.productDetail.product.image}
                          alt={item.productDetail.name}
                        />
                        <div className="checkout_icon">{item.quantity}</div>
                      </div>
                      <div className="check_product-text">
                        <h4> {item.productDetail.name}</h4>
                        <span>Color: {item.productDetail.color.color}</span>
                        <span>Size: {item.productDetail.size.size}</span>
                      </div>
                    </div>

                    <div className="checkout_detail-right">
                      <p>{item.productDetail.price * item.quantity}</p>
                    </div>
                  </div>
                ))}

              {/* item giam gia*/}
              <div className="checkout_detail-apply">
                <div className="checkout_detail-input">
                  <form action="">
                    <div className="checkout-form-apply">
                      <input
                        type="text"
                        className="check-apply"
                        placeholder="Discount code or gift card"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                      />
                      <button
                        className="checkout_apply-btn"
                        onClick={handleApplyCoupon}
                      >
                        Apply
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              <div className="checkout_detail-total">
                <div className="checkout_total-item">
                  <div>
                    Subtotal •{" "}
                    <span style={{ color: "#02a9f7", fontWeight: "600" }}>
                      {totalQuantity}
                    </span>{" "}
                    items
                  </div>
                  <p>{totalPrice}</p>
                </div>
                <div className="checkout_total-item">
                  <span>Coupon</span>
                  {/* Hiển thị phần trăm giảm giá */}
                  <p>
                    {couponData.data ? `${couponData?.data?.percent}%` : "0%"}
                  </p>
                </div>
                <div className="checkout_total-item total">
                  <span>Total</span>
                  <p>
                    VND{" "}
                    {totalPrice * (1 - (couponData?.data?.percent || 0) / 100)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
