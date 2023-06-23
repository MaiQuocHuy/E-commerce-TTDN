import express from "express";
import {
  forgotPasswordController,
  loginController,
  registerController,
} from "../controllers/authControllers.js";
import { CheckIsAdmin, checkLogin } from "../middlewares/middleware.js";

//router object
const router = express.Router();

//routing
//REGISTER // LOGIN
router.post("/register", registerController);
router.post("/login", loginController);
router.post("/forgot-password", forgotPasswordController);

//protect route user
router.get("/user-auth", checkLogin, (req, res) => {
  return res.status(200).send({
    ok: true,
  });
});

router.get("/admin-auth", checkLogin, CheckIsAdmin, (req, res) => {
  return res.status(200).send({
    ok: true,
  });
});

export default router;
