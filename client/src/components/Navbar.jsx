import React, { useContext, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { userContext } from "../contexts/UserContexProvider";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoCloseOutline } from "react-icons/io5";
import axios from "axios";
import { toast } from "react-toastify";

const NavBar = () => {
  const { loggedUser, logOut } = useContext(userContext);
  const navigate = useNavigate();
  const mobileNavRef = useRef(null);

  const handleLogIn = () => {
    console.log("handleLogIn");
    handleMobileNav();
    navigate("/login");
  };
  const handleLogout = async () => {
    try {
      const res = await axios.get("http://localhost:2000/api/user/logout", {
        withCredentials: true,
      });
      // console.log("check logout", res);
      logOut();
      toast.info(res.data.msg);
      navigate("/login");
    } catch (error) {
      console.log("logout error", error);
      toast.error(error.response?.msg || "logout error");
    }
  };
  const handleMobileNav = () => {
    mobileNavRef.current.classList.toggle("hidden");
  };

  return (
    <div className="min-h-20 bg-gray-900 text-3xl text-white py-3 flex justify-around items-center shadow relative">
      <div>
        <RxHamburgerMenu
          className="absolute top-6.5 left-6.5 md:hidden cursor-pointer"
          onClick={handleMobileNav}
        />
        <Link to={"/"}>
          {" "}
          <img
            src="/images/logo.jpg"
            alt="logo"
            width={"60px"}
            height={"60px"}
            className="rounded-full border-6 border-slate-200"
          />{" "}
        </Link>
      </div>
      <ul className="hidden  md:flex gap-1 w-[60%] justify-around items-center">
        <NavLink to={"/"}>
          <li>Home</li>
        </NavLink>
        <NavLink to={"/login"}>
          <li>login</li>
        </NavLink>
        <NavLink to={"/udashboard"}>
          <li>Dashboard</li>
        </NavLink>
        {loggedUser ? (
          <button className="btn-primary text-slate-50" onClick={handleLogout}>
            SignOut
          </button>
        ) : (
          <button
            className="btn-primary text-slate-50"
            onClick={() => navigate("/login")}
          >
            SignIn
          </button>
        )}
      </ul>
      {/* ////////////////mobile nav////////////////starts here//////////////////////////// */}
      <div
        id="mobile-nav"
        className="absolute left-0 top-0 hidden md:hidden bg-transparent h-screen w-2/3 z-10 "
        ref={mobileNavRef}
      >
        <div
          className="w-20 rounded-tr-3xl pt-6 px-2 bg-slate-500 pb-7 cursor-pointer"
          onClick={handleMobileNav}
        >
          <IoCloseOutline />
        </div>
        <div id="sub-menu" className="bg-slate-500 h-full">
          <ul className="flex flex-col justify-around gap-5 px-5">
            <NavLink to={"/"}>
              <li onClick={handleMobileNav}>Home</li>
            </NavLink>
            <NavLink to={"/login"}>
              <li onClick={handleMobileNav}>login</li>
            </NavLink>
            <NavLink to={"/udashboard"}>
              <li onClick={handleMobileNav}>Dashboard</li>
            </NavLink>
            {loggedUser ? (
              <button
                className="btn-primary text-slate-50"
                onClick={handleLogout}
              >
                SignOut
              </button>
            ) : (
              <button
                className="btn-primary text-slate-50"
                onClick={handleLogIn}
              >
                SignIn
              </button>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
