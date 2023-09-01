import express from "express";
const router = express.Router();
import {
  createForm,
  getForms,
  deleteForm,
  getFormById,
  editForm,
  getRespondingForm,
} from "../controllers/formController.js";
import validateUser from "../middlewares/validateUser.js";

// /form/<>
router.post("/create", validateUser, createForm);

router.get("/forms", validateUser, getForms);

router.get("/:id", validateUser, getFormById);

router.put("/editform/:id", validateUser, editForm);

router.delete("/deleteform/:id", validateUser, deleteForm);

// this is public route anyone can access this route
router.get("/responding/:id", getRespondingForm);

export default router;
