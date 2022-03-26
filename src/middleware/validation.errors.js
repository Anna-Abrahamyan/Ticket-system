import validator from "express-validator";
const { validationResult } = validator;

const checkValidationErrors = (message) => async (req, res, next) => {
  try {
    const errors = await validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message,
      });
    }
    next();
  } catch (e) {
    console.log(e);
  }
};

export default {
  checkValidationErrors,
};
