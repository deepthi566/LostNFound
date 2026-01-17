import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import Routes from "./routes/itemRoutes.js";
import cors from "cors";
import path from "path";

import dotenv from "dotenv";
const PORT = 5000;
dotenv.config();
const app = express();
app.use("/uploads", express.static("uploads"));
app.use(cors());
app.use(express.json()); // MIDDLEWAREparses incoming JSON request bodies and fills req.body.()
app.get("/", (req, res) => {
  res.send("Lost and Found backend is running!");
});
const port = process.env.PORT || 5000;

app.use("/api/auth", authRoutes);
app.use("/api/items", Routes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Mongodb connected succesfully");
  })
  .catch((error) => {
    console.log(error.message);
  });

app.listen(port, () => {
  console.log(`Server running at port: ${port}`);
});
