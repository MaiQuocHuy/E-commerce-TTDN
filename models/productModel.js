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
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: mongoose.ObjectId,
    ref: "Category",
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
  //   photo: {
  //     data: Buffer,
  //     contentType: String,
  //   },
  shipping: {
    type: Boolean,
  },
});

export default mongoose.model("Products", productSchema);
