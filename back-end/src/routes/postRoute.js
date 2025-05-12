//defines combined logic that will await whats sent to the s3 defined methods and then carry on with
//specific logic
import express from "express";
import { uploadPetImage, sendImageKey, getFileStream } from "../models/s3.js";
import Post from "../models/postModel.js"
import database from "../database.js";
import multer from "multer";
import fs from "fs";
import util from "util";

const router = express.Router();
const upload = multer({ dest: "uploads/" });
const unlinkFile = util.promisify(fs.unlink);

router.post('/createPost', upload.single('image'), async (req, res)=> {
    try {
        //grab image by deconstructing request body
        const file = req.file;
        //saves the returned key from uploading image file using method in s3 model; will insert into image_url
        const key = await uploadPetImage(file);
        //delete temp image restored on local computer
        await unlinkFile(file.path);
        //with key call and pass values to createpetpost
        const insertionResult = await Post.createPetPost(key, req.body);
        //success
        res.status(201).json({insertionResult})
    }
    catch (err) {
        console.error("ERROR:", err);  // <---- log actual error!
        // user registration failed
        res.status(400).json({error : "Could not query database."});
    }
})

export default router;
