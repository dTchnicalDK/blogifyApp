import CKEditor from "@/components/CkEditor";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import axios from "axios";
import React, { useEffect, useState } from "react";
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
import { ClassicEditor } from "ckeditor5";
import Editor from "@/components/CkEditor";

const AddBlog = () => {
  const [blog, setBlog] = useState();
  const [reRender, setRerender] = useState(false);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog({ ...blog, [name]: value });
    console.log("blog object ", blog);
  };

  const handleSelect = (SelectValue) => {
    setBlog({ ...blog, category: SelectValue });
  };

  const handleEditorChange = (event, editor) => {
    event.preventDefault();
    console.log("editor triggered");
    const data = editor.getData();
    console.log("editor data ", data);
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();
    // // checking wether empty fields----------
    // if (!blog.blogTitle.trim() || !blog.content.trim()) {
    //   return toast.error("Please fill in all fields");
    // }
    // try {
    //   const addedBlog = await axios.post(
    //     `${baseUrl}/api/blogs/createblog`,
    //     blog,
    //     { withCredentials: true }
    //   );
    //   navigate("/user/categories");
    //   toast.success(addedBlog.data.msg);
    // } catch (error) {
    //   console.log("frontend add blog error", error);
    //   toast.error(error.message);
    // }
  };

  return (
    <div className="container">
      {" "}
      <Card>
        <CardHeader>you can add new Blogs from here</CardHeader>
        <CardContent className="">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4.5 mt-12">
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

            {/* ------ including ck editor------------ */}
            <Editor
              initialData=""
              editor={ClassicEditor}
              onChange={handleEditorChange}
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
          {/* </div> */}
        </CardContent>
      </Card>
    </div>
  );
};
export default AddBlog;
