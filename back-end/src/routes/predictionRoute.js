import express from "express";
import Prediction from "../models/predictionModel";

// setting up the router
const router = express.Router();

//post route for creating a prediction which will return the breed of the uploaded pet image
//we will serve this prediciton in our front end to allow users to upload images of pets
//without having to worry about the breed specification of the pet
router.post("/prediction", async (req, res, next) => {
    const prediction = await Prediction.predictImage()
});

