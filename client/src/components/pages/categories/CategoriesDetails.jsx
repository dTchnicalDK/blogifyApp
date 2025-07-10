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

const CategoriesDetails = () => {
  const { categories, setCategories } = useContext(CategoriesContext);
  // const [categories, setCategories] = useState(
  //   // null
  //   [
  //     {
  //       categoryName: "first category",
  //       categorySlug: "first category slug",
  //     },
  //     {
  //       categoryName: "second category",
  //       categorySlug: "second category slug",
  //     },
  //   ]
  // );
  const navigate = useNavigate();
  // console.log("context value in details page", categories);

  // useEffect(async () => {
  //   try {
  //     const fetchedCategories = await axios.get("", { withCredentials: true });
  //     console.log("fetched category", fetchedCategories);
  //     // setCategories(fetchedCategories)
  //   } catch (error) {
  //     console.log("error fetching category", error);
  //   }
  // }, []);

  const handleEdit = (e) => {
    navigate("/user/categories/update");
  };

  return (
    <div>
      <Button asChild>
        <Link to="/user/categories/add">
          <IoAddSharp /> NewCategory
        </Link>
      </Button>
      {categories && categories.length >= 1 ? (
        <Table>
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
                      onClick={handleEdit}
                    >
                      <RiEdit2Fill />
                    </Button>
                  </TableCell>
                  <TableCell className="text-right ">
                    <Button
                      variant="secondary"
                      size="icon"
                      className="btn-hover text-destructive"
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
