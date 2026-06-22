import mongoose from "mongoose";

const menuCategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
  },
  { timestamps: true }
);

const menuItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MenuCategory",
      required: true,
    },
    image: { type: String }, // path to image
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const MenuCategory = mongoose.model("MenuCategory", menuCategorySchema);
export const MenuItem = mongoose.model("MenuItem", menuItemSchema);
