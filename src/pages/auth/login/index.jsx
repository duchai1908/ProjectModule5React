import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import { Alert, Button, Input, message, notification } from "antd";
import { login } from "../../../services/authService";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
export default function Login() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const [userNameError, setUserNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [invalidLogin, setInvalidLogin] = useState("");
  const dispatch = useDispatch();

  /**
   *
   * @param {*} name tên các trường trong form
   * @param {*} value giá trị các trường trong form
   * @returns trả về giá trị true hoặc false nếu lỗi xảy ra khi validate
   * @description kiểm tra tính hợp lệ của username và password
   * Auth: Duc Hai (03/10/2024)
   */
  const validateData = (name, value) => {
    let invalid = true;
    switch (name) {
      case "username":
        if (!value) {
          setUserNameError("Tên đăng nhập không được để trống");
          invalid = false;
        } else {
          setUserNameError("");
        }
        break;
      case "password":
        if (!value) {
          setPasswordError("Mật khẩu không được để trống");
          invalid = false;
        } else {
          setPasswordError("");
        }
        break;

      default:
        break;
    }
    return invalid;
  };

  /**
   *
   * @param {*} e event
   * @description Lấy giá trị từng ô input
   * @author Duc Hai (03/10/2024)
   */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value,
    });

    validateData(name, value);
  };

  /**
   *
   * @param {*} e sự kiện khi tương tác với form
   * @description gọi API để kiểm tra đăng nhập
   * Auth: Duc Hai (03/10/2024)
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userNameValid = validateData("username", user.username);
    const passwordValid = validateData("password", user.password);
    if (userNameValid && passwordValid) {
      try {
        // do login trong service đang sử dụng trạng thái bất đồng bộ nên phải dùng unwrapping result actions ( trả ra kết quả của action)
        // dispatch: dùng để gửi action từ UI lên reducer
        const resultAction = await dispatch(login(user));
        const originalPromiseResult = unwrapResult(resultAction);

        console.log("original", originalPromiseResult);

        if (
          originalPromiseResult.data.data.roles.some(
            (item) => item === "ROLE_ADMIN"
          )
        ) {
          navigate("/admin");
        } else {
          navigate("/");
        }
        notification.success({
          message: "Đăng nhập thành công",
          // description: response.data.data.message
        });
      } catch (error) {
        const responsError = error?.response?.data?.message;
        // message.error(responsError);
        setInvalidLogin(responsError);
      }
    }
  };

  return (
    <>
      <div className="container-register">
        <div className="content-register box">
          <h2>Login</h2>
          <div className="form-auth">
            <form onSubmit={handleSubmit}>
              <div className="control relative">
                <Input
                  type="text"
                  onChange={handleChange}
                  name="username"
                  status={userNameError ? "error" : ""}
                  id="username"
                  placeholder="Enter your username"
                  className="control_item"
                ></Input>
                {userNameError && (
                  <p className="absolute bottom-[-8px] ml-8 text-red-600">
                    {userNameError}
                  </p>
                )}
              </div>
              <div className="control password mt-1">
                <Input.Password
                  id="password"
                  onChange={handleChange}
                  status={passwordError ? "error" : ""}
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  className="control_item"
                ></Input.Password>
                {passwordError && (
                  <p className="absolute bottom-[-8px] ml-8 text-red-600">
                    {passwordError}
                  </p>
                )}
                {invalidLogin && (
                  <Alert className="mt-8" type="error" message={invalidLogin} />
                  // <p className="absolute bottom-[-8px] ml-8 text-red-600">
                  //   {invalidLogin}
                  // </p>
                )}
              </div>
              <Link to="/change">
                <p className="link-change_password link-login mt-3">
                  Forgot your password?
                </p>
              </Link>
              <div className="btn">
                <Button className="button" htmlType="submit">
                  Login
                </Button>
              </div>
              <div className="account">
                Don't have an account?{" "}
                <Link to="/register">
                  <span className="link-login">Create account</span>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
