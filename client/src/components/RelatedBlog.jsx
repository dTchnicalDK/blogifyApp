import React, { useEffect, useState } from "react";
import blogImg from "@/assets/logo2.jpg";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import moment from "moment";
const baseUrl = import.meta.env.VITE_BASE_BACKENED_URL;

const RelatedBlog = ({ props }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRelatedBlogs = async () => {
      try {
        setIsLoading(true);

        const blog = await axios.get(
          `${baseUrl}/api/blogs/get-related-blog/${props.category._id}/${props.currentBlog}`
        );
        // console.log("related blogs", blog);
        setRelatedBlogs(blog.data.blogs);
      } catch (error) {
        console.error("Related Blog fetch error:", error);
        toast.error(
          error.response.message ||
            error.message ||
            "Error fetching related blog"
        );
      } finally {
        setIsLoading(false);
      }
    };
    if (props?.category && props?.currentBlog) {
      fetchRelatedBlogs();
    }
  }, [props.category]);

  const handleGoClickedBlog = (id) => {
    navigate(`/user/single-blogs/${id}`);
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      {relatedBlogs.length <= 0 ? (
        <h1>no related Blogs </h1>
      ) : (
        <>
          {relatedBlogs.map((blog) => {
            return (
              <div
                className="border-2 border-slate-100 p-2 bg-white rounded-lg"
                key={blog._id}
                onClick={() => handleGoClickedBlog(blog._id)}
              >
                <Link>
                  <div className="h-full w-full flex justify-start items-center gap-2 relative">
                    <img
                      src={blog.featuredImage || blogImg}
                      alt="Blog image"
                      width={"80px"}
                      className="rounded-sm"
                    />
                    <div>
                      <h1 className="line-clamp-2 ">{blog.blogTitle}</h1>
                    </div>
                    <p className="absolute right-2 bottom-0 text-slate-300">
                      {moment(blog.createdAt).format("DD-MM-YYYY")}
                    </p>
                  </div>
                </Link>
              </div>
            );
          })}
        </>
      )}
    </>
  );
};

export default RelatedBlog;
