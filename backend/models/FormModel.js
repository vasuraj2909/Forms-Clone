import mongoose from "mongoose";

const formSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },

    name: { type: String, default: "" },

    description: {
      type: String,
      default: "",
    },

    questions: [
      {
        qtype: { value: String, label: String },
        required: { type: Boolean, default: false },
        question: {
          text: String,
          image: { public_id: String, url: String },
        },
        optionsList: [
          {
            text: String,
            image: { public_id: String, url: String },
            checked: Boolean,
          },
        ],
      },
    ],

    stared: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("forms", formSchema);
