import Router from "express";
import controller from "../controllers/auth.controller.js";
import validator from "../middleware/auth.validator.js";
import errors from "../middleware/validation.errors.js";

const { checkValidationErrors } = errors;
const { register, login, verify } = controller;
const { registerValidator, loginValidator } = validator;
const authRouter = Router();

authRouter.post(
  "/register",
  registerValidator,
  checkValidationErrors("Incorrect data during registration."),
  register
);
authRouter.get("/verify/:token", verify);
authRouter.post(
  "/login",
  loginValidator,
  checkValidationErrors("Incorrect data during login."),
  login
);

export default authRouter;
