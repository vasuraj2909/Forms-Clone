import { v2 as cloudinary } from "cloudinary";
import ImageModel from "../models/ImageModel.js";

const uploadImage = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload_large(req.body.image, {
      folder: "google-form-clone", // You can customize the folder name
    });

    const obj = {
      userId: req.user.id,
      image: { public_id: result.public_id, url: result.secure_url },
    };

    const image = new ImageModel(obj);
    await image.save();

    res.status(201).send(image);
  } catch (error) {
    res.status(500).json({ message: "Internal server errrr", error });
  }
};

const getImages = async (req, res) => {
  try {
    const images = await ImageModel.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });
    res.status(200).json(images);
  } catch (error) {
    // console.log(error);
    res.status(500).json({ message: "Internal server errrr", error });
  }
};

export { uploadImage, getImages };
