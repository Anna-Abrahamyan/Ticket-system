import ticketsModel from "../models/tickets.model.js";
import Ticket from "../models/tickets.model.js";

async function permissionToTicket(req, res, next) {
  try {
    const userID = req.headers["id"];
    const ticket = await Ticket.findOne({ _id: req.params.id });
    if (userID != ticket.userId) {
      res.status(401).json({
        error: "You do not have access, it's not your created ticket.",
      });
      return;
    }
    next();
  } catch (err) {
    res.status(401).json({
      error: "Bad request.",
    });
  }
}

export default permissionToTicket;
