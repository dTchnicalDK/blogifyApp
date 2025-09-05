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
import { ChevronRightIcon } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { IoAddSharp } from "react-icons/io5";
import { RiEdit2Fill, RiDeleteBin5Fill } from "react-icons/ri";
import { CategoriesContext } from "@/contexts/CategoryContextProvider";
import axios from "axios";
import { toast } from "react-toastify";
const baseUrl = import.meta.env.VITE_BASE_BACKENED_URL;

const CategoriesDetails = () => {
  const { categories, setCategories } = useContext(CategoriesContext);
  const [reRender, setRerender] = useState(false);
  const navigate = useNavigate();

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

  const handleEdit = (id) => {
    navigate(`/user/categories/update/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const deletedCategory = await axios.delete(
        `${baseUrl}/api/categories/delete/${id}`,
        { withCredentials: true }
      );
      if (deletedCategory) {
        setRerender(() => (reRender ? false : true));
        toast.success(deletedCategory.data.msg);
      } else {
        toast.error("something went wrong");
      }
    } catch (error) {
      console.log("error deleting category", error);
    }
    // navigate(`/user/categories/update/${id}`);
  };

  return (
    <div className="relative w-full p-4">
      <div className="m-3 fixed z-10 md:left-80">
        <Button asChild>
          <Link to="/user/categories/add">
            <IoAddSharp /> NewCategory
          </Link>
        </Button>
      </div>
      <h1 className="text-2xl text-center text-zinc-700 capitalize">
        list of categories
      </h1>

      {categories && categories.length >= 1 ? (
        <Table className="mt-12 ">
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Sl No.</TableHead>
              <TableHead>Category Name</TableHead>
              <TableHead>Category Slug</TableHead>
              <TableHead className="text-right" colsapn="2">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((cat, idx) => {
              return (
                <TableRow key={idx}>
                  <TableCell className="font-medium">{idx + 1}</TableCell>
                  <TableCell>{cat.categoryName}</TableCell>
                  <TableCell>{cat.categorySlug}</TableCell>
                  <TableCell className="text-right ">
                    <Button
                      variant="secondary"
                      size="icon"
                      className="size-8 btn-hover"
                      onClick={() => {
                        handleEdit(cat._id);
                      }}
                    >
                      <RiEdit2Fill />
                    </Button>
                  </TableCell>
                  <TableCell className="text-right ">
                    <Button
                      variant="secondary"
                      size="icon"
                      className="btn-hover text-destructive"
                      onClick={() => {
                        handleDelete(cat._id);
                      }}
                    >
                      <RiDeleteBin5Fill />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      ) : (
        <div>
          <h1>add some categories</h1>
        </div>
      )}
    </div>
  );
};

export default CategoriesDetails;
