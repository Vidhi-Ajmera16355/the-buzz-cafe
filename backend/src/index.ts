import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import path from "path";

import adminRoutes from "./routes/adminRoutes";
import reservationRoutes from "./routes/reservationRoutes";
import inquiryRoutes from "./routes/inquiryRoutes";
import menuRoutes from "./routes/menuRoutes";

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "../../uploads")));

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/inquiries", inquiryRoutes);
app.use("/api/menu", menuRoutes);

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "API is running" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`);
});
