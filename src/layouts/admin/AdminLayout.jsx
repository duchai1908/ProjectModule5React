import React, { useEffect, useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, theme } from "antd";
import { Outlet } from "react-router-dom";
import SidebarAdmin from "./sidebar";
import HeaderAdmin from "./header";
import "./admin.css";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { loadUserFromCookie } from "../../services/authService";
const { Header, Sider, Content } = Layout;
export default function AdminLayout() {

  const dispatch = useDispatch();
  useEffect(() => {
    if (Cookies.get("token") != null) {
      const token = JSON.parse(Cookies.get("token"));
      dispatch(loadUserFromCookie(token));
    }
  }, []);

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const toggleMenu = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <Layout className="h-screen">
      <Sider
        className="fixed-sider"
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={260}
        collapsedWidth={80} //
      >
        <SidebarAdmin />
      </Sider>
      <Layout className="layout_dash">
        {/* Header layout */}
        <HeaderAdmin onToggleMenu={toggleMenu} isCollapsed={collapsed} />
        {/* Content layout */}
        <Content
          className="content-dashboard"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
