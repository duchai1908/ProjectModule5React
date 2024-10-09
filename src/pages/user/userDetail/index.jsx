import React, { useEffect } from "react";
import "./userDetail.css";
import { Breadcrumb } from "antd";
import { SlNote } from "react-icons/sl";
import { FaBarcode } from "react-icons/fa";
import { LuShoppingBag } from "react-icons/lu";
import { FaRegHeart } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { Upload, Button } from "antd";
import { MdPublishedWithChanges } from "react-icons/md";

import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function UserDetail() {
  const props = {
    name: "file",
    action: "/upload.do",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status === "done") {
        alert(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        alert(`${info.file.name} file upload failed.`);
      }
    },
  };
  // Lấy thông tin người dùng từ Redux
  const user = useSelector((state) => state.auth.data);
  console.log("user", user);
  return (
    <>
      <div className="user-container">
        <div className="wish_header">
          <h1 className="wish_title">My Account</h1>
          <div className="wish_link">
            <Breadcrumb
              separator=">"
              items={[
                {
                  title: <span className="wish_home">Home</span>,
                  href: "/",
                },
                {
                  title: <span className="wish_list">My account</span>,
                },
              ]}
              className="wish_link-icon"
            />
          </div>
        </div>
        <div className="user_main">
          <div className="user_main-left">
            <div className="user-profile">
              <div className="user_upload">
                <Upload {...props} className="upload-img">
                  <Button className="upload-button" icon={<FaPlus />}>
                    <img src={user.data.image} alt="" />
                  </Button>
                </Upload>
              </div>
              <div className="user-name">
                <h1>{user.data.username}</h1>
                <SlNote />
              </div>
              <div className="user-day">
                {user ? user.data.dob : "Ngày sinh"}
              </div>
            </div>
            <div className="user-info">
              <div className="user-phone">
                Phone: {user ? user.data.phone : "phone"}
              </div>
              <div className="user-address">
                Address : {user ? user.data.address : "address"}
              </div>
            </div>
            <div className="user_line"></div>
            <div className="user-detail">
              <ul className="user-items">
                <li className="user-item">
                  <FaBarcode className="user_icon-side" />
                  <Link>Mã ưu đãi</Link>
                </li>
                <li className="user-item">
                  <LuShoppingBag />
                  <Link>Đơn Hàng</Link>
                </li>
                <li className="user-item">
                  <FaRegHeart />
                  <Link>Yêu thích</Link>
                </li>
                <li className="user-item">
                  <MdPublishedWithChanges />
                  <Link>change Password</Link>
                </li>
                <li className="user-item">
                  <IoMdLogOut />
                  <Link to="/">Đăng Xuất</Link>
                </li>
              </ul>
            </div>
          </div>
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
        </div>
      </div>
    </>
  );
}
