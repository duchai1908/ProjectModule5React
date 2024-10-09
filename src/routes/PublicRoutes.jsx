import React from "react";
import UserLayout from "../layouts/user/UserLayout";
import LazyLoader from "../components/LazyLoad";
import TestPage from "../pages/user/test";

// const LoginPageUser = React.lazy(() => import("../pages/user/login"))
const HomePage = React.lazy(() => import("../pages/user/home"));
const ListProducts = React.lazy(() => import("../pages/user/list-products"));
const Contact = React.lazy(() => import("../pages/user/contact"));
const About = React.lazy(() => import("../pages/user/about"));
const ProductDetail = React.lazy(() => import("../pages/user/product-detail"));
const LoginPage = React.lazy(() => import("../pages/auth/login"));
const RegisterPage = React.lazy(() => import("../pages/auth/register"));
const UserDetailPage = React.lazy(() => import("../pages/user/userDetail"));
const CheckOutPage = React.lazy(() => import("../pages/user/checkOut"));
const CartDetailPage = React.lazy(() => import("../pages/user/cartDetail"));
const WishListPage = React.lazy(() => import("../pages/user/wishList"));

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
        path: "list-products",
        element: <LazyLoader children={<ListProducts />} />,
      },
      {
        path: "product-detail/:id",
        element: <LazyLoader children={<ProductDetail />} />,
      },
      {
        path: "about",
        element: <LazyLoader children={<About />} />,
      },
      {
        path: "contact",
        element: <LazyLoader children={<Contact />} />,
      },

      {
        path: "checkout",
        element: <LazyLoader children={<CheckOutPage />} />,
      },
      {
        path: "cart-detail",
        element: <LazyLoader children={<CartDetailPage />} />,
      },
      {
        path: "wish-list",
        element: <LazyLoader children={<WishListPage />} />,
      },

      {
        path: "login",
        element: <LazyLoader children={<LoginPage />} />,
      },
      {
        path: "register",
        element: <LazyLoader children={<RegisterPage />} />,
      },
      {
        path: "user-detail",
        element: <LazyLoader children={<UserDetailPage />} />,
      },
    ],
  },
  //test
  {
    path: "test",
    element: <TestPage />,
  },
];
export default PublicRoutes;
