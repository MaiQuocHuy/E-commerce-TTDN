import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    paymentName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
export default mongoose.model("payment", paymentSchema);
