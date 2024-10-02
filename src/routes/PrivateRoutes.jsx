import React from "react";
import LazyLoader from "../components/LazyLoad";
import AdminLayout from "../layouts/admin/AdminLayout";

const DashBoardPage = React.lazy(() => import("../pages/admin/dashBoard"));

const CustomerManagerPage = React.lazy(() =>
  import("../pages/admin/customerManager")
);
const CategoryManagerPage = React.lazy(() =>
  import("../pages/admin/categoryManager")
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
    ],
  },
];
export default PrivateRoutes;
