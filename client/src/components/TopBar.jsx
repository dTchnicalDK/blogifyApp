import React, { useContext } from "react";
import logo from "@/assets/logo2.jpg";
import { Button } from "./ui/button";
import { IoMdLogIn, IoMdLogOut } from "react-icons/io";
import { Link, Navigate, useNavigate } from "react-router";
import SearchBar from "./SearchBar";
import { userContext } from "@/contexts/UserContexProvider";
import axios from "axios";
import { toast } from "react-toastify";
import UserProfileImage from "./UserProfileImage";

const TopBar = () => {
  const { loggedUser, logOut } = useContext(userContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axios.get("http://localhost:2000/api/user/logout", {
        withCredentials: true,
      });
      //   console.log("check logout", res);
      logOut();
      toast.info(res.data.msg);
      navigate("/login");
    } catch (error) {
      console.log("logout error", error);
      toast.error(error.response?.msg || "logout error");
    }
  };

  return (
    <div className="bg-white px-3 flex justify-between items-center border-b-2  w-full border-slate-400 shadow ">
      <div>
        <img src={logo} alt="logo" width={"70px"} />
      </div>

      <div>
        <SearchBar />
      </div>
      <div>
        {loggedUser ? (
          <div className="flex items-center gap-3">
            <UserProfileImage />
            <Button
              className="rounded-full  px-5 text-2xl bg-slate-400 text-white  hover:bg-slate-600 "
              onClick={handleLogout}
            >
              <IoMdLogOut /> <span>SignOut</span>
            </Button>
          </div>
        ) : (
          <>
            <Button
              className="rounded-full  px-5 text-2xl bg-slate-400 text-white  hover:bg-slate-600 "
              onClick={() => navigate("/login")}
            >
              <IoMdLogIn /> <span>SignIn</span>
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default TopBar;
