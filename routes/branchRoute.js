import express from "express";
import { checkLogin, CheckIsAdmin } from "../middlewares/middleware.js";
import {
  createBranchController,
  deleteBranchController,
  getAllBranchController,
  getSingleBranchController,
  paginatedBranchController,
  searchBranchController,
  updateBranchController,
} from "../controllers/branchControllers.js";

const router = express.Router();

//route branch

router.post("/create-branch", checkLogin, CheckIsAdmin, createBranchController);

router.put(
  "/update-branch/:id",
  checkLogin,
  CheckIsAdmin,
  updateBranchController
);

router.get(
  "/delete-branch/:id",
  checkLogin,
  CheckIsAdmin,
  deleteBranchController
);

router.get("/search/:keyword", searchBranchController);

router.get("/get-single-branch/:id", getSingleBranchController);

router.get("/get-all-branch", getAllBranchController);

router.get("/paginatedbranch", paginatedBranchController);

export default router;
