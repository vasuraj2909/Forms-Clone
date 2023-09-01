import express from "express";
import { v2 as cloudinary } from "cloudinary";
const router = express.Router();
import { getImages, uploadImage } from "../controllers/imageController.js";
import { config } from "dotenv";
config();
import validateUser from "../middlewares/validateUser.js";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.post("/upload", validateUser, uploadImage);

router.get("/get", validateUser, getImages);
export default router;
