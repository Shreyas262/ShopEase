import { createBrowserRouter } from "react-router-dom";

import AppLayout from "../layouts/AppLayout";

import Home from "../pages/home/Home";
import Products from "../pages/products/Products";
import ProductDetails from "../pages/products/ProductDetails";

import Cart from "../pages/cart/Cart";
import Wishlist from "../pages/wishlist/Wishlist";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import Checkout from "../pages/checkout/Checkout";
import OrderConfirmation from "../pages/orderConfirmation/OrderConfirmation";

import Profile from "../pages/profile/Profile";

import Orders from "../pages/orders/Orders";
import OrderDetails from "../pages/orders/OrderDetails";

import NotFound from "../pages/not_found/NotFound";

import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    Component: AppLayout,

    children: [
      {
        index: true,
        Component: Home,
      },

      {
        path: "products",
        Component: Products,
      },

      {
        path: "products/:id",
        Component: ProductDetails,
      },

      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },

      {
        path: "wishlist",
        element: (
          <ProtectedRoute>
            <Wishlist />
          </ProtectedRoute>
        ),
      },

      {
        path: "checkout",
        element: (
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        ),
      },

      {
        path: "order-confirmation",
        element: (
          <ProtectedRoute>
            <OrderConfirmation />
          </ProtectedRoute>
        ),
      },

      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },

      {
        path: "orders",
        element: (
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        ),
      },

      {
        path: "orders/:orderId",
        Component: OrderDetails,
      },

      {
        path: "login",
        Component: Login,
      },

      {
        path: "register",
        Component: Register,
      },
    ],
  },

  {
    path: "*",
    Component: NotFound,
  },
]);

export default router;