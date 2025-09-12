import { userContext } from "@/contexts/UserContexProvider";
import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { toast } from "react-toastify";

const OnlyAdminAllowed = ({ children }) => {
  const { loggedUser, logout } = useContext(userContext);
  if (loggedUser && loggedUser.role === "admin") {
    return children;
    // <Outlet />;
  } else {
    logout();
    toast.error("Not Authorised! conatact admin");
    return <Navigate to={"/login"} replace />;
  }
};

export default OnlyAdminAllowed;
