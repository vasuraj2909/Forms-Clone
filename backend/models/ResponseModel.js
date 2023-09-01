import mongoose from "mongoose";

const responseSchema = new mongoose.Schema(
  {
    formId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "forms",
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
        selectedMcqIndex: Number,
        textAnswer: String,
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
  },
  { timestamps: true }
);

export default mongoose.model("responses", responseSchema);
