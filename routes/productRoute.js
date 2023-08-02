import express from "express";
import { checkLogin, CheckIsAdmin } from "../middlewares/middleware.js";
import {
  ClearCartController,
  addCheckOutOrderPaymentController,
  addProductToCartController,
  changeStatusOrderController,
  createCartController,
  createCommentProduct,
  createPaymentController,
  createProductController,
  deleteCartController,
  deleteProductController,
  getAllCommentsController,
  getAllOrderByUser,
  getAllOrdersController,
  getAllPaymentController,
  getAllProductCartController,
  getAllProductController,
  getArriveProductController,
  getOrderDetailController,
  getProductByBranchController,
  getQuantityProductSoldoutByDay,
  getQuantityProductSoldoutByMonthYear,
  getQuantityProductSoldoutByYear,
  getSinglePaymentController,
  getSingleProductController,
  getTotalMoneyFollowDay,
  getTotalMoneyFollowMonth,
  getTotalMoneyFollowYear,
  handleCancelPayment,
  handleSuccessPayment,
  paginatedOrderController,
  paginatedProductController,
  productFiltersProductController,
  productPhotoController,
  saveCommentController,
  searchProductController,
  updatePaymentController,
  updateProductController,
  updateQuantityProductController,
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
router.post("/product-filters", productFiltersProductController);

router.get("/get-single-product/:slug", getSingleProductController);
router.get("/product-photo/:pid", productPhotoController);
router.get("/paginatedproduct", paginatedProductController);
router.get("/paginatedorder", paginatedOrderController);

router.get("/search/:keyword", searchProductController);
router.get("/get-product-by-branch/:bid", getProductByBranchController);
router.get("/get-arrive-product", getArriveProductController);
//cart
router.post("/add-to-cart", addProductToCartController);
router.post("/create-cart", createCartController);
router.get("/delete-cart/:idAuth/:idPro", deleteCartController);
router.post("/get-all-product-cart", getAllProductCartController);
router.post("/update-quantity-product-cart", updateQuantityProductController);
router.post("/clear-cart", ClearCartController);
router.post(
  "/add-checkout-order-payment",
  formidable(),
  addCheckOutOrderPaymentController
);
router.get("/payment/success", handleSuccessPayment);
router.get("/payment/cancel", handleCancelPayment);

router.post("/create-payment", createPaymentController);
router.get("/get-all-payment", getAllPaymentController);
router.get("/get-single-payment/:id", getSinglePaymentController);
router.put(
  "/update-payment/:id",
  checkLogin,
  CheckIsAdmin,
  updatePaymentController
);

router.get("/get-all-orders", checkLogin, getAllOrdersController);
router.post(
  "/change-status-order",
  checkLogin,
  CheckIsAdmin,
  changeStatusOrderController
);
router.get("/orderdetail/:id", checkLogin, getOrderDetailController);
router.get("/get-all-orders/:id", checkLogin, getAllOrderByUser);
router.post("/create-comment", checkLogin, CheckIsAdmin, createCommentProduct);
router.post("/save-comment", checkLogin, saveCommentController);
router.post("/get-all-comment", getAllCommentsController);
router.get("/get-totalmoney-follow-year", getTotalMoneyFollowYear);
router.get("/get-totalmoneymonth-follow-year", getTotalMoneyFollowMonth);
router.get("/get-totalmoney-follow-day", getTotalMoneyFollowDay);

router.get("/get-product-soldout", getQuantityProductSoldoutByYear);
router.get("/get-product-soldout-month", getQuantityProductSoldoutByMonthYear);
router.get("/get-product-soldout-day", getQuantityProductSoldoutByDay);

export default router;
