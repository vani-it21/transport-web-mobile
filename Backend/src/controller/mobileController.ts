import { Request, Response } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { ReportModel } from "../models/mobileModel"; // Importing Report model

// Define upload directories
const IMAGE_DIR = path.join(__dirname, "../../public/photo");
const AUDIO_DIR = path.join(__dirname, "../../public/audio");

// Ensure directories exist before file uploads
[IMAGE_DIR, AUDIO_DIR].forEach((dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, IMAGE_DIR);
    } else if (file.mimetype.startsWith("audio/")) {
      cb(null, AUDIO_DIR);
    } else {
      cb(new Error("Unsupported file format"), "");
    }
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// File filter for security
const fileFilter = (req: Request, file: Express.Multer.File, cb: any) => {
  if (file.mimetype.startsWith("image/") || file.mimetype.startsWith("audio/")) {
    cb(null, true);
  } else {
    cb(new Error("Unsupported file format"), false);
  }
};

// Multer middleware for handling multiple file types
const upload = multer({
  storage,
  fileFilter,
}).fields([
  { name: "photo", maxCount: 1 },
  { name: "audio", maxCount: 1 },
]);

// 📝 Submit Report API
export const submitReport = async (req: Request, res: Response): Promise<void> => {
  upload(req, res, async (err) => {
    if (err) {
      console.error("File upload error:", err.message);
      return res.status(400).json({ message: "File upload error", error: err.message });
    }

    try {
      const { emailId, vehicleNumber, priority, damageType } = req.body;

      // Get file paths safely
      const files = req.files as { [key: string]: Express.Multer.File[] } | undefined;
      const photo = files?.photo?.[0]?.path ? files.photo[0].path.replace(/^.*[\\\/]public[\\\/]/, '') : null;
const audio = files?.audio?.[0]?.path ? files.audio[0].path.replace(/^.*[\\\/]public[\\\/]/, '') : null;

      // Save report to the database
      const reportId = await ReportModel.createReport({ emailId, vehicleNumber, priority, damageType, photo, audio });

      res.status(201).json({ message: "Report submitted successfully!", reportId, photo, audio });
    } catch (error) {
      console.error("Error processing report submission:", error);
      res.status(500).json({ message: "Error processing report submission", error: error });
    }
  });
};

export const getReportsByEmail = async (req: Request, res: Response): Promise<void> => {
  const { email } = req.body;

  if (!email) {
    res.status(400).json({ message: "Email is required" });
    return;
  }
// console.log("coming inside",email);
  try {
    const reports = await ReportModel.getReportsByEmail(email);
    if (reports.length === 0) {
      res.status(404).json({ message: "No reports found for this email" });
      return;
    }
    res.status(200).json(reports);
  } catch (error) {
    console.error("Error retrieving reports:", error);
    res.status(500).json({ message: "Error retrieving reports", error });
  }
};


