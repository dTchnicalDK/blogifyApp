import "./App.css";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router";
import React, { useState } from "react";
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
import Blogs from "./components/pages/Blogs";
import LayoutDefault from "./components/layouts/LayoutDefault";
import LandingPage from "./components/pages/LandingPage";
import UserDashboard from "./components/pages/UserDashboard";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/ProtectedRoute";
import UserLayout from "./components/layouts/UserLayout";
import ClientBoard from "./components/pages/ClientBoard";

function App() {
  const [LoggedInUser, setLoggedInUser] = useState("");
  // console.log("app loggedInUser", LoggedInUser);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LayoutDefault loggedInUser={LoggedInUser} />,
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
          element: (
            <Login setUser={setLoggedInUser} LoggedInUser={LoggedInUser} />
          ),
        },
        {
          path: "blogs",
          element: <Blogs />,
        },
        {
          path: "udashboard",
          element: (
            <ProtectedRoute>
              <UserDashboard
                setUser={setLoggedInUser}
                LoggedInUser={LoggedInUser}
              />
            </ProtectedRoute>
          ),
        },
      ],
    },
    {
      path: "/user",
      element: <UserLayout />,
      children: [{ index: true, element: <ClientBoard /> }],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />;
      <ToastContainer />
    </>
  );
}

export default App;
