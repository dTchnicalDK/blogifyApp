import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { userContext } from "../../contexts/UserContexProvider";
import { toast } from "react-toastify";
import Spinner from "../Spinner";
import { Card } from "../ui/card";
import BlogCard from "../BlogCard";
const baseUrl = import.meta.env.VITE_BASE_BACKENED_URL;

const ClientBoard = () => {
  const { loggedUser, login, logOut } = useContext(userContext);
  const [isLoading, setIsLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [reRender, setRerender] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // authenticatin User
  // useEffect(() => {
  //   const authenticateUser = async () => {
  //     setIsLoading(true);
  //     try {
  //       const response = await axios.get(
  //         "http://localhost:2000/api/user/authenticate",
  //         { withCredentials: true }
  //       );

  //       if (response.data.user) {
  //         login(response.data.user);
  //       } else {
  //         throw new Error("No user data received");
  //       }
  //     } catch (error) {
  //       console.error("Dashboard authentication error:", error);

  //       toast.error(
  //         error.response?.data?.msg ||
  //           "Session expired or unauthorized. Please login again.",
  //         { position: "top-center" }
  //       );

  //       if ([401, 403, 500].includes(error.response?.status)) {
  //         logOut();
  //         navigate("/login");
  //       }
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   authenticateUser();
  // }, [login, logOut, navigate]);

  //loading blogs
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
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
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSingleBlog = (singleBlog) => {
    console.log("handle single blog ran", singleBlog);
    navigate(`single-blogs/${singleBlog._id}`);
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <Card className="px-3.5 py-3.5">
        <h1 className="text-4xl text-orange-700 font-bold">
          Welcome Mr. {loggedUser?.email}
        </h1>
        <pre>{JSON.stringify(loggedUser, null, 2)}</pre>
      </Card>
      <div className="w-full flex justify-between flex-wrap">
        {blogs &&
          blogs.map((blog) => {
            return (
              // <Link to="single-blogs/:id">
              <div
                onClick={() => {
                  handleSingleBlog(blog);
                }}
              >
                <BlogCard props={blog} key={blog._id} />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ClientBoard;
