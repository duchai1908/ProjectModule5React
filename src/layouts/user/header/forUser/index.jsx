import { Badge, Dropdown } from "antd";
import React, { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import CartList from "../../../../pages/user/cartList";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../../redux/slices/authSlice";

export default function ForUsers() {
  const [cartShow, setCartShow] = useState(false);
  // Hàm để đóng giỏ hàng
  const closeCart = () => {
    setCartShow(false);
  };

  const { totalQuantity } = useSelector((state) => state.cart);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Hàm để xử lý đăng xuất
  const handleLogout = () => {
    dispatch(logout());
    navigate("/"); // Điều hướng về trang Home
  };

  const items = isLoggedIn
    ? [
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
          label: <span onClick={handleLogout}>Sign Out</span>,
        },
        {
          key: "5",
          label: (
            <Link to="/test">
              <p>Test Page</p>
            </Link>
          ),
        },
      ]
    : [
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
          <div className="relative">
            <FaRegUser className="text-[28px] cursor-pointer " />
            {isLoggedIn && (
              <span
                className="h-[10px] w-[10px] bg-blue-950 rounded-full"
                style={{ position: "absolute", right: -5, top: -10 }}
              />
            )}
          </div>
        </Dropdown>
        {/* Icon Giỏ Hàng luôn hiển thị */}
        <div className="relative">
          <IoCartOutline
            className="text-[30px] cursor-pointer"
            onClick={() => setCartShow(!cartShow)}
          />
          {/* Chỉ hiển thị Badge khi có totalQuantity */}
          {isLoggedIn && totalQuantity > 0 && (
            <Badge
              count={totalQuantity}
              style={{ position: "absolute", right: -50, top: -60 }}
            />
          )}
        </div>
      </div>
      {cartShow && <CartList closeCart={closeCart} />}
    </>
  );
}
