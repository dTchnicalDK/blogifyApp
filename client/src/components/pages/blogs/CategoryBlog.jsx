import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { userContext } from "@/contexts/UserContexProvider";
import { Card } from "@/components/ui/card";
import BlogCard from "@/components/BlogCard";
import Blogs from "../Blogs";
import Spinner from "@/components/Spinner";
const baseUrl = import.meta.env.VITE_BASE_BACKENED_URL;

const CategoryBlog = () => {
  const { loggedUser, login, logOut } = useContext(userContext);
  const [blogs, setBlogs] = useState([]);
  const [reRender, setRerender] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  //   const [categoryid, setCategoryid] = useState("686fcc92be82378200766fa3");
  const { categoryid } = useParams();
  //   console.log("params categoryid", categoryid);

  //loading Category blogs
  useEffect(() => {
    const fetchCategoryBlogs = async () => {
      try {
        setLoading(true);
        const categoryBlogs = await axios.get(
          `${baseUrl}/api/blogs/getblog-by-category/${categoryid}`,
          { withCredentials: true }
        );
        if (!categoryBlogs) {
          toast.error("couldn't load blog, try again!");
        }
        // console.log("category blog res fe", categoryBlogs.data.data);
        setBlogs(categoryBlogs.data.data);
      } catch (error) {
        console.log("error fetching blogs", error);
        toast.error(error.response.message || error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCategoryBlogs();
  }, [loggedUser, categoryid]);

  const handleSingleBlog = (singleBlog) => {
    navigate(`/user/single-blogs/${singleBlog._id}`);
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="w-full">
      {!blogs || blogs.length < 0 ? (
        <> no blog to display</>
      ) : (
        <>
          <h1 className="text-2xl text-gray-800 capitalize text-center md:text-left font-bold mb-2">
            Category: {blogs[0]?.category?.categoryName}
          </h1>

          {/* <div className="w-full flex justify-between flex-wrap gap-5 "> */}
          <div className="container w-full grid grid-cols-1 md:grid-cols-3 gap-1.5">
            {blogs &&
              blogs.map((blog) => {
                return (
                  // <Link to="single-blogs/:id">
                  <div
                    onClick={() => {
                      handleSingleBlog(blog);
                    }}
                    key={blog._id}
                  >
                    <BlogCard props={blog} />
                  </div>
                );
              })}
          </div>
        </>
      )}
    </div>
  );
};

export default CategoryBlog;
