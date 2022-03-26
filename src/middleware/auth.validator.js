import validator from "express-validator";

const { check } = validator;

const registerValidator = [
  check("email", "Incorrect email").isEmail(),
  check("password", "Minimum password length of 8 characters").isLength({
    min: 8,
  }),
];

const loginValidator = [check("password", "Inter password").exists()];

const obj2 = { registerValidator, loginValidator };

export default obj2;
