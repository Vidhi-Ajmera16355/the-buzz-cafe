import express from "express";
import { getCategories, createCategory, getMenuItems, createMenuItem, deleteMenuItem } from "../controllers/menuController";
import { protect } from "../middlewares/authMiddleware";
import { upload } from "../middlewares/uploadMiddleware";

const router = express.Router();

router.route("/categories")
  .get(getCategories)
  .post(protect, createCategory);

router.route("/items")
  .get(getMenuItems)
  .post(protect, upload.single("image"), createMenuItem);

router.route("/items/:id")
  .delete(protect, deleteMenuItem);

export default router;
