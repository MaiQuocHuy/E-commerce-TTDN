import mongoose from "mongoose";

const wishSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: mongoose.ObjectId,
          ref: "Products",
        },
      },
    ],
    user: {
      type: mongoose.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);
export default mongoose.model("Wish", wishSchema);
