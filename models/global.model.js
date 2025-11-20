import mongoose from "mongoose";

const globalSchema = new mongoose.Schema(
  {
    sender: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
      },
      picture: {
        type: String,
        required: true,
        trim: true,
      },
    },
    text: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true },
);

const Global = mongoose.model("Global", globalSchema);

export default Global;
