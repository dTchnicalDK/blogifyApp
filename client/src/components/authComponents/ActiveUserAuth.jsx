import { userContext } from "@/contexts/UserContexProvider";
import React, { useContext } from "react";
import { Navigate } from "react-router";
import { toast } from "react-toastify";

const ActiveUserAuth = ({ children }) => {
  const { loggedUser, logout } = useContext(userContext);
  // console.log("user check context", loggedUser);
  if (loggedUser && loggedUser.userStatus === "active") {
    return children;
  } else {
    logout();
    toast.error("Login first !");
    return <Navigate to={"/login"} replace />;
  }
};

export default ActiveUserAuth;
