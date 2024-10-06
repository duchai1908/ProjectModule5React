import React from "react";
import "./checkout.css";
import { Link } from "react-router-dom";
import { useState } from "react";
export default function CheckOut() {
  const [isCardChecked, setIsCardChecked] = useState(false);

  // Xử lý checkbox
  const handleCheckbox = (selected, other) => {
    const selectedCheckbox = document.getElementById(selected);
    const otherCheckbox = document.getElementById(other);

    // Khi checkbox được chọn, bỏ chọn checkbox kia
    if (selectedCheckbox.checked) {
      otherCheckbox.checked = false;
    }

    // Mở hộp thoại khi chọn checkbox thứ hai
    if (selected === "checkbox2" && selectedCheckbox.checked) {
      setIsCardChecked(true);
    } else {
      setIsCardChecked(false);
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
                        className="checkout_firstName"
                        placeholder="Enter your first name"
                      />
                      <input
                        type="text"
                        className="checkout_lastName"
                        placeholder="Enter your last name"
                      />
                    </div>
                    <div className="checkout_address-input">
                      <input
                        type="text"
                        className="checkout_address-item"
                        placeholder="Enter your address"
                      />
                    </div>
                    <div className="checkout_address-input">
                      <input
                        type="text"
                        className="checkout_address-item"
                        placeholder="Enter your apartment,suite,ect"
                      />
                    </div>
                    <div className="checkout_address-input">
                      <input
                        type="text"
                        className="checkout_city"
                        placeholder="Enter your city"
                      />
                      <input
                        type="text"
                        className="checkout_postal-code"
                        placeholder="Enter your postalCode"
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

                  <div className="checkout_billing">
                    <h3>Billing address</h3>

                    <label className="cyberpunk-checkbox-label">
                      <input
                        type="checkbox"
                        name="address"
                        className="cyberpunk-checkbox"
                        id="checkbox1"
                        onClick={() => handleCheckbox("checkbox1", "checkbox2")}
                      />
                      Same as shipping address
                    </label>

                    <label className="cyberpunk-checkbox-label">
                      <input
                        type="checkbox"
                        name="address"
                        className="cyberpunk-checkbox"
                        id="checkbox2"
                        onClick={() => handleCheckbox("checkbox2", "checkbox1")}
                      />
                      Use a different billing address
                    </label>

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
                            className="checkout_firstName"
                            placeholder="Enter your first name"
                          />
                          <input
                            type="text"
                            className="checkout_lastName"
                            placeholder="Enter your last name"
                          />
                        </div>
                        <div className="checkout_address-input">
                          <input
                            type="text"
                            className="checkout_address-item"
                            placeholder="Enter your address"
                          />
                        </div>
                        <div className="checkout_address-input">
                          <input
                            type="text"
                            className="checkout_address-item"
                            placeholder="Enter your apartment,suite,ect"
                          />
                        </div>
                        <div className="checkout_address-input">
                          <input
                            type="text"
                            className="checkout_city"
                            placeholder="Enter your city"
                          />
                          <input
                            type="text"
                            className="checkout_postal-code"
                            placeholder="Enter your postalCode"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="checkout_address-input button">
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
              <div className="checkout_detail-item">
                <div className="checkout_detail-left">
                  <div className="check_product-img">
                    <img src="https://cdn.shopify.com/s/files/1/1522/7938/files/e1_1_128x128.png?v=1719674913" />
                    <div className="checkout_icon">1</div>
                  </div>
                  <div className="check_product-text">
                    <h4>Bb. Smart headphone</h4>
                    <span>navy</span>
                  </div>
                </div>

                <div className="checkout_detail-right">
                  <p>₫973,000</p>
                </div>
              </div>

              <div className="checkout_detail-item">
                <div className="checkout_detail-left">
                  <div className="check_product-img">
                    <img src="https://cdn.shopify.com/s/files/1/1522/7938/files/e1_1_128x128.png?v=1719674913" />
                    <div className="checkout_icon">1</div>
                  </div>
                  <div className="check_product-text">
                    <h4>Bb. Smart headphone</h4>
                    <span>navy</span>
                  </div>
                </div>

                <div className="checkout_detail-right">
                  <p>₫973,000</p>
                </div>
              </div>

              <div className="checkout_detail-item">
                <div className="checkout_detail-left">
                  <div className="check_product-img">
                    <img src="https://cdn.shopify.com/s/files/1/1522/7938/files/e1_1_128x128.png?v=1719674913" />
                    <div className="checkout_icon">1</div>
                  </div>
                  <div className="check_product-text">
                    <h4>Bb. Smart headphone</h4>
                    <span>navy</span>
                  </div>
                </div>

                <div className="checkout_detail-right">
                  <p>₫973,000</p>
                </div>
              </div>

              {/* item giam gia*/}
              <div className="checkout_detail-apply">
                <div className="checkout_detail-input">
                  <form action="">
                    <div className="checkout-form-apply">
                      <input
                        type="text"
                        className="check-apply"
                        placeholder="Discount code or gift card"
                      />
                      <button className="checkout_apply-btn">Apply</button>
                    </div>
                  </form>
                </div>
              </div>

              <div className="checkout_detail-total">
                <div className="checkout_total-item">
                  <span>Subtotal • 4 items</span>
                  <p>₫3,393,000</p>
                </div>
                <div className="checkout_total-item">
                  <span>Shipping</span>
                  <p>₫4,000 Total</p>
                </div>
                <div className="checkout_total-item total">
                  <span>Total</span>
                  <p>VND ₫3,397,000</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
