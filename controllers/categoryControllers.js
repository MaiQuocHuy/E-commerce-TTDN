import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";

export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({
        success: false,
        error: "Name is required",
      });
    }

    const slug = slugify(name);
    const checkExist = await categoryModel.findOne({ slug: slug });
    if (checkExist) {
      return res.status(401).send({
        success: false,
        error: "Category already exists",
      });
    }

    const category = await new categoryModel({
      name,
      slug: slug,
    }).save();

    return res.status(200).send({
      success: true,
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    return res.status(401).send({
      success: false,
      message: "Category is not created successfully",
      category,
    });
  }
};

export const updateCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
      return res.status(401).send({
        error: "Name is required",
      });
    }

    const checkCategory = await categoryModel.findById(id);
    if (!checkCategory) {
      return res.status(401).send({
        error: "Category is not found",
      });
    }

    const category = await categoryModel.findByIdAndUpdate(
      id,
      {
        name,
        slug: slugify(name),
      },
      { new: true }
    );

    return res.status(200).send({
      success: true,
      error: "Category has been updated",
      category,
    });
  } catch (error) {
    return res.status(401).send({
      success: false,
      error: "Category has not been updated",
    });
  }
};

export const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    await categoryModel.findByIdAndDelete(id);
    return res.status(200).send({
      success: true,
      message: "Category has been deleted",
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      error,
    });
  }
};

export const getAllCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.find({});
    return res.status(200).send({
      success: true,
      category,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
    });
  }
};
