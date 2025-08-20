// import CKEditor from "@/components/CkEditor";
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
// import { ClassicEditor } from "ckeditor5";
// import Editor from "@/components/CkEditor";
import { userContext } from "@/contexts/UserContexProvider";
import Spinner from "@/components/Spinner";
import { Toast } from "bootstrap";
import Dropzone from "react-dropzone";
import noImage from "@/assets/noImage.jpg";
import { IoMdAdd } from "react-icons/io";
import { Textarea } from "@/components/ui/textarea";
// import { decode } from "entities";

const UpdateBlog = () => {
  const [blogToEdit, setBlogToEdit] = useState();
  const [blog, setBlog] = useState();
  const [reRender, setRerender] = useState(false);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const { loggedUser, login, logOut } = useContext(userContext);
  // const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const fetchBlogToEdit = async (blogId) => {
    try {
      const fetchedblog = await axios.get(
        `${baseUrl}/api/blogs/getblog/${blogId}`
      );
      // console.log("blog to be edited", fetchedblog);
      setBlog(fetchedblog.data.data);
    } catch (error) {
      console.log("blog to edit fetchig error", error.message);
      toast.error(
        error.message || error.response.message || "error fetching blog to edit"
      );
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
        toast.error(
          error.message ||
            error.response.message ||
            "error fetching categorie edit"
        );
      }
    };
    fetchData();
  }, [reRender]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog({ ...blog, [name]: value });
  };

  const handleSelect = (SelectValue) => {
    setBlog({ ...blog, category: SelectValue });
    // console.log("category", SelectValue);
  };
  const handleFileSelection = (file) => {
    const fileObj = URL.createObjectURL(file[0]);
    setPreview(fileObj);
    setSelectedFile(file[0]);
    console.log("selected file", fileObj);
  };

  const handleEditorData = (event, editor) => {
    // console.log("editor triggered");
    const data = editor.getData();
    setBlog({ ...blog, blogContent: data });
    // console.log("editor data ", data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (
      !blog?.blogTitle?.trim() ||
      !blog?.blogContent?.trim() ||
      !blog?.category
    ) {
      return toast.error("all fields are mandatory, fill first!");
    }
    let formData = new FormData();

    for (const key in blog) {
      formData.append(`${key}`, blog[key]);
    }
    // console.log("selected fiel", selectedFile);
    if (selectedFile) {
      formData.append("featuredImage", selectedFile);
    }
    const data = Object.fromEntries(formData);
    // console.log("formdata at fe", data);
    try {
      setIsLoading(true);
      const response = await axios.put(
        `${baseUrl}/api/blogs/update-blog/${id}`,

        formData,
        //   blogTitle: blog.blogTitle,
        //   blogContent: blog.blogContent,
        //   category: blog.category,

        {
          withCredentials: true,
        }
      );
      // console.log("blog update response fe", response);

      if (response.data.success) {
        toast.success("Blog updated successfully");
        navigate("/user/blogs-Details");
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
              <Select onValueChange={handleSelect} value={blog?.category?._id}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories &&
                    categories.map((cat) => {
                      return (
                        <SelectItem value={cat._id} key={cat._id}>
                          {cat.categoryName}
                        </SelectItem>
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
                          src={
                            preview ? preview : blog?.featuredImage || noImage
                          }
                          alt="chosenFile"
                          className="size-70  bg-center p-2"
                        />
                      </div>
                    </div>
                  </section>
                )}
              </Dropzone>

              {/* ------ including ck editor------------ */}
              {blog?.blogContent !== undefined ? (
                <>
                  {" "}
                  {/* -----------------------blog content----------- */}
                  <Textarea
                    type="text"
                    name="blogContent"
                    placeholder="Enter blog content"
                    value={blog?.blogContent}
                    onChange={handleChange}
                  />
                </>
              ) : (
                // <Editor
                //   props={{
                //     initialData: blog.blogContent, // No template literal needed
                //     onChange: handleEditorData,
                //   }}
                // />
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
