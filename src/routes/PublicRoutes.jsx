import React from "react";
import UserLayout from "../layouts/user/UserLayout";
import LazyLoader from "../components/LazyLoad";
import ListProducts from "../pages/user/list-products";
import ProductDetail from "../pages/user/product-detail";

const HomePage = React.lazy(() => import("../pages/user/home"))

const PublicRoutes = [
    {
        path: "/",
        element: <UserLayout/>,
        children: [
            {
                index:true,
                element: <LazyLoader children={<HomePage/>} />
            },
            {
                path:"/list-products",
                element: <ListProducts/>
            },
            {
                path:"/product-detail",
                element: <LazyLoader children={<ProductDetail/>} />
            },
        ]
    }
]
export default PublicRoutes