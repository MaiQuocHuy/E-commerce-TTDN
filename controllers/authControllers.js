import { token } from "morgan";
import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "./../helpers/authHelper.js";
import JWT from "jsonwebtoken";
import nodemailer from "nodemailer";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    //validation
    if (!name) {
      return res.send({
        error: "Name is required",
      });
    }
    if (!email) {
      return res.send({
        error: "email is required",
      });
    }
    if (!password) {
      return res.send({
        error: "password is required",
      });
    }
    if (!phone) {
      return res.send({
        error: "phone is required",
      });
    }

    //check User
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Existing user already exists",
      });
    }

    //hashPasswword User
    const hashPass = await hashPassword(password);

    console.log(hashPassword);
    //saveUser
    const user = await new userModel({
      name,
      email,
      phone,
      address: "",
      password: hashPass,
    }).save();

    res.status(200).send({
      success: true,
      message: "User saved successfully",
      user,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error saving user",
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.send({
        error: "Email is required",
      });
    }
    if (!password) {
      return res.send({
        error: "Password is required",
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.send({
        error: "Email is not exist",
      });
    }
    const comparePass = await comparePassword(password, user.password);
    if (!comparePass) {
      return res.send({
        error: "Password is not correct",
      });
    }

    const token = await JWT.sign({ _id: user.id }, process.env.JWT_TOKEN, {
      expiresIn: "7d",
    });

    return res.status(200).send({
      success: true,
      message: "Login successful",
      user,
      token,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
    });
  }
};

export const forgotPasswordController = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.send({
        error: "Email is required",
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.send({
        error: "Email is not registered",
      });
    }

    const numberRandom = sendOTP(user.email);
    console.log(numberRandom);
    return res.status(200).send({
      success: true,
      numberRandom,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      error,
    });
  }
};

function sendOTP(email) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "maiquochuy16122003@gmail.com",
      pass: "igghioxnvrlrpxec",
    },
  });

  const randomNumber = Math.floor(Math.random() * 999999) + 100000;
  const mailOptions = {
    from: "maiquochuy16122003@gmail.com",
    to: email,
    subject: "OTP",
    text: `OTP is ${randomNumber}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.send({ error });
    } else {
      console.log("Email sent: " + info.response);
    }
  });

  return randomNumber;
}
