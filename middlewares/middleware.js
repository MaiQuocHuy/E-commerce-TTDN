import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

export const checkLogin = async (req, res, next) => {
  try {
    const user = JWT.verify(req.headers.authorization, process.env.JWT_TOKEN);
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(4041).send({
      error,
    });
  }
};

export const CheckIsAdmin = async (req, res, next) => {
  try {
    console.log(req?.user);
    const user = await userModel.findById(req.user._id);
    if (user.role === 1) {
      next();
    } else {
      return res.status(401).send({
        success: false,
        message: "Authentication failed",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
