import React from "react";
import { Link } from "react-router-dom";
import "./login.css";
import { Button, Input } from "antd";
export default function Login() {
  return (
    <>
      <div className="container-register">
        <div className="content-register box">
          <h2>Login</h2>
          <div className="form-auth">
            <form>
              <div className="control">
                <Input
                  type="text"
                  placeholder="Enter your email"
                  className="control_item"
                ></Input>
              </div>
              <div className="control password">
                <Input.Password
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="control_item"
                ></Input.Password>
              </div>
              <Link to="/change">
                <span className="link-change_password">change password?</span>
              </Link>
              <div className="btn">
                <Button className="button">Login</Button>
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
