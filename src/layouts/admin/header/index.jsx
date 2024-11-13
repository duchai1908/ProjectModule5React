import "../admin.css";
import { Avatar, Button, Dropdown, theme } from "antd";
import { Header } from "antd/es/layout/layout";
import {
  BellFilled,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

export default function HeaderAdmin({ onToggleMenu, isCollapsed }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () =>{
    dispatch(logout());
    navigate("/login")
  }
  const items = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href=""
          onClick={handleLogout}
        >
          Đăng xuất
        </a>
      ),
    },
  ];
  return (
    <>
      <Header
        className="fixed-header "
        style={{
          padding: 0,
          background: "white",
        }}
      >
        <div className="h-full px-6 flex justify-between items-center">
          <Button
            type="text"
            icon={isCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={onToggleMenu}
            style={{
              fontSize: "16px",
            }}
          />

          <div>
            <BellFilled className="text-[24px] mr-5" />
            <Dropdown menu={{ items }} placement="bottomLeft" arrow>
              <Avatar size={36} icon={<UserOutlined />} />
            </Dropdown>
          </div>
        </div>
      </Header>
    </>
  );
}
