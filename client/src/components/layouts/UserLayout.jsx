import React, { useContext, useEffect } from "react";
import { Outlet } from "react-router";
import AppSideBar from "../AppSideBar";
import TopBar from "../TopBar";
import Footer1 from "../Footer1";

const UserLayout = () => {
  return (
    <div className=" flex flex-col   bg-slate-50">
      <div id="top-bar" className="w-full z-20 border  py-2 bg-slate-50 fixed">
        <TopBar />
      </div>

      <div
        id="main-sec"
        className="w-screen  flex justify-between mt-[70px] bg-slate-50 "
      >
        <div id="sidebar">
          <AppSideBar />
        </div>
        <main className=" w-full flex flex-col justify-center items-center py-3.5 px-2.5 mt-3.5">
          <div className="mb-20">
            <Outlet />
          </div>
          <Footer1 className="relative bottom-0 " />
        </main>
      </div>
    </div>
  );
};

export default UserLayout;
