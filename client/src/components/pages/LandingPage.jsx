import React from "react";
import { Link } from "react-router";
import HeroSection from "../HeroSection";
import BlogCard from "../BlogCard";
import TrendingNowSection from "../TrendingNowSection";
import { Button } from "../ui/button";

function LandingPage() {
  return (
    <div className="space-y-12">
      <section className="section">
        <HeroSection />
      </section>

      <section
        id="u-may-like-blogs"
        className="py-8"
        aria-label="Recommended blogs for you"
      >
        <TrendingNowSection sectionTitle="Just for you blogs" />
      </section>

      <section id="trending-blogs" className="py-8">
        {/* Add content here */}
        <TrendingNowSection sectionTitle="Trending now blogs" />
      </section>

      <section id="blogs" className="py-8">
        {/* Add content here */}
      </section>
    </div>
  );
}

export default LandingPage;
