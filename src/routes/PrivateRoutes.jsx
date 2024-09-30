import React from "react";
import LazyLoader from "../components/LazyLoad";
import AdminLayout from "../layouts/admin/AdminLayout";
import ManagerProduct from "../pages/admin/manager-products";

const DashboardPage = React.lazy(() => import("../pages/admin/dashboard/Dashboard"))
const PrivateRoutes = [
    {
        path: "/admin",
        element: <AdminLayout/>,
        children: [
            {
                index:true,
                element: <LazyLoader children={<DashboardPage/>} />
            },
            {
                path:"manager-product",
                element: <ManagerProduct/>
            }
        ]
    }
]
export default PrivateRoutes