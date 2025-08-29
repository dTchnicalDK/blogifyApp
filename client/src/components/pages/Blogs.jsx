import React, { useContext, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router";
import { IoAddSharp } from "react-icons/io5";
import { RiEdit2Fill, RiDeleteBin5Fill } from "react-icons/ri";
import { CategoriesContext } from "@/contexts/CategoryContextProvider";
import axios from "axios";
import { toast } from "react-toastify";
const baseUrl = import.meta.env.VITE_BASE_BACKENED_URL;

const Blogs = () => {
  const { categories, setCategories } = useContext(CategoriesContext);
  const [reRender, setRerender] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedAllBlogs = await axios.get(
          `${baseUrl}/api/blogs/getblogs`,
          { withCredentials: true }
        );
      } catch (error) {
        console.log("error fetching blogs", error);
        toast.error(error.message);
      }
    };
    fetchData();
  }, [reRender]);
  return <div>blogs jsx</div>;
};

export default Blogs;
