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
import UpdateProfile from "./components/pages/UpdateProfile";
import Profile from "./components/pages/Profile";
import CategoriesDetails from "./components/pages/categories/CategoriesDetails";
import CategorieUpdate from "./components/pages/categories/CategorieUpdate";
import AddCategories from "./components/pages/categories/AddCategories";
import path from "path";
import AddBlog from "./components/pages/blogs/AddBlog";
import UpdateBlog from "./components/pages/blogs/UpdateBlog";
import BlogDetails from "./components/pages/blogs/blogDetails";

function App() {
  const [LoggedInUser, setLoggedInUser] = useState("");

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
      element: (
        <ProtectedRoute>
          <UserLayout />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <ClientBoard /> },
        { path: "profile", element: <Profile /> },
        { path: "update-profile", element: <UpdateProfile /> },
        // categories routes
        { path: "categories", element: <CategoriesDetails /> },
        { path: "categories/add", element: <AddCategories /> },
        { path: "categories/update/:id", element: <CategorieUpdate /> },
        // blogs routes
        { path: "user-blogs/:id", element: <Blogs /> },
        { path: "blogs-details", element: <BlogDetails /> },
        { path: "blog/add", element: <AddBlog /> },
        { path: "blogs/update/:id", element: <UpdateBlog /> },
      ],
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
