import "./App.css";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router";
import React from "react";
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
import Blogs from "./components/pages/Blogs";
import LayoutDefault from "./components/layouts/LayoutDefault";
import LandingPage from "./components/pages/LandingPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LayoutDefault />,
      children: [
        {
          index: true,
          element: <LandingPage />,
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
