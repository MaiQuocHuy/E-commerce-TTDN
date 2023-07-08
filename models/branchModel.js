import mongoose from "mongoose";

const branchSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  slug: {
    type: String,
    lowercase: true,
  },
});

export default mongoose.model("Branch", branchSchema);
