import React, { useEffect } from "react";
// import HeaderLayout from './header'
import FooterLayout from "./footer";
import { Outlet } from "react-router-dom";
import HeaderGenaral from "./header";
import "../../assets/user.css";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { loadUserFromCookie } from "../../services/authService";

export default function UserLayout() {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = JSON.parse(Cookies.get("token"));
    dispatch(loadUserFromCookie(token));
  }, []);
  return (
    <>
      <main className="overflow-hidden">
        <HeaderGenaral />
        <Outlet />
        <FooterLayout />
      </main>
    </>
  );
}
