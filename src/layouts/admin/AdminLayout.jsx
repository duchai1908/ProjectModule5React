import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
// import "../../../public/admin.css";
import "../../assets/admin.css"
import SideBar from "./side-bar/SideBar";
import HeaderAdmin from "./header";

export default function AdminLayout() {
  // Lift the collapsed state here
  const [collapsed, setCollapsed] = useState(false);

  // Function to toggle the sidebar collapsed state
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout className="min-h-screen flex">
      {/* Sidebar */}
      <SideBar collapsed={collapsed} />

      {/* Main Layout */}
      <Layout className="flex h-[100vh] overflow-hidden">
        {/* Header */}
        <HeaderAdmin toggleCollapsed={toggleCollapsed} collapsed={collapsed} />

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </div>
      </Layout>
    </Layout>
  );
}
