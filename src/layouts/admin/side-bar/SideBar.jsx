import React from "react";
import { Link } from "react-router-dom";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UsergroupAddOutlined,
  FileDoneOutlined,
  FileImageOutlined,
  TagOutlined,
  ProductOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
// import "../../../public/admin.css";
import "../../../assets/admin.css"

const { Sider } = Layout;

export default function SideBar({ collapsed }) {
  // Define your menu items and their paths
  const menuItems = [
    {
      key: "1",
      icon: <UserOutlined />,
      label: <Link to="/admin">Dashboard</Link>,
    },
    {
      key: "2",
      icon: <ProductOutlined />,
      label: <Link to="/admin/manager-category">Manager Category</Link>,
    },
    {
      key: "3",
      icon: <VideoCameraOutlined />,
      label: <Link to="/admin/manager-product">Manager Product</Link>,
    },
    {
      key: "4",
      icon: <UsergroupAddOutlined />,
      label: <Link to="/admin/other-page">Manager User</Link>,
    },
    {
      key: "5",
      icon: <FileDoneOutlined />,
      label: <Link to="/admin/other-page">Manager Order</Link>,
    },
    {
      key: "6",
      icon: <FileImageOutlined />,
      label: <Link to="/admin/other-page">Manager Banner</Link>,
    },
    {
      key: "7",
      icon: <TagOutlined />,
      label: <Link to="/admin/other-page">Manager Coupon</Link>,
    },
    {
      key: "8",
      icon: <ProductOutlined />,
      label: <Link to="/admin/other-page">Manager Category</Link>,
    },
  ];

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="demo-logo-vertical" />
      <Menu
        className="custom-menu" // Add custom class to the Menu
        theme="light"
        mode="inline"
        items={menuItems}
        defaultSelectedKeys={["1"]}
      />
    </Sider>
  );
}