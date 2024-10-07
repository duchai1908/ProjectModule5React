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
import { useDispatch, useSelector } from "react-redux";

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

  const { user, status, error } = useSelector((state) => state.auth);

  useEffect(() => {
    console.log("User detail page loaded");
    console.log("User data:", user); // Kiểm tra dữ liệu người dùng
  }, [user]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>No user data available</div>; // Thông báo nếu không có dữ liệu người dùng
  }
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
                  <Button className="upload-button" icon={<FaPlus />}></Button>
                </Upload>
              </div>
              <div className="user-name">
                <h1>{user?.username}</h1>
                <SlNote />
              </div>
              <div className="user-day">06/06/1996</div>
            </div>
            <div className="user-info">
              <div className="user-phone">SDT: {user?.phone}</div>
              <div className="user-address">DIA CHI: {user?.address}</div>
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
        <div className="footer">
          <div className="user_line"></div>
          <div className="footer-bottom">
            <div className="flex flex-col md:flex-row items-center justify-between p-8 w-full max-w-[1200px] mx-auto z-20">
              <div className="text-center md:text-left">
                &#169; <strong>Minimalin</strong>. All rights reserved.
              </div>
              <div className="flex flex-col md:flex-row gap-4 md:gap-6 mt-4 md:mt-0">
                <a href="#" className="hover:text-blue-500">
                  Privacy Policy
                </a>
                <a href="#" className="hover:text-blue-500">
                  Refund Policy
                </a>
                <a href="#" className="hover:text-blue-500">
                  Shipping Policy
                </a>
                <a href="#" className="hover:text-blue-500">
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
