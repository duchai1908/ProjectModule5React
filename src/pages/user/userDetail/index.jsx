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
import { Link, NavLink } from "react-router-dom";
import UserInformationPage from "./userInformation";
import UserOrderHistoryPage from "./userOrderHistory";

import { useDispatch, useSelector } from "react-redux";

import UserChangePass from "./userChangePass";

import UserAddressPage from "./userAddres";

export default function UserDetail() {
  // Lấy thông tin người dùng từ Redux
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  const [userInfo, setUserInfo] = useState(user);

  console.log("user", user);
  // useEffect để kiểm tra giá trị userInfo mỗi khi nó thay đổi
  useEffect(() => {
    console.log("user từ Redux:", user); // Log user từ Redux
    setUserInfo(user.data); // Cập nhật userInfo với user.data
    console.log("ggg", user.data); //
  }, [user]);

  useEffect(() => {
    if (user && user.data) {
      setUserInfo(user.data);
      console.log("hhh", user);
    }
  }, [user]);

  console.log("userinfo", userInfo);
  const handleUserUpdate = (newUserInfo) => {
    setUserInfo(newUserInfo); // Cập nhật lại state userInfo với thông tin mới
  };
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
                <Upload className="upload-img">
                  <Button className="upload-button" icon={<FaPlus />}>
                    <img
                      src={userInfo ? userInfo?.data?.image : "anh"}
                      alt=""
                    />
                  </Button>
                </Upload>
              </div>
              <div className="user-name">
                <h1>{userInfo ? userInfo?.data.username : "name"}</h1>
                <SlNote />
              </div>
              <div className="user-day">
                {userInfo ? userInfo?.data?.dob : "Ngày sinh"}
              </div>
            </div>
            <div className="user-info">
              <div className="user-phone">
                Phone: {userInfo ? userInfo?.data?.phone : "phone"}
              </div>
              {/* <div className="user-address">
                Address : {userInfo ? userInfo?.data?.address : "address"}
              </div> */}
              <div className="user-email">
                Email : {userInfo ? userInfo?.data?.email : "email"}
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
                  <NavLink>Thông Tin Cá Nhân</NavLink>
                </li>
                <li
                  className="user-item cursor-pointer"
                  onClick={() => handleChangePage(2)}
                >
                  <LuShoppingBag />
                  <NavLink>Đơn Hàng</NavLink>
                </li>
                <li
                  className="user-item cursor-pointer"
                  onClick={() => handleChangePage(3)}
                >
                  <FaRegHeart />
                  <NavLink>Yêu thích</NavLink>
                </li>
                <li
                  className="user-item cursor-pointer"
                  onClick={() => handleChangePage(4)}
                >
                  <FaRegHeart />
                  <Link>Địa chỉ</Link>
                </li>
                <li
                  className="user-item cursor-pointer"
                  onClick={() => handleChangePage(5)}
                >
                  <MdPublishedWithChanges />
                  <NavLink>change Password</NavLink>
                </li>
                <li className="user-item cursor-pointer">
                  <IoMdLogOut />
                  <NavLink to="/">Đăng Xuất</NavLink>
                </li>
              </ul>
            </div>
          </div>
          {/* Conditional rendering based on isOpen */}
          {isOpen === 1 && (
            <UserInformationPage onUserUpdated={handleUserUpdate} />
          )}
          {isOpen === 2 && <UserOrderHistoryPage />}
          {isOpen === 5 && <UserChangePass />}
          {isOpen === 3 && <>hang 3</>}
          {isOpen === 4 && <><UserAddressPage/></>}
        </div>
      </div>
    </>
  );
}
