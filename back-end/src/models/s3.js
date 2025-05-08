import fs from "fs";
import AWS from "aws-sdk";
import crypto from "crypto";
import dotenv from "dotenv";
import database from "../database.js";
import { convertSnakeToCamel } from "../utils/formatters.js";

dotenv.config();

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new AWS.S3({
  region,
  accessKeyId,
  secretAccessKey,
});

export const uploadPetImage = async (file) => {
  const fileStream = fs.createReadStream(file.path);

  const originalName = file.originalname;
  const extension = originalName.split(".").pop();
  const baseName = originalName.replace(/\.[^/.]+$/, "");

  const uniqueSuffix = crypto.randomBytes(4).toString("hex");
  const key = `${baseName}_${uniqueSuffix}.${extension}`;

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: key,
    ContentType: file.mimetype,
  };

  return await s3.upload(uploadParams).promise();
};

export const getFileStream = (fileKey) => {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName,
  };

  return s3.getObject(downloadParams).createReadStream();
};

export const sendImageKey = async (imageKey, userId) => {
  const updateUserImage = `UPDATE lost_pet SET image_url = $1 WHERE post_id = $2 RETURNING *`;

  const values = [imageKey, userId];

  const result = await database.query(updateUserImage, values);

  return convertSnakeToCamel(result.rows[0]);
};
