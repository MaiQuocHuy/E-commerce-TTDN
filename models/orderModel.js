import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: mongoose.ObjectId,
          ref: "Products",
        },
        quantity: {
          type: Number,
        },
      },
    ],
    payment: {
      type: mongoose.ObjectId,
      ref: "payment",
    },
    totalmoney: {
      type: Number,
      required: true,
    },
    orderNote: {
      type: String,
      required: true,
    },
    checkout: {
      type: mongoose.ObjectId,
      ref: "checkout",
    },
    user: {
      type: mongoose.ObjectId,
      ref: "users",
    },
    status: {
      type: String,
      default: "Not Process",
      enum: ["Not Process", "Processing", "Shipping", "Finish"],
    },
  },
  { timestamps: true }
);
export default mongoose.model("Orders", orderSchema);
