import Router from "express";
import ticket from "../controllers/tickets.controller.js";
import verifyJwt from "../middleware/jwtVerifyToken.js";
import permissionToTicket from "../middleware/ticket.js";
import comment from "../controllers/comment.controller.js";

const { createComment, getAllComments } = comment;
const {
  createTicket,
  findTicket,
  findTicketById,
  updateTicketById,
  deleteTicketById,
} = ticket;
const ticketRouter = Router();

/**
 * @swagger
 * components:
 *   tags:
 *     - name: Tickets
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Ticket:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         username:
 *           type: string
 */

/**
 * @openapi
 * /users:
 *   get:
 *     tags: [Tickets]
 *     description: Get all tickets
 *     responses:
 *       200:
 *         description: Users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *
 *       401:
 *         description: User must be logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
ticketRouter.post("/create", verifyJwt, createTicket);
ticketRouter.get("/", verifyJwt, findTicket);
ticketRouter.get("/:id", verifyJwt, findTicketById);
ticketRouter.patch("/:id", verifyJwt, permissionToTicket, updateTicketById);
ticketRouter.delete("/:id", verifyJwt, permissionToTicket, deleteTicketById);
ticketRouter.post("/:id/addComment", verifyJwt, createComment);
ticketRouter.get("/:id/comments", verifyJwt, getAllComments);

export default ticketRouter;
