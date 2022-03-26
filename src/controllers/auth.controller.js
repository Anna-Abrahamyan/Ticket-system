import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/users.model.js";
import mailer from "../services/nodemailer.js";

const { sendMailer, mailToken } = mailer;
const register = async (req, res) => {
  try {
    const { firstName, lastName, country, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "This email has already registered.",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await new User({
      firstName,
      lastName,
      country,
      email,
      password: hashedPassword,
      token: mailToken,
    });
    await newUser.save();
    sendMailer(req.body.email);
    return res.status(201).json({ message: "Registration created." });
  } catch (e) {
    res.status(500).json({ message: "Something went wrong." });
  }
};
const verify = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { token: req.params.token },
      { isActive: true, coins: 1000 }
    );
    if (!user) {
      return res.status(400).json({
        message: "Valid token.",
      });
    }

    user.coins = 1000;
    res.status(200).json({ message: "Verify successfully" });
  } catch (e) {
    console.log(e);
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !user.isActive) {
      return res.status(400).json({
        message: "User not found.",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return done(null, false, { message: "valid password." });
    }
    const token = await jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ message: "created successfully", token });
  } catch (e) {
    res.status(500).json({ message: "Incorrect password." });
  }
};

const obj1 = { register, login, verify };

export default obj1;
