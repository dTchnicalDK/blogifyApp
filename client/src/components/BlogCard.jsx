import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router";

const BlogCard = ({
  title = "New Spaces features make it easier to stay secure, compliant, and in control",
  createOn = "June 2025",
  image = "/images/blogImg.png",
}) => {
  return (
    <div className="border-2 border-blue-500 w-[300px] min-w-[300px] h-full flex-shrink-0 m-2 p-4 flex flex-col gap-3 shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Image Container */}
      <div className="w-full h-[200px] overflow-hidden rounded-lg">
        <img
          src={image}
          alt="blog cover"
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content Container */}
      <div className="flex flex-col flex-grow gap-2">
        {/* Title with line clamping */}
        <h2 className="text-lg font-bold line-clamp-2 min-h-[3.5rem]">
          {title}
        </h2>

        {/* Date */}
        <p className="text-sm text-gray-600">Created on {createOn}</p>

        {/* Read More Link */}
        <div className="mt-auto">
          <Link
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors duration-200"
            aria-label={`Read more about ${title}`}
          >
            Read more
            <FaArrowRight className="text-sm" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
