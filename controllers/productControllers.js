import productModel from "../models/productModel.js";
import slugify from "slugify";

export const getAllProductController = async (req, res) => {
  try {
    const products = await productModel.find({});
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

export const createProductController = async (req, res) => {
  try {
    const { name, price, category, inventory, shipping } = req.body;
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
    if (!category) {
      return res.status(404).send({
        error: "Category is required",
      });
    }
    if (!inventory) {
      return res.status(404).send({
        error: "Inventory is required",
      });
    }
    const slug = slugify(name);
    const product = await new productModel({
      name,
      slug,
      price,
      category,
      quantity: 0,
      inventory,
      shipping,
    }).save();
    return res.status(200).send({
      success: true,
      message: "Created product successfully",
      product,
    });
  } catch (error) {
    return res.status(404).send({
      success: true,
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
    });
  }
};

export const updateProductController = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, category, inventory, shipping } = req.body;
    const slug = slugify(name);
    const existProduct = await productModel.findById(id);
    const product = await productModel.findByIdAndUpdate(
      id,
      {
        name: name || existProduct.name,
        slug: slug || existProduct.slug,
        price: price || existProduct.price,
        category: category || existProduct.category,
        shipping: shipping || existProduct.shipping,
        inventory: inventory || existProduct.inventory,
        quantity: existProduct.quantity,
      },
      { new: true }
    );
    return res.status(200).send({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    res.status(404).send({
      success: false,
      message: "Product is not updated successfully",
    });
  }
};
