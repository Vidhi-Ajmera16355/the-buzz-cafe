import express from "express";
import { authAdmin } from "../controllers/adminController";

const router = express.Router();

router.post("/login", authAdmin);

export default router;
