import express from "express";
import Users from "../models/userModel.js";
const router = express.Router();

//TODO for tamar

// POST /register - Register a new user
router.post("/register", async (req, res) => {
    try {
        const user = await Users.register(req.body);
        return res.status(201).json({ user });
    } catch (err) {
        console.error("Registration error:", err);
        return res.status(400).json({ error: err });
    }
});



export default router;