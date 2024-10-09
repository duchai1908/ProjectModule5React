import React from "react";

export default function UserInformationPage() {
  return (
    <>
      <div className="user_main-right">
        <div className="title_right">
          <h2>Thông Tin Tài Khoản</h2>
        </div>
        <div className="user_line"></div>
        <form className="user_form">
          <div className="checkout_address-payment">
            <h3>Giới tính</h3>
            <div className="selector-gender">
              <label className="cyberpunk-checkbox-label">
                <input
                  type="radio"
                  className="cyberpunk-checkbox"
                  name="sex"
                  value="male"
                />
                Nam
              </label>
              <label className="cyberpunk-checkbox-label">
                <input
                  type="radio"
                  className="cyberpunk-checkbox"
                  name="sex"
                  value="female"
                />
                Nữ
              </label>
              <label className="cyberpunk-checkbox-label">
                <input
                  type="radio"
                  className="cyberpunk-checkbox"
                  name="sex"
                  value="other"
                />
                Khác
              </label>
            </div>
          </div>
          <div className="checkout_delivery">
            <p>Full name</p>
            <div className="checkout_address-input">
              <input
                type="text"
                className="checkout_address-item"
                placeholder="Enter your full name "
              />
            </div>
            <p>Phone</p>
            <div className="checkout_address-input">
              <input
                type="text"
                className="checkout_address-item"
                placeholder="Enter your phone number"
              />
            </div>
            <p>Address</p>
            <div className="checkout_address-input">
              <input
                type="text"
                className="checkout_address-item"
                placeholder="Enter your address"
              />
            </div>
            <p>Ngày Sinh</p>
            <div className="checkout_address-input">
              <input
                type="date"
                className="checkout_address-item"
                placeholder="Enter your birthday"
              />
            </div>
          </div>
          <div className="checkout_address-input">
            <button className="checkout-button">Save</button>
          </div>
        </form>
      </div>
    </>
  );
}
