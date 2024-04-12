import { emailTemplate } from "../helpers/email.js";
import { awsSES } from "../services/awsSES.js";
import jwt from "jsonwebtoken";
import { hashPassword, comparePassword } from "../helpers/auth.js";
import User from "../models/user.model.js";
import { nanoid } from "nanoid";
import validator from "email-validator";

export const welcome = (req, res) => {
  res.json({
    data: "Hello from nodejs api",
  });
};

export const preRegister = async (req, res) => {
  // create jwt with email and password then email as clickable link
  // only when user click on that email link, registration completes
  try {
    const { email, password } = req.body;
    // validate email and password
    if (!validator.validate(email)) {
      return res.status(400).json({ error: "A valid email is required" });
    }
    if (!password) {
      return res.status(400).json({ error: "Password is required" });
    }
    if (password && password?.length < 6) {
      return res
        .status(400)
        .json({ error: "Password should be at least 6 characters" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "Email is taken" });
    }

    const token = jwt.sign({ email, password }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const content = `<p>Please click the link below to activate your account.</p>
    <a href="${process.env.CLIENT_URL}/auth/account-activate/${token}">Activate my account</a>`;

    const subject = "Please verify your account.";
    awsSES.sendEmail(emailTemplate(email, content, subject), (err, data) => {
      if (err) {
        console.log(err);
        return res.status(400).send({ error: "Email is invalid" });
      } else {
        console.log(data);
        return res.json({ oK: true });
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Something went wrong. Try again." });
  }
};

export const register = async (req, res) => {
  try {
    const { token } = req.body;
    const { email, password } = jwt.verify(token, process.env.JWT_SECRET);
    const hashedPassword = await hashPassword(password);
    const user = new User({
      username: nanoid(6),
      email,
      password: hashedPassword,
    });
    await user.save();

    const newToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const refreshToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    user.password = undefined;
    user.resetCode = undefined;

    return res.json({ token: newToken, refreshToken, user });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Something went wrong. Try again." });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    //find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(403).json({ error: "User not found" });
    }
    //compare password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(403).json({ error: "Wrong password" });
    }
    //create jwt
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    //send the response
    user.password = undefined;
    user.resetCode = undefined;

    return res.json({ token, refreshToken, user });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Something went wrong. Try again." });
  }
};
