import React, { useContext, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router";
import { IoAddSharp } from "react-icons/io5";
import { RiEdit2Fill, RiDeleteBin5Fill } from "react-icons/ri";
import axios from "axios";
import { toast } from "react-toastify";
import moment from "moment";
import Spinner from "@/components/Spinner";
const baseUrl = import.meta.env.VITE_BASE_BACKENED_URL;

const BlogDetails = () => {
  const [reRender, setRerender] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //fetching blogs
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const fetchedAllBlogs = await axios.get(
          `${baseUrl}/api/blogs/getblogs`,
          { withCredentials: true }
        );
        setBlogs(fetchedAllBlogs.data.blogs);
        setLoading(false);
      } catch (error) {
        console.log("error fetching blogs", error);
        toast.error(error.message);
      }
    };
    fetchData();
  }, [reRender]);

  const handleEdit = (id) => {
    console.log("handle edit executed");
    navigate(`/user/blogs/update/${id}`);
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const deletedBlog = await axios.delete(
        `${baseUrl}/api/blogs/deleteblog/${id}`,
        { withCredentials: true }
      );
      setLoading(false);
      // console.log("response", deletedBlog);
      if (deletedBlog) {
        setRerender(() => (reRender ? false : true));
        toast.success(deletedBlog.data.message);
      } else {
        toast.error(deletedBlog.data.data.message || "something went wrong");
      }
    } catch (error) {
      console.log("error deleting blog", error.message);
      toast.error(
        error.response.message || error.message || "something went wrong"
      );
    }

    if (loading) {
      return <Spinner />;
    }
  };
  return (
    <div className="relative w-full p-12">
      {loading ? (
        <Spinner />
      ) : (
        <div>
          {/* {console.log("get all blgs", blogs)} */}
          <div className="m-3 fixed z-10 md:left-75 md:top-20">
            <Button asChild>
              <Link to="/user/blog/add">
                <IoAddSharp /> New Blog
              </Link>
            </Button>
          </div>

          {blogs && blogs.length > 0 ? (
            <Table className=" ">
              <TableCaption>A list of your recent invoices.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Sl No.</TableHead>
                  <TableHead>Blog Title</TableHead>
                  <TableHead>Category </TableHead>
                  <TableHead>Author </TableHead>
                  <TableHead>posted on </TableHead>
                  <TableHead className="text-right" colsapn="2">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {blogs.map((blog, idx) => {
                  return (
                    <TableRow key={idx}>
                      <TableCell className="font-medium">{idx + 1}</TableCell>
                      <TableCell>{blog.blogTitle}</TableCell>
                      <TableCell>{blog.category?.categoryName}</TableCell>
                      <TableCell>{blog.author?.displayName}</TableCell>
                      <TableCell>
                        {moment(blog?.createdAt).format("DD-MM-YYYY")}
                      </TableCell>
                      <TableCell className="text-right ">
                        <Button
                          variant="secondary"
                          size="icon"
                          className="size-8 btn-hover"
                          onClick={() => {
                            handleEdit(blog._id);
                          }}
                        >
                          <RiEdit2Fill />
                        </Button>
                      </TableCell>
                      <TableCell className="text-right ">
                        <Button
                          variant="secondary"
                          size="icon"
                          className="btn-hover text-destructive"
                          onClick={() => {
                            handleDelete(blog._id);
                          }}
                        >
                          <RiDeleteBin5Fill />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ) : (
            <div>
              <h1>No data to display</h1>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BlogDetails;
