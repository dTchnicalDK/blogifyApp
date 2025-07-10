import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { IoAddSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router";

const CategorieUpdate = () => {
  const [category, setCategory] = useState({
    categoryName: "defaultCategoryName",
    categorySlug: "default slug name",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
    // console.log("object ", category);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("data submitted", category);
    navigate("/user/categories");
  };
  const handleCancel = () => {
    const shouldReturn = confirm(
      "Do you want to really cancel the operation ?"
    );
    if (shouldReturn) {
      navigate("/user/categories");
    }
    console.log("shouldReturn", shouldReturn);
  };
  return (
    <div className="container">
      {" "}
      <Card>
        <CardHeader>
          <h2 className="text-center">Update Category here</h2>
        </CardHeader>
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
              value={category.categoryName}
              onChange={handleChange}
            />
            <label htmlFor="categorySlug">Enter category slug: </label>
            <Input
              type="text"
              name="categorySlug"
              value={category.categorySlug}
              onChange={handleChange}
              placeholder="category slug here"
            />
            <div className="flex justify-center gap-12">
              <Button type="submit" className="">
                Update Now
              </Button>
              <Button variant="destructive" onClick={handleCancel}>
                cancel
              </Button>
            </div>
          </form>
          {/* </div> */}
        </CardContent>
      </Card>
    </div>
  );
};

export default CategorieUpdate;
