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
import { ImProfile } from "react-icons/im";
import { LiaBlogSolid } from "react-icons/lia";
import { IoIosArrowDown } from "react-icons/io";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
const baseUrl = import.meta.env.VITE_BASE_BACKENED_URL;

const TopBar = () => {
  const { loggedUser, logout } = useContext(userContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const logOutStatus = await axios.get(`${baseUrl}/api/user/logout`, {
        withCredentials: true,
      });
      await logout();
      navigate("/login");
      // console.log("logout status", logOutStatus);
      toast.info(logOutStatus.data.message);
    } catch (error) {
      console.log("logout error", error);
      toast.error(error.response?.msg || error.message || "logout error");
    }
  };

  return (
    <div className="bg-white px-3 flex justify-between items-center border-b-2  w-full border-slate-400 shadow ">
      <div className="w-1/6">
        <Link to={"/"}>
          <img src={logo} alt="logo" width={"70px"} />
        </Link>
      </div>

      <div>
        <SearchBar />
      </div>
      {/* //////////////// DropdownMenu ////////////////// */}
      <div>
        {loggedUser ? (
          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger>
                {" "}
                <div className="flex items-center gap-1.5 cursor-pointer">
                  <UserProfileImage />
                  <IoIosArrowDown />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white rounded">
                <DropdownMenuLabel className="text-xl bg-amber-100">
                  {loggedUser.displayName}
                </DropdownMenuLabel>
                <small>
                  <DropdownMenuLabel className="font-extralight">
                    {loggedUser.email}
                  </DropdownMenuLabel>
                </small>
                <Separator />
                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                  <Link to={"/user/update-profile"}>
                    <ImProfile />
                    profile
                  </Link>
                </DropdownMenuItem>

                <Link>
                  <DropdownMenuItem>
                    {" "}
                    <LiaBlogSolid />
                    Bloggs
                  </DropdownMenuItem>
                </Link>
                <Separator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-red-600 font-bold cursor-pointer"
                >
                  <IoMdLogOut /> <span>SignOut</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
