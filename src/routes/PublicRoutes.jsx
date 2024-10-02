import React from "react";
import UserLayout from "../layouts/user/UserLayout";
import LazyLoader from "../components/LazyLoad";
import ListProducts from "../pages/user/list-products";
import ProductDetail from "../pages/user/product-detail";

const HomePage = React.lazy(() => import("../pages/user/home"));
const WishListPage = React.lazy(() => import("../pages/user/wishList"));
const CartListPage = React.lazy(() => import("../pages/user/cartList"));
const CartDetailPage = React.lazy(() => import("../pages/user/cartDetail"));
const CheckOutPage = React.lazy(() => import("../pages/user/checkOut"));

const PublicRoutes = [
  {
    path: "/",
    element: <UserLayout />,
    children: [
      {
        index: true,
        element: <LazyLoader children={<HomePage />} />,
      },
      {
        path: "/list-products",
        element: <ListProducts />,
      },
      {
        path: "/product-detail",
        element: <LazyLoader children={<ProductDetail />} />,
      },
      {
        path: "wish-list",
        element: <LazyLoader children={<WishListPage />} />,
      },
      {
        path: "cart-list",
        element: <LazyLoader children={<CartListPage />} />,
      },
      {
        path: "cart-detail",
        element: <LazyLoader children={<CartDetailPage />} />,
      },
      {
        path: "checkout",
        element: <LazyLoader children={<CheckOutPage />} />,
      },
    ],
  },
];
export default PublicRoutes;
