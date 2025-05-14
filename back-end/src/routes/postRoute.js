//defines combined logic that will await whats sent to the s3 defined methods and then carry on with
//specific logic
import express from "express";
import { uploadPetImage, sendImageKey, getFileStream } from "../models/s3.js";
import Post from "../models/postModel.js";
import multer from "multer";
import fs from "fs";
import util from "util";

const router = express.Router();
const upload = multer({ dest: "uploads/" });
const unlinkFile = util.promisify(fs.unlink);

router.post("/createPost", upload.single("image"), async (req, res) => {
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
    res.status(201).json({ insertionResult });
  } catch (err) {
    console.error("ERROR:", err); // <---- log actual error
    // user registration failed
    res.status(400).json({ error: "Could not query database." });
  }
});

//get all pet posts where pets are lost
//these will be used in the map page and pet exploration page
router.get("/", async (req, res) => {
  try {
    const posts = await Post.retrieveAllPets();
    res.status(201).json({ posts });
  } catch (err) {
    console.log("ERROR:", err);
  }
});

//get a post by its id, to show a particular pet
//this will be used in a individual pet post
router.get("/:petId", async (req, res) => {
  try {
    //get the id from the params of the request
    const { petId } = req.params;
    //use the id to query our db using our post model
    const specificPost = await Post.getPostByID(petId);
    res.status(201).json({ specificPost });
  } catch (err) {
    console.log("ERROR:", err);
  }
});

//delete route that will delete a pet post once a user marks it to be deleted
router.delete("/delete/:petId", async (req, res) => {
  try {
    //get the id from the params of the request
    const { petId } = req.params;
    //use the id to create the delete
    const deletedPost = await Post.deletePetPost(petId);
    res.status(201).json({ deletedPost });
  } catch (err) {
    console.log("ERROR:", err);
  }
});

//update route that will be used to mark a post as found
router.put("/update/:petId", async (req, res) => {
  try {
    //grab the petid from the request
    const { petId } = req.params;
    //make put request to the database to update the specific column with petid
    const updatedPost = await Post.statusToFound(petId);
    //reutrn the updated post with newly updated response
    res.status(201).json({ updatedPost });
  } catch (err) {
    console.log("ERROR:", err);
  }
});

export default router;
