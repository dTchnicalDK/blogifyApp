import "./App.css";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router";
import React, { useEffect, useState } from "react";
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
import LayoutDefault from "./components/layouts/LayoutDefault";
import LandingPage from "./components/pages/LandingPage";
import UserDashboard from "./components/pages/UserDashboard";
import { ToastContainer } from "react-toastify";
import UserLayout from "./components/layouts/UserLayout";
import ClientBoard from "./components/pages/ClientBoard";
import UpdateProfile from "./components/pages/UpdateProfile";
import CategoriesDetails from "./components/pages/categories/CategoriesDetails";
import CategorieUpdate from "./components/pages/categories/CategorieUpdate";
import AddCategories from "./components/pages/categories/AddCategories";
import AddBlog from "./components/pages/blogs/AddBlog";
import UpdateBlog from "./components/pages/blogs/UpdateBlog";
import BlogDetails from "./components/pages/blogs/blogDetails";
import SingleBlog from "./components/pages/blogs/SingleBlog";
import CategoryBlog from "./components/pages/blogs/CategoryBlog";
import SearchPage from "./components/pages/SearchPage";
import UserDetails from "./components/pages/UserDetails";
import CommentDetails from "./components/pages/CommentDetails";
import ActiveUserAuth from "./components/authComponents/ActiveUserAuth";
import OnlyAdminAllowed from "./components/authComponents/OnlyAdminAllowed";
import UserCommentsDetails from "./components/pages/UserComment";
import MyBlogsList from "./components/pages/blogs/MyBlogsList";
import { SidebarProvider } from "./components/ui/sidebar";
import PrivacyPolicy from "./components/pages/legalPages/PrivacyPolicy";
import TermsOfService from "./components/pages/legalPages/TermsOfServices";
import ContactPage from "./components/pages/company/ContactPage";
import CareersPage from "./components/pages/company/CareerPage";
import AboutUs from "./components/pages/company/AboutUs";
import StunningLandingPage from "./components/pages/other/StunningLandingPage";

function App() {
  const [LoggedInUser, setLoggedInUser] = useState("");

  const router = createBrowserRouter([
    ///////////////public route/////////////////////
    {
      path: "/",
      element: <LayoutDefault loggedInUser={LoggedInUser} />,
      children: [
        {
          index: true,
          // element: <LandingPage />,
          element: <StunningLandingPage />,
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
          path: "udashboard",
          element: <UserDashboard />,
        },
        // -------------------------------------
        { path: "privacy-policy", element: <PrivacyPolicy /> },
        { path: "terms", element: <TermsOfService /> },
        { path: "contact", element: <ContactPage /> },
        { path: "careers", element: <CareersPage /> },
        { path: "about", element: <AboutUs /> },
      ],
    },
    /////////////////user Auth route////////////
    {
      path: "/user",
      element: (
        // <SidebarProvider>
        <UserLayout />
        // </SidebarProvider>
      ),
      children: [
        { index: true, element: <ClientBoard /> },
        { path: "single-blogs/:id", element: <SingleBlog /> },
        { path: "search", element: <SearchPage /> },
        { path: "category-blogs/:categoryid", element: <CategoryBlog /> },
        // { path: "comment-details", element: <UserCommentsDetails /> },
        // { path: "privacy-policy", element: <PrivacyPolicy /> },

        {
          path: "update-profile",
          element: (
            <ActiveUserAuth>
              <UpdateProfile />
            </ActiveUserAuth>
          ),
        },
        {
          path: "user-comments",
          element: (
            <ActiveUserAuth>
              <UserCommentsDetails />
            </ActiveUserAuth>
          ),
        },

        // blogs routes
        {
          path: "blog/add",
          element: (
            <ActiveUserAuth>
              <AddBlog />
            </ActiveUserAuth>
          ),
        },

        {
          path: "blogs-details",
          element: (
            <ActiveUserAuth>
              <BlogDetails />
            </ActiveUserAuth>
          ),
        },
        {
          path: "my-blogs-details",
          element: (
            <ActiveUserAuth>
              <MyBlogsList />
            </ActiveUserAuth>
          ),
        },

        {
          path: "blogs/update/:id",
          element: (
            <ActiveUserAuth>
              <UpdateBlog />
            </ActiveUserAuth>
          ),
        },
      ],
    },
    /////////////only admin allowed route//////////////////
    {
      path: "/admin",
      element: (
        <OnlyAdminAllowed>
          <UserLayout />
        </OnlyAdminAllowed>
      ),
      children: [
        {
          path: "details",
          element: <UserDetails />,
        },
        { path: "comment-details", element: <CommentDetails /> },
        { path: "categories", element: <CategoriesDetails /> },
        { path: "categories/add", element: <AddCategories /> },
        { path: "categories/update/:id", element: <CategorieUpdate /> },
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
