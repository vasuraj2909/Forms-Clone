import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    image: { public_id: String, url: String },
  },
  { timestamps: true }
);

export default mongoose.model("images", imageSchema);
