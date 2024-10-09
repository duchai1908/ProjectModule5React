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
                  <Button className="upload-button" icon={<FaPlus />}></Button>
                </Upload>
              </div>
              <div className="user-name">
                <h1>nguyen thi vien</h1>
                <SlNote />
              </div>
              <div className="user-day">06/06/1996</div>
            </div>
            <div className="user-info">
              <div className="user-phone">SDT: 098765432</div>
              <div className="user-address">DIA CHI: hai duong</div>
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
