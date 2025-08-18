// import CKEditor from "@/components/CkEditor";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { IoAddSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
const baseUrl = import.meta.env.VITE_BASE_BACKENED_URL;
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { ClassicEditor } from "ckeditor5";
// import Editor from "@/components/CkEditor";
import { userContext } from "@/contexts/UserContexProvider";
import Spinner from "@/components/Spinner";

const AddBlog = () => {
  const [blog, setBlog] = useState({});
  const [reRender, setRerender] = useState(false);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const { loggedUser, login, logOut } = useContext(userContext);
  const [isLoading, setIsLoading] = useState(false);

  //fetching category
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedCategories = await axios.get(
          `${baseUrl}/api/categories/get`,
          { withCredentials: true }
        );
        setCategories(fetchedCategories?.data?.data);
      } catch (error) {
        console.log("error fetching category", error);
      }
    };
    fetchData();
  }, [reRender]);

  //checking if user logged in
  const authenticateUser = async () => {
    try {
      const response = await axios.get(
        "http://localhost:2000/api/user/authenticate",
        { withCredentials: true }
      );

      if (response.data.user) {
        login(response.data.user);
      } else {
        throw new Error("No user data received");
      }
    } catch (error) {
      console.error("user authentication error:", error);

      toast.error(
        error.response?.data?.msg ||
          "Session expired or unauthorized. Please login again.",
        { position: "top-center" }
      );

      if ([401, 403, 500].includes(error.response?.status)) {
        logOut();
        navigate("/login");
      }
    }
    // finally {
    //   setIsLoading(false);
    // }
  };
  useEffect(() => {
    if (!loggedUser) {
      const insertUser = async () => {
        await authenticateUser();
      };
    }
    setBlog({ ...blog, author: loggedUser._id });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog({ ...blog, [name]: value });
  };

  const handleSelect = (SelectValue) => {
    setBlog({ ...blog, category: SelectValue });
  };

  const handleEditorData = (event, editor) => {
    const data = editor.getData();
    setBlog({ ...blog, blogContent: data });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // checking wether empty fields----------
    if (!blog || !blog.blogContent || !blog.blogTitle) {
      return toast.error("all fields are mandatory, fill first!");
    }

    setIsLoading(true);
    try {
      const addedBlog = await axios.post(
        `${baseUrl}/api/blogs/createblog`,
        blog,
        { withCredentials: true }
      );
      setIsLoading(false);
      navigate("/user/blogs-Details");
      toast.success(addedBlog.data.message);
      // console.log("added blog ", addedBlog);
    } catch (error) {
      setIsLoading(false);
      console.log("frontend add blog error", error);
      toast.error(
        error.response.data.message || error.message || "internal server error"
      );
    } finally {
      setIsLoading(false);
    }
    // console.log("data to submit ", blog);
  };

  return (
    <div className="container">
      {isLoading ? (
        <Spinner />
      ) : (
        <Card>
          <CardHeader>you can add new Blogs from here</CardHeader>
          <CardContent className="">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4.5 mt-12"
            >
              {/* -----select button starts here------------------ */}
              <Select onValueChange={handleSelect}>
                <SelectTrigger className="w-[180px]">
                  {/* <SelectValue placeholder="select category">select</SelectValue> */}
                  <SelectValue placeholder="select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => {
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
              <label htmlFor="blogTitle">Enter Blog Title here: </label>
              <Input
                type="text"
                name="blogTitle"
                placeholder="Enter title for blog"
                onChange={handleChange}
              />
              {/* <label htmlFor="blogTitle">your slug here: </label>
              <Input
                type="text"
                name="blogTitle"
                placeholder="Enter title for blog"
                onChange={handleChange}
              /> */}

              {/* ------ including ck editor------------ */}
              {/* <Editor props={{ initialData: "", onChange: handleEditorData }} /> */}
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
export default AddBlog;
