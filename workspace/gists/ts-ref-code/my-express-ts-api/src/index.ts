import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import config from "./config";
import mongoose from 'mongoose';

import dataRoomRoutes  from "./routes/dataRoomRoutes";

const app = express();
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));

mongoose
  .connect(config.mongoURI)
  .then(() => console.log("MONGO is connected"))
  .catch((err:any) => console.log("MongoDB connection error:", err));

app.use("/datarooms", dataRoomRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
