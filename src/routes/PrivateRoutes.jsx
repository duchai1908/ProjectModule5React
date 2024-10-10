import React from "react";
import LazyLoader from "../components/LazyLoad";
import AdminLayout from "../layouts/admin/AdminLayout";

const DashBoardPage = React.lazy(() => import("../pages/admin/dashBoard"));
const ProductManager = React.lazy(() =>
  import("../pages/admin/productManager")
);
const ProductDetailManager = React.lazy(() =>
  import("../pages/admin/productDetailManager")
);

const CustomerManagerPage = React.lazy(() =>
  import("../pages/admin/customerManager")
);
const ColorManager = React.lazy(() => import("../pages/admin/colorManager"));
const SizeManager = React.lazy(() => import("../pages/admin/sizeManager"));

const CategoryManagerPage = React.lazy(() =>
  import("../pages/admin/caterogyManager")
);
const OrderManagerPage = React.lazy(() =>
  import("../pages/admin/orderManager")
);

const BannerManager = React.lazy(() => import("../pages/admin/bannerManager"));

const CouponManager = React.lazy(() => import("../pages/admin/couponManager"));
const NotFound = React.lazy(() => import("../pages/error/NotFound"));
const CommentManager = React.lazy(() =>
  import("../pages/admin/commentManager")
);

const PrivateRoutes = [
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <LazyLoader children={<DashBoardPage />} />,
      },
      {
        path: "customer-manager",
        element: <LazyLoader children={<CustomerManagerPage />} />,
      },
      {
        path: "category-manager",
        element: <LazyLoader children={<CategoryManagerPage />} />,
      },
      {
        path: "product-manager",
        element: <LazyLoader children={<ProductManager />} />,
      },
      {
        path: "product-detail-manager/:id",
        element: <LazyLoader children={<ProductDetailManager />} />,
      },
      {
        path: "color-manager",
        element: <LazyLoader children={<ColorManager />} />,
      },
      {
        path: "size-manager",
        element: <LazyLoader children={<SizeManager />} />,
      },
      {
        path: "order-manager",
        element: <LazyLoader children={<OrderManagerPage />} />,
      },
      {
        path: "banner-manager",
        element: <LazyLoader children={<BannerManager />} />,
      },
      {
        path: "coupon-manager",
        element: <LazyLoader children={<CouponManager />} />,
      },
      {
        path: "comment-manager",
        element: <LazyLoader children={<CommentManager />} />,
      },
    ],
  },
  {
    path: "*", // Đường dẫn cho các link không hợp lệ
    element: <LazyLoader children={<NotFound />} />, // Trang lỗi tùy chỉnh
  },
];
export default PrivateRoutes;
