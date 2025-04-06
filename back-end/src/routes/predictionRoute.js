import express from "express";
import Prediction from "../models/predictionModel.js";
import multer from "multer";

// setting up the router
const router = express.Router();
//import defined class to use method allowing for communication with fastapi & file uplo
const prediction = new Prediction();
const upload = multer();

//post route for creating a prediction which will return the breed of the uploaded pet image
//we will serve this prediciton in our front end to allow users to upload images of pets
//without having to worry about the breed specification of the pet
router.post("/", upload.single('file'), async (req, res) => {
    try {
       //check if file exists
        if (!req.file) {
            return res.status(400).json({ error: "No image uploaded" });
        }

        const imageFile = req.file;

        //make a preduction using defined method from prediction class(since it was imported)
        //promise;avoids sending empty response objects
        const result = await prediction.predict(imageFile);

        //send the recieved response
        res.json(result);
    } catch (error) {
        console.error("Prediction error:", error);
        res.status(500).json({ error: error.message });
    }
    
});

export default router;

