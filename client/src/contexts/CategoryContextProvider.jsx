import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

const baseUrl = import.meta.env.VITE_BASE_BACKENED_URL;

export const CategoriesContext = createContext();

const CategoryContextProvider = ({ children }) => {
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const updatedCategory = await axios.get(
          `${baseUrl}/api/categories/get`
        );
        setCategories(updatedCategory.data.data);
      } catch (error) {
        console.log("error fetching categories inside category context", error);
      }
    };
    fetchCategories();
  }, []);
  console.log("updated category inside contextProvider", categories);

  return (
    <CategoriesContext.Provider value={{ categories, setCategories }}>
      {children}
    </CategoriesContext.Provider>
  );
};

export default CategoryContextProvider;
