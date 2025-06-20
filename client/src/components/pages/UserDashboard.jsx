import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";

function UserDashboard({ setUser, LoggedInUser }) {
  const navigate = useNavigate();
  // const [resUser, setResUser] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:2000/api/user/authenticate", {
        withCredentials: true,
      })
      .then((res) => {
        // setResUser(res.data.user);
        setUser(res.data.user);
        navigate(window.location.pathname);
      });
  }, []);
  return (
    <div className="container mb-8.5 relative bg-amber-400">
      {/* <h2>welcome {resUser ? resUser.email : "Unknown"}</h2> */}
      <h1 className="">
        welcome to you {LoggedInUser ? LoggedInUser.email : "Unknown"}
      </h1>
    </div>
  );
}

export default UserDashboard;
