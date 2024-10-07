import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import { Button, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../services/authService";
export default function Login() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Khởi tạo useNavigate
  const { user, status, error } = useSelector((state) => state.auth);
  console.log("User:", user);
  console.log("Status:", status);
  console.log("Error:", error);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username && password) {
      console.log("Login Data:", { username, password });

      try {
        const resultAction = await dispatch(loginUser({ username, password }));

        if (loginUser.fulfilled.match(resultAction)) {
          console.log("Login successful!", resultAction.payload);
          navigate("/product-detail/:id");
        } else {
          console.log("Login failed!", resultAction.error);
        }
      } catch (error) {
        console.log("An error occurred during login:", error);
      }
    } else {
      console.log("Username or Password is empty");
    }
  };

  useEffect(() => {
    if (status === "failed") {
      console.log("Login failed with error:", error);
    }
  }, [status, error]);

  return (
    <>
      <div className="container-register">
        <div className="content-register box">
          <h2>Login</h2>
          <div className="form-auth">
            <form onSubmit={handleSubmit}>
              <div className="control">
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your email"
                  className="control_item"
                ></Input>
              </div>
              <div className="control password">
                <Input.Password
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="control_item"
                ></Input.Password>
              </div>
              <Link to="/change">
                <span className="link-change_password">change password?</span>
              </Link>
              <div className="btn">
                <Button className="button" type="primary" htmlType="submit">
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
