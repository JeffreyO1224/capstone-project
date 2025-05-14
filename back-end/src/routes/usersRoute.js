import express from "express";
import Users from "../models/userModel.js";
import { createUserJwt } from "../utils/token.js";
const router = express.Router();

// register a new user
router.post("/register", async (req, res) => {
  try {
    // calls register method from user model
    const user = await Users.register(req.body);
    // user registered successfully
    const token = createUserJwt({
      user_name: user.userName,
      email: user.email,
    });
    res.status(201).json({ user, token });
  } catch (err) {
    // user registration failed
    res
      .status(400)
      .json({ error: "Registration failed. Please check your inputs." });
  }
});

// login an existing user
router.post("/login", async (req, res) => {
  try {
    // calls login methos from user model
    const user = await Users.login(req.body);
    // user logged in successfully
    //generate token using the user we just received
    const token = createUserJwt({
      user_name: user.userName,
      email: user.email,
    });
    //return both the user and the token (will remove password later)
    res.status(200).json({ user, token });
  } catch (err) {
    // user log in failed
    res
      .status(401)
      .json({
        error:
          "Could not log in. Please check that your user name or password are correct.",
      });
  }
});

export default router;