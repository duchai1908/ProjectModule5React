import "../admin.css";
import {
  SolutionOutlined,
  UserOutlined,
  ProductFilled,
  AppstoreOutlined,
  StockOutlined,
  AuditOutlined,
  BgColorsOutlined,
  GatewayOutlined,
  FileImageOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { Link, useLocation } from "react-router-dom";

export default function SidebarAdmin() {
  const location = useLocation(); // Hook để lấy thông tin đường dẫn hiện tại
  const currentPath = location.pathname; // Lấy đường dẫn hiện tại

  return (
    <>
      <div className="item_title">
        <Link className="title_profile" to="/admin">
          Corona Admin
        </Link>
      </div>
      <span className="line"></span>
      <div className="demo-logo-vertical" />
      <Menu theme="dark" mode="inline" selectedKeys={[currentPath]}>
        <Menu.Item key="/admin" icon={<AppstoreOutlined />}>
          <Link to="/admin">DashBoard</Link>
        </Menu.Item>
        <Menu.Item key="/admin/customer-manager" icon={<UserOutlined />}>
          <Link to="/admin/customer-manager">User Manager</Link>
        </Menu.Item>
        <Menu.Item key="/admin/category-manager" icon={<AuditOutlined />}>
          <Link to="/admin/category-manager">Category Manager</Link>
        </Menu.Item>
        <Menu.Item key="/admin/product-manager" icon={<ProductFilled />}>
          <Link to="/admin/product-manager">Product Manager</Link>
        </Menu.Item>
        <Menu.Item key="/admin/order-manager" icon={<SolutionOutlined />}>
          <Link to="/admin/order-manager">Order Manager</Link>
        </Menu.Item>
        <Menu.Item key="/admin/color-manager" icon={<BgColorsOutlined />}>
          <Link to="/admin/color-manager">Color Manager</Link>
        </Menu.Item>
        <Menu.Item key="/admin/size-manager" icon={<GatewayOutlined />}>
          <Link to="/admin/size-manager">Size Manager</Link>
        </Menu.Item>
        <Menu.Item key="/admin/coupon-manager" icon={<StockOutlined />}>
          <Link to="/admin/coupon-manager">Coupon Manager</Link>
        </Menu.Item>
        <Menu.Item key="/admin/comment-manager" icon={<StockOutlined />}>
          <Link to="/admin/comment-manager">Comment Manager</Link>
        </Menu.Item>
        <Menu.Item key="/admin/charts" icon={<StockOutlined />}>
          <Link to="/admin/charts">Charts</Link>
        </Menu.Item>
      </Menu>
    </>
  );
}
