import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import AppStore from "./Utils/AppStore";
import "./index.css";

import AppLayout from "./Component/AppLayout";
import AuthLayout from "./Component/AuthLayout";
import ProtectedRoute from "./Component/ProtectedRoute";

import Login from "./Component/Login";
import Register from "./Component/Register";
import ProductList from "./Component/ProductList";
import ProductDetail from "./Component/ProductDetail";
import Category from "./Component/Category";
import Cart from "./Component/Cart";
import Error from "./Component/Error";

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },
  {
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    errorElement: <Error />,
    children: [
      { path: "/", element: <ProductList /> },
      { path: "/cart", element: <Cart /> },
      { path: "/category/:category", element: <Category /> },
      { path: "/productdetail/:id", element: <ProductDetail /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={AppStore}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
