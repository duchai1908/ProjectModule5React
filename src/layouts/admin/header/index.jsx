import "../admin.css";
import { Avatar, Button, Dropdown, theme } from "antd";
import { Header } from "antd/es/layout/layout";
import {
  BellFilled,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";

export default function HeaderAdmin({ onToggleMenu, isCollapsed }) {
  const items = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          1st menu item
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          2nd menu item
        </a>
      ),
    },
    {
      key: "3",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.luohanacademy.com"
        >
          3rd menu item
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
            <BellFilled className="text-[24px]" />
            <Dropdown
              menu={{
                items,
              }}
              placement="bottomCenter"
            >
              {/* <Button className=""> */}
              <Avatar size={36} icon={<UserOutlined />} />
              {/* </Button> */}
            </Dropdown>
          </div>
        </div>
      </Header>
    </>
  );
}
