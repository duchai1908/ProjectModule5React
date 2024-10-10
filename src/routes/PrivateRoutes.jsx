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
    ],
  },
];
export default PrivateRoutes;
// customer-manager
