import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "react-toastify";
import Spinner from "../Spinner";
import BlogCard from "../BlogCard";
const baseUrl = import.meta.env.VITE_BASE_BACKENED_URL;

const SearchPage = () => {
  const [queryData, setQueryData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchparams] = useSearchParams();
  const q = searchparams.get("q");
  const navigate = useNavigate();
  //   console.log("query extracted value", q);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const fetchSearchedBlogs = await axios.get(
          `${baseUrl}/api/blogs/search?q=${q}`,
          { withCredentials: true }
        );
        // console.log("query response", fetchSearchedBlogs.data.data);
        setQueryData(fetchSearchedBlogs.data.data || []);
      } catch (error) {
        console.log("error fetching searchblogs fe", error);
        toast.error(
          error.message || error.response.message || "query error! try later"
        );
      } finally {
        setIsLoading(false);
      }
    };
    if (!q || q.length == 0) {
      return toast.error("type something");
    }
    fetchData();
  }, [q]);

  const handleSingleBlog = (singleBlog) => {
    navigate(`/user/single-blogs/${singleBlog._id}`);
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      {/* {console.log("queryData", queryData)} */}
      {queryData.length === 0 ? (
        <div> no match found</div>
      ) : (
        <div className="w-full flex justify-around flex-wrap ">
          {queryData &&
            queryData.map((blog) => {
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
      )}
    </>
  );
};

export default SearchPage;
