import express from "express";
import { googleAuth, verifyDriversEmail } from "../controller/authController";
import { getReportsByEmail, submitReport } from "../controller/mobileController";
// import { getDriversEmail } from "../controller/transportController";
const router = express.Router();

router.post("/auth/google", googleAuth);
router.post("/verifyDriversEmail", verifyDriversEmail); 
router.post("/submitReport", submitReport);
router.post('/get-reports', getReportsByEmail);

export default router;
