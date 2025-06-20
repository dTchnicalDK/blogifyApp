import "./App.css";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router";
import React, { useState } from "react";
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
import Blogs from "./components/pages/Blogs";
import LayoutDefault from "./components/layouts/LayoutDefault";
import LandingPage from "./components/pages/LandingPage";
import UserDashboard from "./components/pages/UserDashboard";

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
            <UserDashboard
              setUser={setLoggedInUser}
              LoggedInUser={LoggedInUser}
            />
          ),
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />;
    </>
  );
}

export default App;
