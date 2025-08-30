import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  editCategory,
  getAllCategories,
  getCategoryById,
} from "../controllers/categoriesController.js";
import { onlyAdminRoute } from "../middlewares/onlyAdminRoute.js";
const categoryRouter = Router();

categoryRouter.get("/getbyid/:id", getCategoryById);
categoryRouter.get("/get", getAllCategories);
//////only admin route//////////////////
categoryRouter.post("/create", onlyAdminRoute, createCategory);
categoryRouter.put("/edit/:id", onlyAdminRoute, editCategory);
categoryRouter.delete("/delete/:id", onlyAdminRoute, deleteCategory);

export { categoryRouter };
