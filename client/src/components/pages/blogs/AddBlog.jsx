import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
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
import { userContext } from "@/contexts/UserContexProvider";
import Spinner from "@/components/Spinner";
import { Textarea } from "@/components/ui/textarea";
import sampleImg from "@/assets/logo2.jpg";
import noImage from "@/assets/noImage.jpg";
import { IoMdAdd } from "react-icons/io";
import Dropzone from "react-dropzone";

const AddBlog = () => {
  const [blog, setBlog] = useState({});
  const [reRender, setRerender] = useState(false);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const { loggedUser, login, logOut } = useContext(userContext);
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

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

  const handleFileSelection = (file) => {
    const fileObj = URL.createObjectURL(file[0]);
    setPreview(fileObj);
    setSelectedFile(file[0]);
    console.log("selected file", fileObj);
  };
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
        navigate("/login");
        toast.error("Loing first to add blog");
      }
    } catch (error) {
      console.error("user authentication error:", error);

      toast.error(
        error.response?.data?.msg ||
          error.message ||
          "Session expired or unauthorized. Please login again.",
        { position: "top-center" }
      );

      if ([401, 403, 500].includes(error.response?.status)) {
        logOut();
        navigate("/login");
      }
    } finally {
      setIsLoading(false);
    }
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    // checking wether empty fields----------
    if (!blog || !blog.blogContent || !blog.blogTitle) {
      return toast.error("all fields are mandatory, fill first!");
    }

    let formData = new FormData();

    for (const key in blog) {
      formData.append(`${key}`, blog[key]);
    }
    if (selectedFile) {
      formData.append("featuredImage", selectedFile);
    }
    // const data = Object.fromEntries(formData);
    // console.log(data);

    try {
      setIsLoading(true);
      const addedBlog = await axios.post(
        `${baseUrl}/api/blogs/createblog`,
        formData,
        { withCredentials: true }
      );
      navigate("/user/blogs-Details");
      // console.log("res from created blog", addedBlog);
      toast.success(addedBlog.data.message);
    } catch (error) {
      console.log("frontend add blog error", error);
      toast.error(
        error.response.data.message || error.message || "internal server error"
      );
    } finally {
      setIsLoading(false);
    }
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
              <div className="container w-full flex justify-between ">
                <div className="select-category">
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
                </div>
              </div>
              <label htmlFor="blogTitle">Enter Blog Title here: </label>
              <Input
                type="text"
                name="blogTitle"
                placeholder="Enter title for blog"
                onChange={handleChange}
              />
              <Dropzone
                onDrop={(acceptedFiles) => handleFileSelection(acceptedFiles)}
              >
                {({ getRootProps, getInputProps }) => (
                  <section>
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      {/* ------------------selected image----start------------------- */}
                      <div className="selected-image size-70 border-2 border-dashed  realative cursor-pointer group ">
                        <div className=" size-70 rounded-sm text-9xl text-white  bg-black/50 hidden group-hover:flex justify-center items-center absolute ">
                          <IoMdAdd />
                        </div>
                        <img
                          src={preview ? preview : noImage}
                          alt="chosenFile"
                          className="size-70  bg-center p-2"
                        />
                      </div>
                    </div>
                  </section>
                )}
              </Dropzone>

              {/* -----------------------blog content----------- */}
              <Textarea
                type="text"
                name="blogContent"
                placeholder="Enter blog content"
                onChange={handleChange}
              />
              <div className="flex justify-center gap-12">
                <Button type="submit" className="">
                  Add now
                </Button>
                <Button variant="destructive">
                  <Link to="/user/categories">Cancel</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
export default AddBlog;
