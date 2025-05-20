import "./App.css";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router";
import React from "react";
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
import Blogs from "./components/pages/Blogs";
import LayoutDefault from "./components/layouts/LayoutDefault";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LayoutDefault />,
      children: [
        {
          index: true,
          element: <h2>welcome landing page</h2>,
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "blogs",
          element: <Blogs />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
