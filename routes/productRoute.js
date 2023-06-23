import express from "express";
import { checkLogin, CheckIsAdmin } from "../middlewares/middleware.js";
import {
  createProductController,
  deleteProductController,
  getAllProductController,
  updateProductController,
} from "../controllers/productControllers.js";

const router = express.Router();

//route category
router.get("/get-all-product", getAllProductController);
router.post(
  "/create-product",
  checkLogin,
  CheckIsAdmin,
  createProductController
);
router.get(
  "/delete-product/:id",
  checkLogin,
  CheckIsAdmin,
  deleteProductController
);
router.put(
  "/update-product/:id",
  checkLogin,
  CheckIsAdmin,
  updateProductController
);

export default router;
