import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import axios from "axios";
import React, { useState } from "react";
import { IoAddSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
const baseUrl = import.meta.env.VITE_BASE_BACKENED_URL;

const AddCategories = () => {
  const [category, setCategory] = useState({
    categoryName: "",
    categorySlug: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
    // console.log("object ", category);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // checking wether empty fields----------
    if (!category.categoryName.trim() || !category.categorySlug.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    try {
      const addedCategory = await axios.post(
        `${baseUrl}/api/categories/create`,
        category,
        { withCredentials: true }
      );
      // console.log("addedCategory", addedCategory);
      navigate("/user/categories");
      toast.success(addedCategory.data.msg);
    } catch (error) {
      if (error.response.status == 409) {
        return toast.warn(error.response.data.msg);
      } else {
        console.log("frontend add category error", error);
        toast.error(error.message);
      }
    }
  };
  return (
    <div className="container">
      {" "}
      <Card>
        <CardHeader>you can add new category here</CardHeader>
        <CardContent className="">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4.5 mt-12">
            <label htmlFor="categoryName">Enter category name: </label>
            <Input
              type="text"
              name="categoryName"
              placeholder="categoryName"
              onChange={handleChange}
            />
            <label htmlFor="categorySlug">Enter category slug: </label>
            <Input
              type="text"
              name="categorySlug"
              onChange={handleChange}
              placeholder="category slug here"
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

export default AddCategories;
