import mongoose from "mongoose";

const User = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    email: {
      unique: [true, "This email already registered"],
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      expires: "2m",
      default: Date.now,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    coins: {
      type: Number,
    },
  },
  { collection: "users" }
);

export default mongoose.model("user", User);
