import React from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import outlined from "@material-tailwind/react/theme/components/timeline/timelineIconColors/outlined";

// import "./LandingPage.css";

function HeroSection() {
  return (
    <>
      <div
        id="hero-wrapper"
        className=" w-full h-full gap-2 md:h-[90vh] py-3 px-1.5 flex flex-col md:flex-row justify-around "
      >
        <div
          id="salutation-section"
          className=" w-full p-2 md:w-2/3 flex flex-col justify-around items-center"
        >
          <h1 className="font-bold text-6xl md:text-7xl text-slate-900 text-center">
            Welcome to <span>Apna Blogg</span>
          </h1>
          <p className="my-5 p-2  font-medium text-slate-700 text-2xl leading-7 font-serif">
            Where ideas spark, stories unfold, and curiosity meets inspiration.
            Whether you're here to learn, explore, or just enjoy great
            content—you’re in the right place. Dive in and make yourself at
            home!
          </p>

          <div>
            <Button className="text-2xl px-12 py-8 tracking-widest">
              <>
                <Link to={"/blogs"}>Explore Now... </Link>
              </>
            </Button>
          </div>
        </div>
        <div id="image-section" className="flex justify-around p-2">
          <img src="/images/landing.svg" alt="landingLogo" />
        </div>
      </div>
    </>
  );
}

export default HeroSection;
