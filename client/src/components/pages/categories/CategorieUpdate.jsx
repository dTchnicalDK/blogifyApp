import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoAddSharp } from "react-icons/io5";
import { Link, useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import slugify from "slugify";
// import { json } from "stream/consumers";
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

  const handleCaegoryNameChange = (e) => {
    const { name, value } = e.target;

    setCategoryEdit((prevCategory) => ({
      ...prevCategory,
      categoryName: value,
      categorySlug: slugify(value, {
        lower: true, // convert to lowercase
        strict: true, // remove special characters
        locale: "en", // language-specific rules
      }),
    }));
    // console.log("data", categoryEdit);
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
      navigate("/admin/categories");
      toast.success(updatedCategory.data.message);
    } catch (error) {
      console.log("Update category data submit error fe", error);
      if (error.status === 903) {
        toast.warn(error.response.data.msg);
      }
      toast.error(error.response.message || "somehing went wrong");
    }
  };
  const handleCancel = () => {
    const shouldReturn = confirm(
      "Do you want to really cancel the operation ?"
    );
    if (shouldReturn) {
      navigate("/admin/categories");
    }
    // console.log("shouldReturn", shouldReturn);
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
          <form
            // onSubmit={handleSubmit}
            className="flex flex-col gap-4.5 mt-12"
          >
            <label htmlFor="categoryName">Enter category name: </label>
            <Input
              type="text"
              name="categoryName"
              placeholder="categoryName"
              value={categoryEdit.categoryName}
              onChange={handleCaegoryNameChange}
            />
            <label htmlFor="categorySlug"> category slug: </label>
            <Input
              type="text"
              name="categorySlug"
              value={categoryEdit.categorySlug}
              // onChange={handleChange}
              placeholder="category slug here"
              disabled
            />
            <div className="flex justify-center gap-12">
              <Button type="button" onClick={handleSubmit} className="">
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
