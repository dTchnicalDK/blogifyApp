import React, { useContext, useEffect } from "react";
import { Outlet } from "react-router";
import AppSideBar from "../AppSideBar";
import { SidebarProvider } from "../ui/sidebar";
import TopBar from "../TopBar";
import Footer1 from "../Footer1";

const UserLayout = () => {
  return (
    <div className=" flex flex-col ">
      <div id="top-bar" className="w-full fixed z-20">
        {" "}
        <TopBar />
      </div>
      <SidebarProvider>
        <div
          id="main-sec"
          className="w-screen  flex justify-between mt-[70px] bg-slate-50"
        >
          <div id="sidebar">
            <AppSideBar />
          </div>
          <main className=" w-full flex flex-col justify-center items-center py-3.5 px-2.5">
            <Outlet />
            {/* <footer className="mt-[20%]">footer</footer> */}
            <Footer1 className="mt-[20%]" />
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default UserLayout;
