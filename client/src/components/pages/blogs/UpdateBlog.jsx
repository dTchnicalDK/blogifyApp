import CKEditor from "@/components/CkEditor";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { IoAddSharp } from "react-icons/io5";
import { Link, useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
const baseUrl = import.meta.env.VITE_BASE_BACKENED_URL;
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ClassicEditor } from "ckeditor5";
import Editor from "@/components/CkEditor";
import { userContext } from "@/contexts/UserContexProvider";
import Spinner from "@/components/Spinner";
import { Toast } from "bootstrap";
// import { decode } from "entities";

const UpdateBlog = () => {
  const [blogToEdit, setBlogToEdit] = useState();
  const [blog, setBlog] = useState();
  const [reRender, setRerender] = useState(false);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const { loggedUser, login, logOut } = useContext(userContext);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  const fetchBlogToEdit = async (blogId) => {
    try {
      const fetchedblog = await axios.get(
        `${baseUrl}/api/blogs/getblog/${blogId}`
      );

      setBlog(fetchedblog.data.data);
      // setCategories(fetchedblog.data.data.category.categoryName);
      // console.log("category", fetchedblog.data.data.category.categoryName);
    } catch (error) {
      console.log("blog to edit fetchig error", error.message);
    }
  };
  // fetching category
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedCategories = await axios.get(
          `${baseUrl}/api/categories/get`,
          { withCredentials: true }
        );
        setCategories(fetchedCategories?.data?.data);
        fetchBlogToEdit(id);
      } catch (error) {
        console.log("error fetching category", error);
      }
    };
    fetchData();
  }, [reRender]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog({ ...blog, [name]: value });
    // console.log("from change logged user id", loggedUser._id);
    // console.log("blog object ", blog);
  };

  const handleSelect = (SelectValue) => {
    setBlog({ ...blog, category: SelectValue });
  };

  const handleEditorData = (event, editor) => {
    // console.log("editor triggered");
    const data = editor.getData();
    setBlog({ ...blog, blogContent: data });
    // console.log("editor data ", data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validation
    if (
      !blog?.blogTitle?.trim() ||
      !blog?.blogContent?.trim() ||
      !blog?.category
    ) {
      toast.error("Please fill all fields");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.put(
        `${baseUrl}/api/blogs/update-blog/${id}`,
        {
          blogTitle: blog.blogTitle,
          blogContent: blog.blogContent,
          category: blog.category,
        },
        {
          withCredentials: true,
          // headers: {
          //   'Content-Type': 'application/json'
          // }
        }
      );

      if (response.data.success) {
        toast.success("Blog updated successfully");
        navigate("/user/blogs-Details");
      } else {
        throw new Error(response.data.message || "Failed to update blog");
      }
    } catch (error) {
      console.error("Frontend update error:", error);
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to update blog"
      );
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="container">
      {isLoading || !blog || categories.length === 0 ? (
        <Spinner />
      ) : (
        <Card>
          <CardHeader>
            <h1>Edit your data here</h1>
          </CardHeader>
          <CardContent className="">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4.5 mt-12"
            >
              {/* -----select button starts here------------------ */}
              <Select
                onValueChange={handleSelect}
                value={blog?.category?._id || ""}
              >
                <SelectTrigger className="w-[180px]">
                  {/* <SelectValue placeholder="select category">select</SelectValue> */}
                  <SelectValue placeholder="select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories?.map((cat) => {
                    return (
                      // <>
                      <SelectItem value={cat._id} key={cat._id}>
                        {cat.categoryName}
                      </SelectItem>
                      // </>
                    );
                  })}
                </SelectContent>
              </Select>

              <label htmlFor="blogTitle">Blog title </label>
              <Input
                type="text"
                name="blogTitle"
                placeholder="Enter title for blog"
                value={blog?.blogTitle}
                onChange={handleChange}
              />

              {/* ------ including ck editor------------ */}
              {blog?.blogContent !== undefined ? (
                <Editor
                  props={{
                    initialData: blog.blogContent, // No template literal needed
                    onChange: handleEditorData,
                  }}
                />
              ) : (
                <div>Loading editor...</div> // Or null/skeleton
              )}
              <div className="flex justify-center gap-12">
                <Button type="submit" className="">
                  Add now
                </Button>
                <Button variant="destructive">
                  <Link to="/user/categories">Cancel</Link>
                </Button>
              </div>
            </form>
            {/* </div> */}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UpdateBlog;
