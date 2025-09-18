import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { userContext } from "../../contexts/UserContexProvider";
import { toast } from "react-toastify";
import Spinner from "../Spinner";

import BlogCard from "../BlogCard";
import { Button } from "../ui/button";
import { IoAddSharp } from "react-icons/io5";

const baseUrl = import.meta.env.VITE_BASE_BACKENED_URL;

const ClientBoard = () => {
  const { loggedUser, login, logOut } = useContext(userContext);
  const [blogs, setBlogs] = useState([]);
  const [reRender, setRerender] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //loading blogs
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const fetchedAllBlogs = await axios.get(
          `${baseUrl}/api/blogs/getblogs`,
          { withCredentials: true }
        );

        if (!fetchedAllBlogs) {
          toast.error("couldn't load blog, try again!");
        }
        setBlogs(fetchedAllBlogs.data.blogs);
      } catch (error) {
        console.log("error fetching blogs", error);
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [loggedUser]);

  const handleSingleBlog = (singleBlog) => {
    navigate(`single-blogs/${singleBlog._id}`);
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="w-full flex flex-col justify-around relative ">
      {!loggedUser ? (
        <h1 className="text-center text-3xl text-orange-500 font-bold tracking-wider ">
          welcome guest
        </h1>
      ) : (
        <>
          <h1 className=" text-4xl text-orange-700 font-bold text-center mb-2">
            Welcome Mr. {loggedUser?.displayName || loggedUser?.email}
          </h1>
        </>
      )}
      <div className=" m-5 md:m-4">
        <Button asChild>
          <Link to={loggedUser ? "/user/blog/add" : "/login"}>
            <IoAddSharp /> Add New Blog
          </Link>
        </Button>
      </div>

      <div className="w-full flex justify-around flex-wrap gap-x-2.5 gap-y-5 ">
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
    </div>
  );
};

export default ClientBoard;
