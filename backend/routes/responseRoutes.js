import express from "express";
const router = express.Router();
import ResponseModel from "../models/ResponseModel.js";

// /response/send
router.post("/send", async (req, res) => {
  const data = req.body.data;
  try {
    const response = new ResponseModel(data);
    await response.save();

    res.status(201).send(response);
  } catch (error) {
    res.status(500).json({ message: "Internal server errrr", error });
  }
});

// Get all response of form
router.get("/get/:formId", async (req, res) => {
  try {
    const response = await ResponseModel.find({ formId: req.params.formId });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "Internal server errrr", error });
  }
});
export default router;
