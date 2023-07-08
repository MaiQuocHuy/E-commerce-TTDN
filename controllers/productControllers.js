import productModel from "../models/productModel.js";
import slugify from "slugify";
import fs from "fs";
import { pid } from "process";

export const getAllProductController = async (req, res) => {
  try {
    const products = await productModel.find({}).populate("branch");
    return res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).send({
      success: false,
      error,
    });
  }
};

export const getSingleProductController = async (req, res) => {
  try {
    const { slug } = req.params;
    const product = await productModel
      .findOne({ slug: slug })
      .populate("branch");
    return res.status(200).send({
      success: true,
      message: "Single product fetched",
      product,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).send({
      success: false,
      error,
    });
  }
};

export const createProductController = async (req, res) => {
  console.log("server to create");
  try {
    // console.log(req.fields);
    const { name, price, branch, inventory, quantity, gender, description } =
      req.fields;
    const { photo } = req.files;

    console.log(req.fields, "Check");

    if (!name) {
      return res.status(404).send({
        error: "Name is required",
      });
    }
    if (!price) {
      return res.status(404).send({
        error: "Price is required",
      });
    }
    if (!gender) {
      return res.status(404).send({
        error: "Gender is required",
      });
    }
    if (!branch) {
      return res.status(404).send({
        error: "branch is required",
      });
    }
    if (!description) {
      return res.status(404).send({
        error: "Description is required",
      });
    }
    if (!inventory) {
      return res.status(404).send({
        error: "Inventory is required",
      });
    }
    if (photo && photo.size > 1000000) {
      return res.status(404).send({
        error: "Photo is required and should be less than 1mb",
      });
    }
    const slug = slugify(name);
    const product = new productModel({
      ...req.fields,
      slug: slug,
    });
    if (photo) {
      // console.log(photo);
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save();
    return res.status(200).send({
      success: true,
      message: "Created product successfully",
      product,
    });
  } catch (error) {
    return res.status(404).send({
      success: false,
      message: "Created product Failed",
      error,
    });
  }
};

export const deleteProductController = async (req, res) => {
  try {
    const { id } = req.params;
    await productModel.findByIdAndDelete(id);
    return res.status(200).send({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    return res.status(404).send({
      success: true,
      message: "Product is not deleted successfully",
      error,
    });
  }
};

export const updateProductController = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, branch, inventory, gender } = req.fields;
    const { photo } = req.files;

    if (!name) {
      return res.status(404).send({
        error: "Name is required",
      });
    }
    if (!price) {
      return res.status(404).send({
        error: "Price is required",
      });
    }
    if (!gender) {
      return res.status(404).send({
        error: "Gender is required",
      });
    }
    if (!branch) {
      return res.status(404).send({
        error: "Branch is required",
      });
    }
    if (!inventory) {
      return res.status(404).send({
        error: "Inventory is required",
      });
    }
    if (photo && photo.size > 10000) {
      return res.status(404).send({
        error: "Photo is required and should be less than 1mb",
      });
    }
    const slug = slugify(name);
    // const existProduct = await productModel.findById(id);
    const product = await productModel.findByIdAndUpdate(
      id,
      {
        ...req.fields,
        slug: slug,
      },
      { new: true }
    );

    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.contentType;
    }

    await product.save();

    return res.status(200).send({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    res.status(404).send({
      success: false,
      message: "Product is not updated successfully",
      error,
    });
  }
};

export const productPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr while getting photo",
      error,
    });
  }
};

export const paginatedProductController = async (req, res) => {
  try {
    const allProduct = await productModel.find({}).populate("branch");
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const startIndex = (page - 1) * limit;
    const lastIndex = page * limit;

    const results = {};
    results.totalProduct = allProduct.length;
    results.pageCount = Math.ceil(allProduct.length / limit);

    if (lastIndex < allProduct.length) {
      results.next = {
        page: page + 1,
      };
    }
    if (startIndex > 0) {
      results.prev = {
        page: page - 1,
      };
    }

    results.result = allProduct.slice(startIndex, lastIndex);
    console.log(results);
    return res.json({
      results,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      error,
    });
  }
};

export const searchProductController = async (req, res) => {
  try {
    const product = req.params;
    const results = await productModel.find({
      $or: [
        { name: { $regex: product.keyword, $options: "i" } },
        { slug: { $regex: product.keyword, $options: "i" } },
      ],
    });
    console.log(results);
    res.json(results);
  } catch (error) {
    return res.status(400).send({
      success: false,
    });
  }
};

export const getProductByBranchController = async (req, res) => {
  try {
    const { bid } = req.params;
    const products = await productModel
      .find({
        branch: bid,
      })
      .select("-photo")
      .limit(6)
      .populate("branch");
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      error,
    });
  }
};

export const getArriveProductController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .select("-photo")
      .limit(4)
      .sort({ createdAt: -1 })
      .populate("branch");
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      error,
    });
  }
};
