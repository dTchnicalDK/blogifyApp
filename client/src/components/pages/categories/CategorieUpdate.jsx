import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoAddSharp } from "react-icons/io5";
import { Link, useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
const baseUrl = import.meta.env.VITE_BASE_BACKENED_URL;

const CategorieUpdate = () => {
  const [categoryEdit, setCategoryEdit] = useState({
    categoryName: "",
    categorySlug: "",
  });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchCategoryToEdit = async () => {
      try {
        const fetchedData = await axios.get(
          `${baseUrl}/api/categories/getbyid/${id}`
        );
        // console.log("fetched category to be edited", fetchedData.data.data);
        setCategoryEdit(fetchedData.data.data);
      } catch (error) {
        console.log("fetching category data error: --", error);
      }
    };
    fetchCategoryToEdit();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoryEdit({ ...categoryEdit, [name]: value });
    // console.log("object ", category);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedCategory = await axios.put(
        `${baseUrl}/api/categories/edit/${id}`,
        categoryEdit,
        {
          withCredentials: true,
        }
      );
      // console.log("updatedCategory", updatedCategory);
      if (updatedCategory.data) {
        navigate("/user/categories");
        toast.success(updatedCategory.data.msg);
      }
    } catch (error) {
      console.log("Update category data submit error fe", error);
      if (error.status == 903) {
        toast.warn(error.response.data.msg);
      }
    }
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
              value={categoryEdit.categoryName}
              onChange={handleChange}
            />
            <label htmlFor="categorySlug">Enter category slug: </label>
            <Input
              type="text"
              name="categorySlug"
              value={categoryEdit.categorySlug}
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
