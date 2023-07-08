import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    lowercase: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  branch: {
    type: mongoose.ObjectId,
    ref: "Branch",
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  inventory: {
    type: Number,
    required: true,
  },
  photo: {
    data: Buffer,
    contentType: String,
  },
});

export default mongoose.model("Products", productSchema);
