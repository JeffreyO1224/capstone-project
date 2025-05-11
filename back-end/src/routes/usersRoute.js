import express from "express";
import Users from "../models/userModel.js";
const router = express.Router();

// register a new user
router.post('/register', async (req, res) => {
    try {
        // calls register method from user model
        const user = await Users.register(req.body);
        // user registered successfully
        res.status(201).json({user});
    }
    catch (err) {
        // user registration failed
        res.status(400).json({error : "Registration failed. Please check your inputs."});
    }
});

// login an existing user
router.post('/login', async (req, res) => {
    try {
        // calls login methos from user model
        const user = await Users.login(req.body);
        // user logged in successfully
        res.status(200).json({user});
    }
    catch (err) {
        // user log in failed
        res.status(401).json({error : "Could not log in. Please check that your user name or password are correct."});
    }
});


export default router;