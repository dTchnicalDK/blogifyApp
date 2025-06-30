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
        <div
          id="main-sec"
          className="w-screen  flex justify-between mt-[70px] bg-slate-50"
        >
          <div id="sidebar">
            <AppSideBar />
          </div>
          <main className="border-2 border-green-700 w-full flex flex-col justify-center items-center">
            <Outlet />
            <footer className="mt-[20%]">footer</footer>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default UserLayout;
