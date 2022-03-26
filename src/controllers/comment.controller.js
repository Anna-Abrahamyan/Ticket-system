import Comment from "../models/comments.model.js";
import Ticket from "../models/tickets.model.js";

const createComment = async (req, res) => {
  try {
    const id = req.params.id;
    const comment = new Comment({
      text: req.body.text,
      ticket: id,
    });
    await comment.save();
    const ticketRelated = await Ticket.findById(id);
    ticketRelated.comments.push(comment);
    await ticketRelated.save();
    return res.status(201).json({ message: "Comment created." });
  } catch (e) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

async function getAllComments(req, res, next) {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (err) {
    console.log(err);
    next(err);
  }
}
const obj = {
  createComment,
  getAllComments,
};

export default obj;
