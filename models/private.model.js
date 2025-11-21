import mongoose from "mongoose";

const privateSchema = new mongoose.Schema(
  {
    participants: [String],
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    text: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true },
);

const Private = mongoose.model("Private", privateSchema);

export default Private;
