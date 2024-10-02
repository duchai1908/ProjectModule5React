import React from "react";
import UserLayout from "../layouts/user/UserLayout";
import LazyLoader from "../components/LazyLoad";

const HomePage = React.lazy(() => import("../pages/user/home"))
const ListProducts = React.lazy(() => import("../pages/user/list-products"))
const ProductDetail = React.lazy(() => import("../pages/user/product-detail"))
const LoginPageUser = React.lazy(() => import("../pages/user/login"))

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
                element: <LazyLoader children={<ListProducts/>} />
            },
            {
                path:"/product-detail/:id",
                element: <LazyLoader children={<ProductDetail/>} />
            },
            {
                path:"/login",
                element: <LazyLoader children={<LoginPageUser/>} />
            },
        ]
    }
]
export default PublicRoutes