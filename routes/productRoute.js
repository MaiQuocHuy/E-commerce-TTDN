import express from "express";
import { checkLogin, CheckIsAdmin } from "../middlewares/middleware.js";
import {
  createProductController,
  deleteProductController,
  getAllProductController,
  getArriveProductController,
  getProductByBranchController,
  getSingleProductController,
  paginatedProductController,
  productPhotoController,
  searchProductController,
  updateProductController,
} from "../controllers/productControllers.js";
import formidable from "express-formidable";

const router = express.Router();

//route category
router.get("/get-all-product", getAllProductController);
router.post(
  "/create-product",
  checkLogin,
  CheckIsAdmin,
  formidable(),
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
  formidable(),
  updateProductController
);
router.get("/get-single-product/:slug", getSingleProductController);
router.get("/product-photo/:pid", productPhotoController);
router.get("/paginatedproduct", paginatedProductController);
router.get("/search/:keyword", searchProductController);
router.get("/get-product-by-branch/:bid", getProductByBranchController);
router.get("/get-arrive-product", getArriveProductController);

export default router;
