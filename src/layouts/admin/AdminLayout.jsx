import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, theme } from "antd";
import { Outlet } from "react-router-dom";
import SidebarAdmin from "./sidebar";
import HeaderAdmin from "./header";
import "./admin.css";
const { Header, Sider, Content } = Layout;
export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

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
        <Header
          className="fixed-header "
          style={{
            padding: 0,
            background: "white",
          }}
        >
          <div className="header_control">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
            <HeaderAdmin />
          </div>
        </Header>
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
