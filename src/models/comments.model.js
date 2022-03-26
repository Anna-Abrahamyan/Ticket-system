import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Comment = new mongoose.Schema({
  text: {
    type: String,
    trim: true,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("comments", Comment);
