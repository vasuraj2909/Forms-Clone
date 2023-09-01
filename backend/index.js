import express, { json } from "express";
const app = express();
import cors from "cors";
//import connectDB from "./db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import formRoutes from "./routes/formRoutes.js";
import imageRoutes from "./routes/imageRoutes.js";
import responseRoutes from "./routes/responseRoutes.js";
import mongoose from "mongoose";


app.use(
  cors({
    origin: "*", // Whitelist a specific origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Define allowed HTTP methods
  })
);
app.use(json({ limit: "50mb", extended: true }));

app.get("/", (req, res) => {
  res.send("Hey we are live ✨");
});

// All available rsoutes
app.use("/auth", authRoutes); // For authentication routes
app.use("/user", userRoutes);
app.use("/form", formRoutes);
app.use("/image", imageRoutes);
app.use("/response", responseRoutes);

mongoose.connect('mongodb+srv://vasu:' + encodeURIComponent('Vasu@2909') + '@cluster0.plfhs5l.mongodb.net/forms', { useNewUrlParser: true, useUnifiedTopology: true, dbName: "forms" });