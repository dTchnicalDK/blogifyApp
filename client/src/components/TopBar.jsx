import React, { useContext, useState } from "react";
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
import { LuSearch } from "react-icons/lu";
import { IoIosMenu } from "react-icons/io";
const baseUrl = import.meta.env.VITE_BASE_BACKENED_URL;
import { useSidebar } from "@/components/ui/sidebar";

const TopBar = () => {
  const { loggedUser, logout } = useContext(userContext);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const navigate = useNavigate();
  const { toggleSidebar } = useSidebar();

  const handleLogout = async () => {
    try {
      navigate("/login");
      toast.success("user logged out !");
    } catch (error) {
      console.log("logout error", error);
      toast.error(error.response?.msg || error.message || "logout error");
    }
  };

  return (
    <div className="w-full flex justify-between items-center bg-slate-50 px-5 ">
      {/* <div className="text-2xl border border-slate-300"></div> */}

      <div className="md:w-1/12 flex justify-around items-center gap-2">
        <div className="text-3xl text-slate-400 md:hidden cursor-pointer">
          <button onClick={toggleSidebar}>
            <IoIosMenu />
          </button>
        </div>
        <Link to={"/"}>
          <img src={logo} alt="logo" width={"60px"} className="rounded-full" />
        </Link>
      </div>

      <div className="absolute md:top-4 left-[50%] top-22 translate-x-[-50%] border border-slate-800 md:border-none rounded-full">
        <div
          className={`${showSearchBar ? showSearchBar : "hidden"} md:block `}
        >
          <SearchBar />
        </div>
      </div>
      {/* //////////////// DropdownMenu ////////////////// */}
      <div className="flex justify-around items-center gap-1">
        <Button
          onClick={() => setShowSearchBar(!showSearchBar)}
          variant={"ghost"}
          className=" flex justify-end mx-2.5 md:hidden"
        >
          <LuSearch />
        </Button>
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
