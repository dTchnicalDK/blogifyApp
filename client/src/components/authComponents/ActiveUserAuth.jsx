import { userContext } from "@/contexts/UserContexProvider";
import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { toast } from "react-toastify";

const ActiveUserAuth = ({ children }) => {
  const { loggedUser } = useContext(userContext);
  // console.log("user check context", loggedUser);
  if (loggedUser && loggedUser.userStatus === "active") {
    return children;
  } else {
    toast.error("Not authorised ! login with vaid id first!");
    return <Navigate to={"/login"} replace />;
  }
};

export default ActiveUserAuth;
