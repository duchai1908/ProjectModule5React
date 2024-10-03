import React, { useState } from "react";
import "../admin.css";
import {
  SolutionOutlined,
  UserOutlined,
  ProductFilled,
  AppstoreOutlined,
  StockOutlined,
  AuditOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { Link } from "react-router-dom";

const { Sider } = Layout;
export default function SidebarAdmin() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <>
      <div className="item_title">
        <Link className="title_profile" to="/admin">
          Corona Admin
        </Link>
      </div>
      <span className="line"></span>
      <div className="demo-logo-vertical" />
      <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
        <Menu.Item key="1" icon={<AppstoreOutlined />}>
          <Link to="/admin">DashBoard</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<UserOutlined />}>
          <Link to="/admin/customer-manager">User Manager</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<AuditOutlined />}>
          <Link to="/admin/category-manager">Category Manager</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<ProductFilled />}>
          <Link to="product">Product Manager</Link>
        </Menu.Item>
        <Menu.Item key="5" icon={<SolutionOutlined />}>
          <Link to="order">Order Manager</Link>
        </Menu.Item>
        <Menu.Item key="6" icon={<StockOutlined />}>
          <Link to="charts">Charts</Link>
        </Menu.Item>
      </Menu>
    </>
  );
}
