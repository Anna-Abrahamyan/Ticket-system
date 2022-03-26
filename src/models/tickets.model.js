import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Ticket = new mongoose.Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    name: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    canCancel: { type: Boolean },
    cancelDate: { type: Date },
    countries: [{ type: String }],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    likeCount: { type: Number, default: 0 },
    dislikeCount: { type: Number, default: 0 },
  },
  { collection: "tickets" }
);

export default mongoose.model("tickets", Ticket);
