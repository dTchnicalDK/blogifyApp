import React, { useContext, useEffect } from "react";
import { Outlet } from "react-router";
import AppSideBar from "../AppSideBar";
import TopBar from "../TopBar";
import Footer1 from "../Footer1";

const UserLayout = () => {
  return (
    <div className="w-full flex flex-col">
      <div id="top-bar" className="w-full z-20 border  bg-white fixed">
        <TopBar />
      </div>

      <div id="main-sec" className="w-full flex justify-between items-center  ">
        <div id="sidebar">
          <AppSideBar />
        </div>
        <main className=" w-full flex flex-col justify-center items-center py-3.5 px-2.5 mt-15 bg-gradient-to-br from-slate-100 to-indigo-100">
          <div className="container mb-20 mt-5">
            <Outlet />
          </div>
          <Footer1 className="relative bottom-0 " />
        </main>
      </div>
    </div>
  );
};

export default UserLayout;
