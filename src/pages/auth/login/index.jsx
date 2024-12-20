import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import { Alert, Button, Form, Input, message, Modal, notification } from "antd";
import { login } from "../../../services/authService";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { forgotPasword } from "../../../services/forgotPassword";
export default function Login() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [forgotPasswordError, setForgotPasswordError] = useState("");
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [form] = Form.useForm();
  const showModal = () => {
    setIsModalOpen(true);
  };
  const onFinish = async (values)=>{
    try{
      const data = await forgotPasword(values);
      if(data.status == 200){
        notification.success({
          message: "Lấy mật khẩu thành công",
          description: "Kiểm tra mail để lấy mật khẩu"
        })
        setIsModalOpen(false);
      }
    }catch(error){
      notification.error({
        message:error.response.data.message,
        duration:2
      })     
    }      
      form.resetFields();
      
  }

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
    console.log("validateData", name, value);
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
              <Link >
                <p className="link-change_password link-login mt-3" onClick={showModal}>
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
          <Modal
            title="Lấy lại mật khẩu"
            open={isModalOpen}
            onCancel={handleCancel}
            footer={[
              <Button key="back" onClick={handleCancel}>
                Huỷ
              </Button>,
              <Button key="submit" type="primary" onClick={() => form.submit()}>
                Gửi
              </Button>,
            ]}
          >
            <Form
              name="basic"
              onFinish={onFinish}
              form={form}
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 600 }}
            >
              <Form.Item
                label="Username"
                name="username"
                className="mt-4"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập username!",
                  },
                ]}
              >
                <Input placeholder="Vui lòng nhập username"/>
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                className="mt-4"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập email!",
                  },
                ]}
              >
                <Input placeholder="Vui lòng nhập email"/>
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </div>
    </>
  );
}
