import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  editCategory,
  getAllCategories,
  getCategoryById,
} from "../controllers/categoriesController.js";
const categoryRouter = Router();

categoryRouter.get("/getbyid/:id", getCategoryById);
categoryRouter.post("/create", createCategory);
categoryRouter.get("/get", getAllCategories);
categoryRouter.put("/edit/:id", editCategory);
categoryRouter.delete("/delete/:id", deleteCategory);

export { categoryRouter };
