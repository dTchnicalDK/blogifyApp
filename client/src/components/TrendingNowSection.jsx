import React from "react";
import BlogCard from "./BlogCard";

const TrendingNowSection = ({ sectionTitle = "Trending now blogs" }) => {
  return (
    <div>
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">{sectionTitle}</h2>

        <div
          className="flex h-full items-stretch gap-6 overflow-x-auto pb-6 -mx-4 px-4"
          role="region"
          aria-label="Blog carousel"
          tabIndex="0"
        >
          <div className="flex gap-6 flex-nowrap ">
            <BlogCard
              title="Introducing AMD Instinct™ MI300X GPU Droplets"
              createOn="June 12, 2025"
              image="/images/image2.jpeg"
            />
            <BlogCard
              title="Currents Report: How Growing Tech Businesses Use AI Today"
              createOn="February 6, 2025"
              image="https://www.digitalocean.com/api/static-content/v1/images?src=https%3A%2F%2Fdoimages.nyc3.cdn.digitaloceanspaces.com%2FCurrents_2025%2FCurrents%2520blog%2520image.png&width=1080"
            />
            <BlogCard />
            <BlogCard />
            <BlogCard />
            <BlogCard />
            <BlogCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingNowSection;
