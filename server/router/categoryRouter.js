import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  editCategory,
  getAllCategories,
} from "../controllers/categoriesController.js";
const categoryRouter = Router();

categoryRouter.post("/create", createCategory);
categoryRouter.get("/get", getAllCategories);
categoryRouter.put("/edit/:id", editCategory);
categoryRouter.delete("/delete/:id", deleteCategory);

export { categoryRouter };
