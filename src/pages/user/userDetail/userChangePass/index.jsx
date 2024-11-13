import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../../../../services/userService";
import { selectUser } from "../../../../redux/slices/userSlice";
import { Input, notification } from "antd";
import { logout } from "../../../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

export default function UserChangePass() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector(selectUser);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Kiểm tra mật khẩu xác nhận
    if (newPassword !== confirmPassword) {
      notification.error({
        message: "Lỗi",
        description: "Mật khẩu mới và xác nhận mật khẩu không khớp.",
      });
      return;
    }

    // Gọi action changePassword
    dispatch(changePassword({ oldPassword, newPassword })).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        // Reset form nếu thay đổi mật khẩu thành công
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
        notification.success({
          message: "Thành công",
          description: "Mật khẩu đã được thay đổi thành công!",
        });
      }
      // Sau khi thay đổi mật khẩu, tiến hành logout
      dispatch(logout()); // Gọi action logout để xóa token và đăng xuất
      navigate("/login"); // Điều hướng về trang đăng nhập sau khi logout
    });
  };

  return (
    <>
      <div className="user_main-right">
        <div className="title_right">
          <h2>Change Password</h2>
        </div>
        <div className="user_line"></div>
        <form className="user_form" onSubmit={handleSubmit}>
          <div className="checkout_delivery">
            <p>Mật khẩu cũ</p>
            <div className="checkout_address-input">
              <Input.Password
                type="text"
                className="checkout_address-item"
                placeholder="Enter your old password"
                value={oldPassword} // Thêm value và onChange
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>
            <p>Mật khẩu mới</p>
            <div className="checkout_address-input">
              <Input.Password
                type="text"
                className="checkout_address-item"
                placeholder="Enter your new password"
                value={newPassword} // Thêm value và onChange
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <p>Xác Nhận Mật khẩu mới</p>
            <div className="checkout_address-input">
              <Input.Password
                type="text"
                className="checkout_address-item"
                placeholder="Enter your confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="checkout_address-input">
            <button className="checkout-button" type="submit">
              Save
            </button>
          </div>
        </form>
        {/* {status === "loading" && (
          <p style={{ color: "yellow" }}>Đang thay đổi mật khẩu...</p>
        )}
        {status === "failed" && <p style={{ color: "red" }}>{error}</p>}
        {status === "succeeded" && (
          <p style={{ color: "green" }}>Thay đổi mật khẩu thành công!</p>
        )} */}
      </div>
    </>
  );
}
