import React from "react";

import { Outlet } from "react-router";
import Navbar from "../Navbar";
import Mynavbar from "../Navbar";

function LayoutDefault() {
  return (
    <div className="layout">
      <Mynavbar />
      <main>
        <Outlet /> {/* This is where child routes will render */}
      </main>
      {/* //footer codes below */}
      <section class="bg-black">
        <div class="max-w-lg bg-black px-4 pt-24 py-8 mx-auto text-left md:max-w-none md:text-center">
          <h1 class="font-extrabold leading-10 tracking-tight text-left text-white sm:leading-none md:text-6xl text-4xl lg:text-7xl">
            <span class="inline md:block">Join Us</span>
            <span class=" mt-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-emerald-400 to-green-500 md:inline-block">
              {" "}
              We are
              <span class="bg-clip-text text-transparent bg-gradient-to-r from-teal-500 via-cyon-400 to-purple-300">
                {" "}
                Hiring
              </span>{" "}
            </span>
          </h1>
          <div class="mx-auto rounded-lg font-black mt-5 text-zinc-400 md:mt-12 md:max-w-lg text-center lg:text-lg">
            <button
              class="bg-tkb border text-sm text-white py-3 px-7 rounded-full"
              // onClick={signInNow}
            >
              Join Dk & companies
            </button>
          </div>
        </div>
      </section>
      <hr class="text-white mx-5" />
      <footer class="bg-black pb-5">
        <div class="max-w-screen-xl px-4 pt-8 mx-auto sm:px-6 lg:px-8">
          <div class="sm:flex sm:items-center sm:justify-between">
            <div class="flex justify-center text-teal-300 sm:justify-start">
              <img
                class="rounded-full"
                src="./logo.jpg"
                width="40"
                height="40"
              />
            </div>

            <p class="mt-4 text-sm text-center text-gray-400 lg:text-right lg:mt-0">
              *T&C &nbsp; Career &nbsp; Privacy & Policy &nbsp; Developers
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LayoutDefault;
