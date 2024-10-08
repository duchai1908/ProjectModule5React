import { Badge, Dropdown } from "antd";
import React, { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import CartList from "../../../../pages/user/cartList";
import { useSelector } from "react-redux";

export default function ForUsers() {
  const [cartShow, setCartShow] = useState(false);
  // Hàm để đóng giỏ hàng
  const closeCart = () => {
    setCartShow(false);
  };
  // Lấy danh sách sản phẩm từ Redux store

  const cartItems = useSelector((state) => state.cart.data);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity); // Lấy tổng số lượng từ Redux state

  // console.log("Sản phẩm trong giỏ hàng:", cartItems);
  // console.log("Tổng số lượng sản phẩm:", totalQuantity);
  const items = [
    {
      key: "1",
      label: (
        <Link to="/user-detail" target="_blank" rel="noopener noreferrer">
          My Accounts
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <Link to="/wish-list" target="_blank" rel="noopener noreferrer">
          WishList
        </Link>
      ),
    },
    {
      key: "3",
      label: (
        <Link to="/" target="_blank" rel="noopener noreferrer" href="#">
          Sign Out
        </Link>
      ),
    },
    {
      key: "4",
      label: (
        <Link to="/login">
          <p>Login</p>
        </Link>
      ),
    },
    {
      key: "5",
      label: (
        <Link to="/test">
          <p>Test Page</p>
        </Link>
      ),
    },
  ];
  return (
    <>
      <div className="flex font-[16px] gap-6">
        {/* <IoSearch className="text-[20px] cursor-pointer" /> */}
        <Dropdown
          menu={{
            items,
          }}
          placement="bottom"
        >
          <FaRegUser className="text-[28px] cursor-pointer" />
        </Dropdown>
        {/* Icon Giỏ Hàng */}
        <Badge count={totalQuantity}>
          <IoCartOutline
            className="text-[30px] cursor-pointer"
            onClick={() => setCartShow(!cartShow)}
          />
        </Badge>
      </div>
      {cartShow && <CartList closeCart={closeCart} />}
    </>
  );
}
