import React from "react";
import UserLayout from "../layouts/user/UserLayout";
import LazyLoader from "../components/LazyLoad";

const HomePage = React.lazy(() => import("../pages/user/home"))

const PublicRoutes = [
    {
        path: "/",
        element: <UserLayout/>,
        children: [
            {
                index:true,
                element: <LazyLoader children={<HomePage/>} />
            }
        ]
    }
]
export default PublicRoutes