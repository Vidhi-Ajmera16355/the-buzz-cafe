import express from "express";
import { createReservation, getReservations, updateReservationStatus } from "../controllers/reservationController";
import { protect } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/", createReservation); // Public
router.get("/", protect, getReservations); // Admin only
router.put("/:id/status", protect, updateReservationStatus); // Admin only

export default router;
