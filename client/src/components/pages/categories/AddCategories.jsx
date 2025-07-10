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

      navigate("/user/categories");
      toast.success(addedCategory.data.msg);
    } catch (error) {
      console.log("frontend add category error", error);
      toast.error(error.message);
    }
    console.log("data submitted", category);
  };
  return (
    <div className="container">
      {" "}
      <Card>
        <CardHeader>you can add new category here</CardHeader>
        <CardContent className="">
          {/* <div > */}
          <Button asChild>
            <Link to="/user/categories-add">
              <IoAddSharp /> NewCategory
            </Link>
          </Button>
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
