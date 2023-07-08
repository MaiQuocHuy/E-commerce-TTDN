import branchModel from "../models/branchModel.js";
import slugify from "slugify";

export const createBranchController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({
        success: false,
        error: "Name is required",
      });
    }

    const slug = slugify(name);
    const checkExist = await branchModel.findOne({ slug: slug });
    if (checkExist) {
      return res.status(401).send({
        success: false,
        error: "branch already exists",
      });
    }

    const branch = await new branchModel({
      name,
      slug: slug,
    }).save();

    return res.status(200).send({
      success: true,
      message: "branch created successfully",
      branch,
    });
  } catch (error) {
    return res.status(401).send({
      success: false,
      message: "branch is not created successfully",
      branch,
    });
  }
};

export const updateBranchController = async (req, res) => {
  try {
    const { id } = req.params;
    const { updated } = req.body;

    if (!updated) {
      return res.status(401).send({
        error: "Name is required",
      });
    }

    const checkbranch = await branchModel.findById(id);
    if (!checkbranch) {
      return res.status(401).send({
        error: "branch is not found",
      });
    }

    const branch = await branchModel.findByIdAndUpdate(
      id,
      {
        name: updated,
        slug: slugify(updated),
      },
      { new: true }
    );

    console.log(branch);

    return res.status(200).send({
      success: true,
      error: "branch has been updated",
      branch,
    });
  } catch (error) {
    return res.status(401).send({
      success: false,
      error: "branch has not been updated",
    });
  }
};

export const deleteBranchController = async (req, res) => {
  try {
    const { id } = req.params;
    await branchModel.findByIdAndDelete(id);
    return res.status(200).send({
      success: true,
      message: "branch has been deleted",
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      error,
    });
  }
};

export const getAllBranchController = async (req, res) => {
  try {
    const branch = await branchModel.find({});
    return res.status(200).send({
      success: true,
      branch,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
    });
  }
};

export const getSingleBranchController = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(branch);
    const branch = await branchModel.findById(id);
    return res.status(200).send({
      success: true,
      message: "branch has been given",
      branch,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
    });
  }
};

export const searchBranchController = async (req, res) => {
  try {
    const branch = req.params;
    // console.log(branch);
    const results = await branchModel.find({
      $or: [
        { name: { $regex: branch.keyword, $options: "i" } },
        { slug: { $regex: branch.keyword, $options: "i" } },
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

export const paginatedBranchController = async (req, res) => {
  try {
    const allbranch = await branchModel.find({});
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    // console.log(req.params, "CheckParams");
    const startIndex = (page - 1) * limit;
    const lastIndex = page * limit;

    const results = {};
    results.totalbranch = allbranch.length;
    results.pageCount = Math.ceil(allbranch.length / limit);

    if (lastIndex < allbranch.length) {
      results.next = {
        page: page + 1,
      };
    }
    if (startIndex > 0) {
      results.prev = {
        page: page - 1,
      };
    }

    results.result = allbranch.slice(startIndex, lastIndex);

    return res.json({
      results,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      error,
    });
  }
};
