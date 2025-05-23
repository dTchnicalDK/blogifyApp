import React from "react";

import { Outlet } from "react-router";
import Navbar from "../Navbar";
import Mynavbar from "../Navbar";
import Footer from "../Footer";

function LayoutDefault() {
  return (
    <div className="layout">
      <Mynavbar />
      <main>
        <Outlet /> {/* This is where child routes will render */}
      </main>
      {/* //footer codes below */}
      <Footer />
    </div>
  );
}

export default LayoutDefault;
