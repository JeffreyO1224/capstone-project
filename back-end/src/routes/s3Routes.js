import express from "express";
import multer from "multer";
import fs from "fs";
import util from "util";

import { uploadPetImage, sendImageKey, getFileStream } from "../models/s3.js";
import { convertSnakeToCamel } from "../utils/formatters.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });
const unlinkFile = util.promisify(fs.unlink);

router.post(
  "/upload/:postId",
  upload.single("image"),
  async (req, res, next) => {
    try {
      const { postId } = req.params;
      const file = req.file;

      const result = await uploadPetImage(file);
      // const dbResult = await sendImageKey(result.Key, postId);

      await unlinkFile(file.path); // cleanup temp file

      res.status(200).json({ result });
    } catch (err) {
      next(err);
    }
  }
);

router.get("/image/:key", (req, res, next) => {
  try {
    const { key } = req.params;
    const readStream = getFileStream(key);
    readStream.pipe(res);
  } catch (err) {
    next(err);
  }
});

export default router;
