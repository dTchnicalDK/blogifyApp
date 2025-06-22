import React from "react";

import { Outlet } from "react-router";
import Navbar from "../Navbar";
import Footer from "../Footer";

function LayoutDefault({ loggedInUser }) {
  return (
    <div className="layout">
      <Navbar loggedInUser={loggedInUser} />
      <main>
        <Outlet />
      </main>

      {/* //footer codes below */}
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default LayoutDefault;
