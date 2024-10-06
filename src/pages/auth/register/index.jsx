import React, { useState } from "react";
import "./register.css";
import "../login/login.css";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Input, message, notification } from "antd";
import { validateEmail } from "../../../utils/validateData.js";
import { register } from "../../../services/authService";
// import { register } from "../../../service/authService";
export default function Register() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [fullNameError, setFullNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [invalidRegister, setInvalidRegister] = useState("");
  // viet ham validation

  const validateData = (name, value) => {
    let invalid = true;
    switch (name) {
      case "username":
        if (!value) {
          setFullNameError("User name is cannot be empty");
          invalid = false;
        } else {
          if (value.length < 4) {
            setFullNameError("User name is longer than 4 characters");
            invalid = false;
          } else {
            setFullNameError("");
          }
        }
        break;
      case "email":
        if (!value) {
          setEmailError("Email is cannot be empty");
          invalid = false;
        } else {
          if (!validateEmail(value)) {
            setEmailError("email is not valid");
            invalid = false;
          } else {
            setEmailError("");
          }
        }
        break;

      case "password":
        if (!value) {
          setPasswordError("Password is cannot be empty");
          invalid = false;
        } else {
          if (value.length < 6) {
            setPasswordError("Password is longer than 6 characters");
            invalid = false;
          } else {
            setPasswordError("");
          }
        }
        break;

      case "confirmPassword":
        if (!value) {
          setConfirmPasswordError("Confirm Password is cannot be empty");
          invalid = false;
        } else {
          if (value !== user.password) {
            setConfirmPasswordError("Confirm password again");
            invalid = false;
          } else {
            setConfirmPasswordError("");
          }
        }
        break;

      default:
        break;
    }
    return invalid;
  };
  //lay gia tri tung o input
  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);
    setUser({
      ...user,
      [name]: value,
    });
    validateData(name, value);
  };

  // submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullNameValid = validateData("username", user.username);
    const emailValid = validateData("email", user.email);
    const passwordValid = validateData("password", user.password);
    const confirmPassWordValid = validateData(
      "confirmPassword",
      user.confirmPassword
    );

    if (fullNameValid && emailValid && passwordValid && confirmPassWordValid) {
      delete user.confirmPassword;
      try {
        setIsLoading(true);
        // Submit forrm
        const response = await register(user);
        if (response.status == 201) {
          // CHuyển hướng về đăng nhập
          navigate("/login");

          // Hiển thị thông báo
          notification.success({
            message: "Thành công",
            description: response.data,
          });

          
        }
      } catch (error) {
        const responsError = error?.response?.data?.message?.username;    
        // message.error(responsError);
        setInvalidRegister(responsError);
      }
    }
  };
  return (
    <>
      <div className="container-register">
        <div className="content-register">
          <h2>Sign In</h2>
          <div className="form-auth">
            <form onSubmit={handleSubmit}>
              <div className="control">
                <Input
                  onChange={handleChange}
                  name="username"
                  id="username"
                  status={fullNameError ? "error" : ""}
                  type="text"
                  placeholder="Enter your user name"
                  className="control_item"
                ></Input>
                {fullNameError && (
                  <p className="error_register">{fullNameError}</p>
                )}
              </div>

              <div className="control">
                <Input
                  onChange={handleChange}
                  name="email"
                  id="email"
                  type="text"
                  status={emailError ? "error" : ""}
                  placeholder="Enter your email"
                  className="control_item"
                ></Input>
                {emailError && <p className="error_register">{emailError}</p>}
              </div>

              <div className="control password">
                <Input.Password
                  onChange={handleChange}
                  name="password"
                  id="password"
                  type="password"
                  status={passwordError ? "error" : ""}
                  placeholder="Enter your password"
                  className="control_item"
                ></Input.Password>
                {passwordError && (
                  <p className="error_register">{passwordError}</p>
                )}
              </div>

              <div className="control confirm_password">
                <Input.Password
                  onChange={handleChange}
                  name="confirmPassword"
                  id="confirm_password"
                  type="password"
                  status={confirmPasswordError ? "error" : ""}
                  placeholder="Re enter your confirm password"
                  className="control_item"
                ></Input.Password>
                {confirmPasswordError && (
                  <p className="error_register">{confirmPasswordError}</p>
                )}
                 {invalidRegister && (
                  <Alert className="mt-8" type="error" message={invalidRegister} />
                )}
              </div>
              <div className="btn">
                <Button htmlType="submit" className="button">
                  Create account
                </Button>
              </div>

              <div className="account">
                Don't have an account?{" "}
                <Link to="/login">
                  <span className="link-login">login</span>
                </Link>
              </div>
              <div className="social-message">
                <div className="line"></div>
                <p className="message">Login with social accounts</p>
                <div class="line"></div>
              </div>
              <div className="social-icons">
                <Button aria-label="Log in with Google" className="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                    class="w-5 h-5 fill-current"
                  >
                    <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                  </svg>
                </Button>
                <Button aria-label="Log in with Twitter" className="icon">
                  <div className="facebook_icon">
                    <i class="bx bxl-facebook-circle"></i>
                  </div>
                </Button>
                <Button aria-label="Log in with GitHub" className="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                    class="w-5 h-5 fill-current"
                  >
                    <path d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z"></path>
                  </svg>
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
