import Ticket from "../models/tickets.model.js";

const createTicket = async (req, res) => {
  try {
    const {
      userId,
      name,
      description,
      date,
      price,
      quantity,
      canCancel,
      cancelDate,
      countries,
    } = req.body;

    const newTicket = await new Ticket({
      userId,
      name,
      description,
      date,
      price,
      quantity,
      canCancel,
      cancelDate,
      countries,
    });
    await newTicket.save();
    return res.status(201).json({ message: "Ticket created." });
  } catch (e) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

const findTicket = async (req, res) => {
  try {
    const tickets = await Ticket.find().sort({ price: 1 });
    res.json(tickets);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

async function findTicketById(req, res, next) {
  try {
    const ticket = await Ticket.findOne({ _id: req.params.id });
    res.json(ticket);
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function updateTicketById(req, res, next) {
  try {
    const ticket = await Ticket.findOneAndUpdate({ _id: req.params.id });
    res.json(ticket);
  } catch (err) {
    console.log(err);
    next(err);
  }
}
async function deleteTicketById(req, res, next) {
  try {
    await Ticket.deleteOne({ _id: req.params.id });
    res.json("Ticket deleted.");
  } catch (err) {
    console.log(err);
    next(err);
  }
}
const obj1 = {
  createTicket,
  findTicket,
  findTicketById,
  updateTicketById,
  deleteTicketById,
};

export default obj1;
