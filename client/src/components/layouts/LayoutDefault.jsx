import React from "react";

import { Outlet } from "react-router";
import Navbar from "../Navbar";

function LayoutDefault() {
  return (
    <div className="layout">
      <header>My App Header</header>
      <Navbar />
      <main>
        <Outlet /> {/* This is where child routes will render */}
      </main>
      <footer>My App Footer</footer>
    </div>
  );
}

export default LayoutDefault;
