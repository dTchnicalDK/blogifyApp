import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { userContext } from "../../contexts/UserContexProvider";
import { toast } from "react-toastify";
import Spinner from "../Spinner";

function UserDashboard() {
  const { loggedUser, login, logOut } = useContext(userContext);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const authenticateUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:2000/api/user/authenticate",
          { withCredentials: true }
        );

        if (response.data.user) {
          login(response.data.user);
        } else {
          throw new Error("No user data received");
        }
      } catch (error) {
        console.error("Dashboard authentication error:", error);

        toast.error(
          error.response?.data?.msg ||
            "Session expired or unauthorized. Please login again.",
          { position: "top-center" }
        );

        if ([401, 403, 500].includes(error.response?.status)) {
          logOut();
          navigate("/login");
        }
      } finally {
        setIsLoading(false);
      }
    };

    authenticateUser();
  }, [login, logOut, navigate]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <h1 className="text-4xl text-orange-700 font-bold">
        Welcome Mr. {loggedUser?.email}
      </h1>
      <pre>{JSON.stringify(loggedUser, null, 2)}</pre>
    </div>
  );
}

export default UserDashboard;
