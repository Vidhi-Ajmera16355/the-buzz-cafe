import express from "express";
import { createInquiry, getInquiries, updateInquiryStatus } from "../controllers/inquiryController";
import { protect } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/", createInquiry); // Public
router.get("/", protect, getInquiries); // Admin only
router.put("/:id/status", protect, updateInquiryStatus); // Admin only

export default router;
