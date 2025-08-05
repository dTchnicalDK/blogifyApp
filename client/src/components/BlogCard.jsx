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
import LikeCountCom from "./LikeCountCom";
const baseUrl = import.meta.env.VITE_BASE_BACKENED_URL;
const defaultBlog = {
  blogTitle:
    "New Spaces features make it easier to stay secure, compliant, and in control",
  createOn: "June 2025",
  featuredImage: "/images/blogImg.png",
};

const BlogCard = ({ props = defaultBlog }) => {
  // const [blogs, setBlogs] = useState([]);
  const [reRender, setRerender] = useState(false);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       setLoading(true);
  //       const fetchedAllBlogs = await axios.get(
  //         `${baseUrl}/api/blogs/getblogs`,
  //         { withCredentials: true }
  //       );
  //       if (!fetchedAllBlogs) {
  //         toast.error("couldn't load blog, try again!");
  //       }
  //       setBlogs(fetchedAllBlogs.data.blogs);
  //     } catch (error) {
  //       console.log("error fetching blogs", error);
  //       toast.error(error.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchData();
  // }, [reRender]);
  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="border-2 border-blue-500 w-[300px] min-w-[300px] h-full flex-shrink-0 m-2 p-4 flex flex-col gap-3 shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Image Container */}
      <div className="w-full h-[200px] overflow-hidden rounded-lg">
        <img
          src={"/images/blogImg.png"}
          alt="blog cover"
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content Container */}
      <div className="flex flex-col flex-grow gap-2">
        {/* Title with line clamping */}
        <h2 className="text-lg font-bold line-clamp-2 min-h-[3.5rem]">
          {props.blogTitle}
        </h2>
        {/* Read More Link */}
        <div className="mt-auto ">
          <Link
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-2xl py-2 transition-colors duration-200"
            aria-label={`Read more about ${props.blogTitle}`}
          >
            Read more
            <FaArrowRight className="text-sm text-center" />
          </Link>
          <div className="container mt-2">
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

                <p className="text-sm text-gray-600">
                  Created on: {moment(props.createdAt).format("DD-MM-YYYY")}{" "}
                </p>
              </div>
              {/* <div
                id="right"
                className="flex justify-between items-center gap-2"
              >
                <span>
                  <FaRegComments className="inline-block m-1" />
                  <small>20</small>
                </span>{" "}
                <span>
                  <GrLike className="inline-block m-1" />
                  <small>20</small>
                </span>
              </div> */}
              <LikeCountCom />
            </div>

            {/* Date */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
