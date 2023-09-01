import express from "express";
const router = express.Router();
import { getuser } from "../controllers/userController.js";
import validateUser from "../middlewares/validateUser.js";

// get user using post : "api/auth/getuser" . no login required
router.get("/getuser", validateUser, getuser);

export default router;
