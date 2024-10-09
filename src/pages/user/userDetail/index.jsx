import React, { useEffect, useState } from "react";
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
import UserInformationPage from "./userInformation";
import UserOrderHistoryPage from "./userOrderHistory";
import { useSelector } from "react-redux";

export default function UserDetail() {
  //take user value
  const data = useSelector((state) => state.auth);
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

  const [isOpen, setIsOpen] = useState(1);
  const handleChangePage = (key) => {
    console.log("key:", key);
    setIsOpen(key);
  };

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
                <li
                  className="user-item cursor-pointer"
                  onClick={() => handleChangePage(1)}
                >
                  <FaBarcode className="user_icon-side" />
                  <Link>Mã ưu đãi</Link>
                </li>
                <li
                  className="user-item cursor-pointer"
                  onClick={() => handleChangePage(2)}
                >
                  <LuShoppingBag />
                  <Link>Đơn Hàng</Link>
                </li>
                <li
                  className="user-item cursor-pointer"
                  onClick={() => handleChangePage(3)}
                >
                  <FaRegHeart />
                  <Link>Yêu thích</Link>
                </li>
                <li
                  className="user-item cursor-pointer"
                  onClick={() => handleChangePage(4)}
                >
                  <MdPublishedWithChanges />
                  <Link>change Password</Link>
                </li>
                <li className="user-item cursor-pointer">
                  <IoMdLogOut />
                  <Link to="/">Đăng Xuất</Link>
                </li>
              </ul>
            </div>
          </div>
          {/* Conditional rendering based on isOpen */}
          {isOpen === 1 && <UserInformationPage />}
          {isOpen === 2 && <UserOrderHistoryPage />}
          {isOpen === 3 && <>hang 3</>}
          {isOpen === 4 && <>hang 4</>}
        </div>
      </div>
    </>
  );
}
