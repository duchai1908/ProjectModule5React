import React from "react";
import AdminLayout from "../layouts/admin/AdminLayout";
import LazyLoader from "../components/LazyLoad";

const DashboardPage = React.lazy(() => import("../pages/admin/dashboard"))
const PrivateRoutes = [
    {
        path: "/admin",
        element: <AdminLayout/>,
        children: [
            {
                index:true,
                element: <LazyLoader children={<DashboardPage/>} />
            }
        ]
    }
]
export default PrivateRoutes