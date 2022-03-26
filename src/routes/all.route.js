import Router from "express";
import authRouter from "./auth.route.js";
import userRouter from "./users.route.js";
import ticketRouter from "./tickets.route.js";

const allRouters = Router();

allRouters.use("/auth", authRouter);
allRouters.use("/users", userRouter);
allRouters.use("/tickets", ticketRouter);

export default allRouters;
