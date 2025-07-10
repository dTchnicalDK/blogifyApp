import mongoose from "mongoose";
import { Categories } from "../models/categoriesModel.js";

/////////////////creating category////////////////////
export const createCategory = async (req, res) => {
  const { categoryName, categorySlug } = req.body;

  try {
    if (!categoryName || !categorySlug) {
      return res
        .status(400)
        .json({ msg: "all fiels are mandatory, fill first" });
    }
    const isCatergoryAlreadyCreated = await Categories.findOne({
      categoryName,
    });
    if (isCatergoryAlreadyCreated) {
      return res
        .status(400)
        .json({ msg: "category already created, use that or create other" });
    }
    const createdCategory = await Categories.create({
      categoryName,
      categorySlug,
    });
    return res
      .status(201)
      .json({ msg: "category created successfully", data: createdCategory });
  } catch (error) {
    console.log("category creation error", error);
  }
  res.status(200).json({ categoryName, categorySlug });
};

//////////////edit categories//////////////
export const editCategory = async (req, res) => {
  const { id } = req.params;
  const { categoryName, categorySlug } = req.body;
  console.log("id ", id);

  if (!categoryName || !categorySlug) {
    return res
      .status(400)
      .json({ msg: "no field can be blank", success: false });
  }
  if (!id) {
    return res.status(400).json({ msg: "id missing", success: false });
  }

  try {
    const foundCategory = await Categories.findById(
      { _id: id },
      { categoryName, categorySlug },
      { new: true }
    );
    if (!foundCategory) {
      return res.status(400).json({ msg: "wrong id", id, success: false });
    }
    return res.status(400).json({
      msg: "Edited successfully",
      id,
      success: false,
      data: foundCategory,
    });
  } catch (error) {
    console.log("edit category error", error);
  }
};

//////////////delete categories//////////////
export const deleteCategory = async (req, res) => {
  const { id } = req.params;
  const deletedData = await Categories.findByIdAndDelete(id);
  if (!deletedData) {
    res.status(500).json({
      msg: "failed to delete",
      // data: deletedData,
    });
  }
  console.log("deletedData", deletedData);
  res.status(200).json({
    msg: "category deleted successfully",
    data: deletedData,
  });
};

/////////////////GetAllCategories///////////
export const getAllCategories = async (req, res) => {
  try {
    const allCategories = await Categories.find();
    if (!allCategories || allCategories.length < 1) {
      res.status(400).json({
        msg: "no data to display",
        success: true,
        data: allCategories,
      });
    }
    return res
      .status(200)
      .json({ msg: "got data", success: true, data: allCategories });
  } catch (error) {
    console.log("getting all categories error", error);
  }
};
