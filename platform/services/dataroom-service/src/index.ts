import dotenv from "dotenv";
import express, { Request, Response } from "express";
import fileUpload from "express-fileupload";
import mongoose from "mongoose";
import path from "path";
import { i18next, initI18n } from "./utils/i18n";
import setLocale from "./middlewares/i18n.middleware";

// Initialize dotenv to load environment variables
dotenv.config();

import config from "./config";
import dataRoomRoutes from "./routes/dataRoomRoutes";
import logger from "./logger/logger";
import cabinetRoutes from "./routes/cabinetRoutes";
import fileRoutes from "./routes/fileRoutes";
import filePermissionRoutes from "./routes/filePermissionRoutes";
import documentSignatureRoutes from "./routes/documentSignatureRoutes";

const app = express();

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));
app.use(fileUpload());

// Connect to MongoDB
mongoose
  .connect(config.mongoURI)
  .then(() => logger.info("MONGO is connected"))
  .catch((err: Error) => logger.info("MongoDB connection error:", err));
// Define routes

// // Initialize i18n before setting locale middleware
initI18n().then(() => {
  app.use(setLocale); // Use the setLocale middleware
  app.use("/datarooms", dataRoomRoutes);
  app.use("/cabinets", cabinetRoutes, filePermissionRoutes);
  app.use("/signatures", documentSignatureRoutes);
  app.use('/files', fileRoutes);

  app.get("/download-logs", (req: Request, res: Response) => {
    const logFilePath = path.join(__dirname, "dataroom.log");
    res.download(logFilePath, "dataroom.log", (err) => {
      if (err) {
        logger.error(`Error downloading log file: ${err.message}`);
        res.status(500).send("Error downloading log file");
      }
    });
  });

  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
  });

});


export default app;
