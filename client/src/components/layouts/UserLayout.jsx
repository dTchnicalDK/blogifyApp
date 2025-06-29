import React from "react";
import { Outlet } from "react-router";
import AppSideBar from "../AppSideBar";
import { SidebarProvider } from "../ui/sidebar";
import TopBar from "../TopBar";

const UserLayout = () => {
  return (
    <div className=" flex flex-col ">
      <div id="top-bar" className="w-full fixed z-20">
        {" "}
        <TopBar />
      </div>
      <SidebarProvider>
        <div id="main-sec" className="w-screen  flex justify-between mt-[70px]">
          <div id="sidebar">
            <AppSideBar />
          </div>
          <main className="flex flex-col justify-between items-center ">
            <Outlet />
            <footer>footer</footer>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default UserLayout;
