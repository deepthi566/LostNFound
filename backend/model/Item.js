import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    location: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["lost", "found"],
      required: true,
    },
    // date: {
    //   type: String,
    //   required: true,
    // },
    number: {
      type: String,
      required: true,
    },
    img: [
      {
        type: String,
        default: "https://i.ibb.co/DpZ3qy2/Untitled-design-10.png",
      },
    ],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);
const Item = mongoose.model("Item", itemSchema);
export default Item;
