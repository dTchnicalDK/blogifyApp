import axios from "axios";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { userContext } from "../../contexts/UserContexProvider";

function UserDashboard({ setUser, LoggedInUser }) {
  const { loggedUser, login, logOut } = useContext(userContext);
  const navigate = useNavigate();
  // const [resUser, setResUser] = useState("");
  useEffect(() => {
    try {
      axios
        .get("http://localhost:2000/api/user/authenticate", {
          withCredentials: true,
        })
        .then((res) => {
          console.log("res before set user is", res.data.user);
          login(res.data.user);
        });
    } catch (error) {
      console.log("user fetching error, UserDashboard", error);
    }
  }, []);
  return (
    <div>
      <h1 className="text-4xl text-orange-700 font-bold">
        Welcome Mr.
        {loggedUser.email}
      </h1>{" "}
      {JSON.stringify(loggedUser)}
    </div>
  );
}

export default UserDashboard;
