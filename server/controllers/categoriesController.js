import mongoose from "mongoose";
import { Categories } from "../models/categoriesModel.js";

///////////////getCategory by id//////////////////
export const getCategoryById = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ msg: "check category id" });
  }
  try {
    const response = await Categories.findById(id);
    if (!response) {
      return res.status(400).json({ msg: "check no data found" });
    }
    return res.status(200).json({ msg: "data achieved", data: response });
  } catch (error) {
    // console.log("error fetching category data backend", error);
  }
  // res.status(200).json({ msg: "getCategoryById backend hit", id });
};

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
        .status(409)
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
    return res
      .status(500)
      .json({ msg: "Something went wrong during category creation." });
  }
  // res.status(200).json({ categoryName, categorySlug });
};

//////////////edit categories//////////////
export const editCategory = async (req, res) => {
  // console.log("edit category hit");
  const { id } = req.params;
  const { categoryName, categorySlug } = req.body;

  //-------------checking if blank fields-----------
  if (!categoryName || !categorySlug) {
    return res
      .status(400)
      .json({ msg: "no field can be blank", success: false });
  }
  if (!id) {
    return res.status(400).json({ msg: "id missing", success: false });
  }

  try {
    // checking if category already exits
    const isDuplicatCatgory = await Categories.findOne({ categoryName });

    if (isDuplicatCatgory) {
      return res.status(903).json({
        msg: "catebgory already exits !!, choose another category name",
        id,
        success: false,
      });
    }
    const updatedCategory = await Categories.findByIdAndUpdate(
      { _id: id },
      { categoryName, categorySlug },
      { new: true }
    );
    if (!updatedCategory) {
      return res.status(400).json({ msg: "wrong id", id, success: false });
    }
    // console.log("updatedCategory", updatedCategory);
    return res.status(201).json({
      msg: `category edited into ${categoryName}`,
      id,
      success: false,
      data: updatedCategory,
    });
  } catch (error) {
    console.log("edit category error", error);
  }
};

//////////////delete categories//////////////
export const deleteCategory = async (req, res) => {
  console.log("delete route hit");
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
