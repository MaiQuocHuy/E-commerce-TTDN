import express from "express";
import { checkLogin, CheckIsAdmin } from "../middlewares/middleware.js";
import {
  createCategoryController,
  deleteCategoryController,
  getAllCategoryController,
  updateCategoryController,
} from "../controllers/categoryControllers.js";

const router = express.Router();

//route category

router.post(
  "/create-category",
  checkLogin,
  CheckIsAdmin,
  createCategoryController
);

router.put(
  "/update-category/:id",
  checkLogin,
  CheckIsAdmin,
  updateCategoryController
);

router.get(
  "/delete-category/:id",
  checkLogin,
  CheckIsAdmin,
  deleteCategoryController
);

router.get(
  "/get-all-category",
  checkLogin,
  CheckIsAdmin,
  getAllCategoryController
);

export default router;
