import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { FaRegComments } from "react-icons/fa";
import { GrLike } from "react-icons/gr";
import { Link } from "react-router";
import logo from "@/assets/logo2.jpg";
import axios from "axios";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";
import moment from "moment";
// import LikeCountCom from "./LikeCountCom";
const baseUrl = import.meta.env.VITE_BASE_BACKENED_URL;
const defaultBlog = {
  blogTitle:
    "New Spaces features make it easier to stay secure, compliant, and in control",
  createOn: "June 2025",
  featuredImage: "/images/blogImg.png",
};

const BlogCard = ({ props = defaultBlog }) => {
  const [reRender, setRerender] = useState(false);
  const [loading, setLoading] = useState(false);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="border-2 border-blue-500 w-[90vw] md:w-[300px] h-[30vh] md:h-full mx-auto  flex-shrink-0  p-4 flex justify-between md:flex-col gap-3 shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer bg-white">
      {/* Image Container */}
      <div className="h-full w-full md:w-full md:h-[200px]  md:overflow-hidden rounded-lg ">
        <img
          src={props.featuredImage || "/images/blogImg.png"}
          alt="blog cover"
          className="w-30 h-full md:w-full rounded-sm object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content Container */}
      <div className="flex flex-col flex-grow gap-2 w-2/3 md:w-full">
        {/* Title with line clamping */}
        <h2 className="text-2xl md:text-3xl font-sans text-gray-800 font-semibold  line-clamp-3 min-h-[3.5rem] capitalize">
          {props.blogTitle}
        </h2>
        {/* Read More Link */}
        <div className="mt-auto ">
          <Link
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-xl py-.5 transition-colors duration-200"
            aria-label={`Read more about ${props.blogTitle}`}
          >
            Read more
            <FaArrowRight className="text-sm text-center" />
          </Link>
          <div className="container mt-2 h-1/2">
            <div className="flex items-center justify-between">
              <div id="left" className=" flex w-2xl flex-col  ">
                <div className="flex items-center gap-2">
                  <span>
                    <img
                      src={props ? props.author?.photoURL : logo}
                      alt="avtar"
                      height="50px"
                      width="50px"
                      className="border-2 border-slate-400 rounded-full"
                    />
                  </span>
                  <span className="line-clamp-1">
                    {props?.author?.displayName || "default name"}
                    {/* Dharmendra kumar dhanga chauhan */}
                  </span>
                </div>
              </div>

              {/* <LikeCountCom /> */}
              <div className="flex flex-col justify-center items-center">
                <h3>Category</h3>
                <h3>{props?.category?.categoryName}</h3>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              Created on: {moment(props.createdAt).format("DD-MM-YYYY")}{" "}
            </p>

            {/* Date */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
