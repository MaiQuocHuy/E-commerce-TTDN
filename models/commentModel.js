import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  product: {
    type: mongoose.ObjectId,
    ref: "Products",
  },
  comments: [
    {
      comment: {
        type: String,
      },
      user: {
        type: mongoose.ObjectId,
        ref: "users",
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});
export default mongoose.model("Comment", commentSchema);
