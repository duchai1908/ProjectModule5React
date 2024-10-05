import React from "react";
import LazyLoader from "../components/LazyLoad";
import AdminLayout from "../layouts/admin/AdminLayout";
import CategoryManager from "../pages/admin/caterogyManager";
// import CustomerManager from "../pages/admin/customerManager";

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
// const CategoryManagerPage = React.lazy(() =>
//   import("../pages/admin/categoryManager")
// );
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
        element: <CategoryManager />,
      },
      {
        path: "product-manager",
        element: <LazyLoader children={<ProductManager />} />,
      },
      {
        path: "product-detail-manager/:id",
        element: <LazyLoader children={<ProductDetailManager />} />,
      },
    ],
  },
];
export default PrivateRoutes;
// customer-manager
