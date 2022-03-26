import Router from "express";
import usersController from "../controllers/user.controller.js";
import verifyJwt from "../middleware/jwtVerifyToken.js";

const userRouter = Router();

/**
 * @swagger
 * components:
 *   tags:
 *     - name: Users
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         country:
 *           type: string
 *         email:
 *           type: string
 */
userRouter.get("/", verifyJwt, usersController.getAllUsers);
userRouter.get("/:id", verifyJwt, usersController.getById);
userRouter.delete("/:id", verifyJwt, usersController.deleteUserById);
userRouter.delete("/", verifyJwt, usersController.deleteUsers);

export default userRouter;
