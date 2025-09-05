import React from "react";

import { Outlet } from "react-router";
import Navbar from "../Navbar";
import Footer from "../Footer";
import TopBar from "../TopBar";
import Footer1 from "../Footer1";
// import { Button } from "../ui/button";
// import Accordian from "../Accordian";
// import SearchBar from "../SearchBar";

function LayoutDefault({ loggedInUser }) {
  return (
    <div className="layout w-full">
      <Navbar loggedInUser={loggedInUser} />
      {/* <TopBar /> */}
      <main>
        <Outlet />
      </main>

      {/* //footer codes below */}
      <footer>
        <Footer1 />
      </footer>
    </div>
  );
}

export default LayoutDefault;
