import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    email: {
      type: String,
      require: true,
      unique: [true, "Email already exist"],
    },
    password: { type: String, require: true },
    googleId: { type: String },
    emailVerified: { type: Boolean, default: false },
    picture: { type: String },
    createdForms: [],
  },
  { timestamps: true }
);

export default mongoose.model("users", userSchema);
