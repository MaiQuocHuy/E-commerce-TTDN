import mongoose from "mongoose";

const checkoutSchema = new mongoose.Schema(
  {
    checkoutName: {
      type: String,
      required: true,
    },
    checkoutPhone: {
      type: String,
      required: true,
    },
    checkoutEmail: {
      type: String,
      required: true,
    },
    checkoutAddress: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

export default mongoose.model("checkout", checkoutSchema);
