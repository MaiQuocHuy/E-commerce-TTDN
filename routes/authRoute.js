import express from "express";
import {
  createWishController,
  forgotPasswordController,
  getAllUserController,
  getAllWishController,
  getInfoUserController,
  handleWishProductController,
  loginController,
  registerController,
  updatePasswordController,
  updateProfile,
} from "../controllers/authControllers.js";
import { CheckIsAdmin, checkLogin } from "../middlewares/middleware.js";

//router object
const router = express.Router();

//routing
//REGISTER // LOGIN
router.post("/register", registerController);
router.post("/login", loginController);
router.post("/forgot-password", forgotPasswordController);
router.post("/update-password", updatePasswordController);
router.get("/wishproduct/:idProduct", checkLogin, handleWishProductController);
router.post("/create-wish", createWishController);
router.get("/get-all-wishes", checkLogin, getAllWishController);

router.get("/user-auth", checkLogin, (req, res) => {
  res.status(200).send({ ok: true });
});

router.get("/admin-auth", checkLogin, CheckIsAdmin, (req, res) => {
  return res.status(200).send({
    ok: true,
  });
});

router.put("/user-auth/update-profile", checkLogin, updateProfile);
router.post("/info-user", checkLogin, getInfoUserController);
router.get("/get-all-user", checkLogin, CheckIsAdmin, getAllUserController);

export default router;
