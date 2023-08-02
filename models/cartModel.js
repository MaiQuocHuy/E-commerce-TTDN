import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: mongoose.ObjectId,
          ref: "Products",
        },
        quantity: {
          type: Number,
          default: 0,
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

export default mongoose.model("cart", cartSchema);
