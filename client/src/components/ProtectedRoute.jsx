import React, { useContext } from "react";
import { userContext } from "../contexts/UserContexProvider";
import { Navigate } from "react-router";

const ProtectedRoute = ({ children }) => {
  const { loggedUser } = useContext(userContext);

  if (!loggedUser) {
    return <Navigate to={"/login"} />;
  }
  return children;
};

export default ProtectedRoute;
