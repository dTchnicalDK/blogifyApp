import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { userContext } from "../contexts/UserContexProvider";
import axios from "axios";

const NavBar = () => {
  const { loggedUser, logOut } = useContext(userContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axios.get("http://localhost:2000/api/user/logout", {
        withCredentials: true,
      });
      console.log("check logout", res);
      logOut();
      navigate("/login");
    } catch (error) {
      console.log("logout error", error);
    }
  };

  return (
    <div className="bg-gray-900 text-3xl text-white py-3 flex justify-around items-center">
      <div>
        {" "}
        <Link to={"/"}>logo</Link>
      </div>
      <ul className="hidden  md:flex gap-1 w-[60%] justify-around items-center">
        <NavLink to={"/"}>
          <li>Home</li>
        </NavLink>
        <NavLink to={"/register"}>
          <li>register</li>
        </NavLink>
        <NavLink to={"/login"}>
          <li>login</li>
        </NavLink>
        <NavLink to={"/udashboard"}>
          <li>Dashboard</li>
        </NavLink>
        {loggedUser ? (
          <button
            className="bg-green-400 text-white px-3.5 py-1.5 cursor-pointer rounded-2xl"
            onClick={handleLogout}
          >
            SignOut
          </button>
        ) : (
          <button
            className="bg-green-400 text-white px-3.5 py-1.5 cursor-pointer rounded-2xl"
            onClick={() => navigate("/register")}
          >
            SignIn
          </button>
        )}
      </ul>
    </div>
  );
};

export default NavBar;
