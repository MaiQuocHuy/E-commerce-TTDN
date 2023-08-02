import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "./../helpers/authHelper.js";
import JWT from "jsonwebtoken";
import nodemailer from "nodemailer";
import wishModel from "../models/wishModel.js";

export const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
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

    //saveUser
    const user = await new userModel({
      name,
      email,
      phone: "",
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
      return res.status(400).send({
        success: false,
        error: "Email is required",
      });
    }
    if (!password) {
      return res.status(400).send({
        success: false,
        error: "Password is required",
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.send({
        success: false,
        error: "Email is not exist",
      });
    }
    const comparePass = await comparePassword(password, user.password);
    if (!comparePass) {
      return res.send({
        success: false,
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

  let randomNumber = Math.floor(Math.random() * 999999) + 100000;

  const mailOptions = {
    from: "maiquochuy16122003@gmail.com",
    to: email,
    subject: "OTP Exist in 30s",
    text: `OTP is ${randomNumber} Exist in 30s`,
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

export const updateProfile = async (req, res) => {
  try {
    const { name, address, phone, email } = req.body;
    const id = req.user._id;

    const user = await userModel.findById(id);
    const updateUser = await userModel.findByIdAndUpdate(
      id,
      {
        name: name || user.name,
        address: address || user.address,
        phone: phone || user.phone,
        email: email || user.email,
        password: user.password,
        role: user.role,
      },
      { new: true }
    );
    return res.status(200).send({
      success: true,
      message: "Updated profile successfully",
      updateUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).send({
      success: false,
      message: "Updated profile is not successfully",
      error,
    });
  }
};

export const updatePasswordController = async (req, res) => {
  try {
    const { password, email } = req.body;
    if (password) {
      const hashPass = await hashPassword(password);
      const user = await userModel.findOneAndUpdate(
        { email },
        {
          password: hashPass,
        },
        {
          new: true,
        }
      );
      return res.status(200).send({
        success: true,
        user,
      });
    }
  } catch (error) {
    return res.status(404).send({
      success: false,
      error,
    });
  }
};

export const getInfoUserController = async (req, res) => {
  try {
    const { id } = req.body;
    const user = await userModel.findById(id);
    return res.status(200).send({
      success: true,
      message: "Loading Information",
      user,
    });
  } catch (error) {
    return res.status(404).send({
      success: false,
      error,
    });
  }
};

export const handleWishProductController = async (req, res) => {
  try {
    const { idProduct } = req.params;
    const id = req.user._id;
    const wish = await wishModel.findOne({
      "products.product": idProduct,
      user: id,
    });
    console.log(wish);
    let handleWish = null;
    if (wish) {
      handleWish = await wishModel
        .findOneAndUpdate(
          {
            "products.product": idProduct,
            user: id,
          },
          {
            $pull: { products: { product: idProduct } },
          },
          { new: true }
        )
        .populate({ path: "products.product", select: "-photo" })
        .populate({
          path: "products.product",
          populate: {
            path: "branch",
            module: "Branch",
          },
        });
    } else {
      console.log("Davao");
      handleWish = await wishModel
        .findOneAndUpdate(
          {
            user: id,
          },
          {
            $push: { products: { product: idProduct } },
          },
          { new: true }
        )
        .populate({ path: "products.product", select: "-photo" })
        .populate({
          path: "products.product",
          populate: {
            path: "branch",
            module: "Branch",
          },
        });
    }
    return res.status(200).send({
      success: true,
      message: "Handle Tym",
      handleWish,
    });
  } catch (error) {
    return res.status(404).send({
      success: false,
      error,
    });
  }
};

export const createWishController = async (req, res) => {
  try {
    const { id } = req.body;
    const wish = await new wishModel({
      products: [],
      user: id,
    }).save();
    return res.status(200).send({
      success: true,
      message: "Success",
      wish,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: `${error}`,
      error,
    });
  }
};

export const getAllWishController = async (req, res) => {
  try {
    const id = req.user._id;
    const wishes = await wishModel
      .findOne({
        user: id,
      })
      .populate({ path: "products.product", select: "-photo" })
      .populate({
        path: "products.product",
        populate: {
          path: "branch",
          module: "Branch",
        },
      });
    return res.status(200).send({
      success: true,
      message: "Success",
      wishes,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: `${error}`,
      error,
    });
  }
};

export const getAllUserController = async (req, res) => {
  try {
    const users = await userModel.find({
      role: 0,
    });
    return res.status(200).send({
      success: true,
      users,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: `${error}`,
      error,
    });
  }
};
